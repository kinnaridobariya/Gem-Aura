import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

// Set up larger limits to support photo upload base64 payloads
app.use(express.json({ limit: "15mb" }));
app.use(express.urlencoded({ limit: "15mb", extended: true }));

// Initialize the Google Gen AI client with appropriate headers
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API Endpoint: Get tailored Jewelry Suggestions and Styling Advice from the Gemini Stylist
app.post("/api/suggest-jewelry", async (req, res) => {
  try {
    const {
      jewelryType,
      personality,
      birthstone,
      skinColor,
      hairColor,
      eyeColor,
      faceShape,
      zodiac,
      occasion,
      userImage, // base64 string, optional
    } = req.body;

    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured inside server secrets.",
        isDemo: true,
        suggestion: {
          metalType: "18K Rose Gold",
          gemShape: "Oval Cut",
          settingStyle: "Vintage Diamond Halo",
          gemColors: ["Blush Peach Morganite", "Cognac Diamond", "Rose-cut Diamond"],
          analysisReasoning: "Since the server API key is not fully configured yet, here is a premium sample styling. The warm, soft base of Blush Peach Morganite combined with Rose Gold complements your specified birthstone (" + (birthstone || "None") + ") and matches your " + (zodiac || "spiritual") + " cosmic energy. This piece beautifully highlights " + (skinColor ? "your skin tone" : "") + " and accentuates your " + (faceShape || "facial") + " architecture for " + (occasion || "Daily Wear") + ".",
          accentStoneRecommendations: "Blush morganite surrounded by micro-pavé brilliance diamonds.",
          designerTips: [
            "Use warm metal settings to highlight natural skin tones.",
            "Choose brilliant shapes like Oval or Marquise to visually elongate the hands, neck, or ears.",
            "Pair delicate gemstone halos with classic clothing styles to maintain an enduring, historical luxury appeal."
          ],
          story: "A celestial tribute named 'The Empress Aura'—an artistic composition of fiery diamond pavé surrounding a rich heirloom gemstone, capturing the romance and grandeur of your chosen aura.",
          overlayConfig: {
            metalColorType: "rose",
            suggestedGemColor: "#FFC5B4",
            scaleMultiplier: 1.1,
            rotationOffset: 0
          }
        }
      });
    }

    // Construct prompt
    const promptText = `
      You are a high-end luxury diamond jewelry designer and master stylist at "Gem Aura".
      A client has requested a customized luxury design blueprint. Here is their profile:
      - Jewelry Type requested: ${jewelryType || "Necklace/Earrings/Ring/Bracelet"}
      - Personality profile: ${personality || "Classic & Elegant"}
      - Birthstone preference: ${birthstone || "None (focused on Diamond)"}
      - Skin tone profile: ${skinColor || "Not specified"}
      - Hair color: ${hairColor || "Not specified"}
      - Eye color: ${eyeColor || "Not specified"}
      - Face shape silhouette: ${faceShape || "Not specified"}
      - Zodiac Sign / Spiritual energy: ${zodiac || "Not specified"}
      - Wear Occasion: ${occasion || "Special Occasion / Daily luxury"}
      
      Suggest the ideal precious metal type/color, primary diamond/gemstone shape, jewelry setting style, additional gemstone colors, and an overall designer narrative for them.
      Include in "analysisReasoning":
      1. How the precious metals match their skin tone and contrast hair color
      2. How the suggested gemstone colors highlight their computed eye color
      3. How the earring silhouettes or chain arcs balance their face shape
      4. How the power stones resonate directly with their zodiac sign and birthstone preferences
      
      If a user photo has been attached, examine the colors, lighting, sub-features, facial shape, wrist, or hand context, and leverage it to craft a highly tailored and visually aesthetic jewelry alignment.
      
      Respond STRICTLY in JSON matching the specified schema format.
    `;

    const contents: any[] = [];
    
    // Process base64 user image if provided
    if (userImage && typeof userImage === "string" && userImage.includes("base64,")) {
      try {
        const parts = userImage.split("base64,");
        const mimeMatch = userImage.match(/data:([^;]+);/);
        const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
        const base64Data = parts[1];
        
        contents.push({
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        });
      } catch (e) {
        console.error("Failed to parse user base64 image:", e);
      }
    }

    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: [
            "metalType",
            "gemShape",
            "settingStyle",
            "gemColors",
            "analysisReasoning",
            "accentStoneRecommendations",
            "designerTips",
            "story",
            "overlayConfig",
          ],
          properties: {
            metalType: {
              type: Type.STRING,
              description: "E.g., 18K Yellow Gold, Platinum 950, 18K Rose Gold, 14K White Gold",
            },
            gemShape: {
              type: Type.STRING,
              description: "E.g., Round Brilliant, Oval Brilliant, Emerald Cut, Princess, Asscher, Pear-shaped, Marquise",
            },
            settingStyle: {
              type: Type.STRING,
              description: "E.g., Vintage Diamond Halo, Minimalist Solitaire, Pavé Split Shank, Modern Flush Bezel, Aura Clusters",
            },
            gemColors: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "2-3 primary gemstone color tones that elevate their aura (e.g. ['Cognac Diamond', 'D-color Flawless Diamond'])",
            },
            analysisReasoning: {
              type: Type.STRING,
              description: "Provide a luxury stylistic breakdown of why this metal, shape, and design harmonizes beautifully with their skin, hair, birthstone, and personality.",
            },
            accentStoneRecommendations: {
              type: Type.STRING,
              description: "Describe what kind of tiny side diamonds or colored birthstone accents adorn the band or halo.",
            },
            designerTips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Exactly three professional wear or styling tips for this particular piece.",
            },
            story: {
              type: Type.STRING,
              description: "An elegant, descriptive high-concept name and background story for this specific jewelry piece (e.g., 'The Solis Halo Ring').",
            },
            overlayConfig: {
              type: Type.OBJECT,
              required: ["metalColorType", "suggestedGemColor", "scaleMultiplier", "rotationOffset"],
              properties: {
                metalColorType: {
                  type: Type.STRING,
                  description: "Must be exactly one of: 'yellow', 'rose', 'silver'",
                },
                suggestedGemColor: {
                  type: Type.STRING,
                  description: "Hex color code aligning with the suggested main gemstone (e.g. '#E5A442' for canary diamond, '#FFFFFF' for white diamond)",
                },
                scaleMultiplier: {
                  type: Type.NUMBER,
                  description: "A scale hint between 0.8 and 1.5 based on recommended statement-piece status",
                },
                rotationOffset: {
                  type: Type.NUMBER,
                  description: "Default rotation angle adjustment in degrees (typically 0)",
                },
              },
            },
          },
        },
      },
    });

    const textOutput = response.text;
    if (!textOutput) {
      throw new Error("No suggestion text received from Gemini.");
    }

    const compiledData = JSON.parse(textOutput.trim());
    res.json(compiledData);
  } catch (error: any) {
    console.error("Gemini Suggestion API Error:", error);
    res.status(500).json({
      error: error.message || "Failed to generate styling advice from Gemini.",
      suggestion: {
        metalType: "Platinum 950",
        gemShape: "Princess Cut",
        settingStyle: "Modernist Floating Bezel",
        gemColors: ["D-Color Flawless Diamond", "Teal Sapphire"],
        analysisReasoning: "Fallback suggestion: A sleek Platinum structure featuring a high-brilliance Princess cut gemstone. This matches an ambitious, clean aesthetic and is extremely versatile across all skin colors and evening wear occasions.",
        accentStoneRecommendations: "Baguette-cut diamond accents.",
        designerTips: [
          "Maintain a high-polish platinum look to maximize modern geometric structures.",
          "Keep adjacent clothing sleek and high-contrast (e.g., silk black or crisp ivory).",
          "Match with minimalist geometric studs to avoid cluttering the visual aura."
        ],
        story: "The 'Nova Aura'—a futuristic design utilizing pristine linear angles and sharp facets, perfect for bringing clean confidence and structure to any occasion.",
        overlayConfig: {
          metalColorType: "silver",
          suggestedGemColor: "#E0F2FE",
          scaleMultiplier: 1.0,
          rotationOffset: 0
        }
      }
    });
  }
});

// Serve frontend SPA in production, Vite middleware in dev
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Gem Aura Full Stack Server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
