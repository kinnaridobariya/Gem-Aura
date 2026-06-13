# 💎 GemAura — Personalized Jewelry Styling Agent

> *Building real AI agents that see, think, and style.*

[![Agents League Hackathon](https://img.shields.io/badge/Agents%20League-Creative%20Apps%20Track-534AB7)](https://aka.ms/agentsleague)
[![GitHub Copilot](https://img.shields.io/badge/Built%20with-GitHub%20Copilot-0078D4)](https://github.com/features/copilot)
[![Microsoft Foundry IQ](https://img.shields.io/badge/Powered%20by-Foundry%20IQ-0078D4)](https://aka.ms/agentsleague/iq)

---

## 🌟 What is GemAura?

GemAura is an AI-powered personal jewelry styling agent built for diamond and jewelry brands. Customers upload a selfie, answer a few quick questions, and GemAura generates a fully curated, personalized jewelry collection — complete with visual illustrations of every recommended piece.

No generic suggestions. No one-size-fits-all results. Every recommendation is **grounded in real jewelry knowledge** and tailored to that specific person's appearance, personality, and occasion.

---

## ✨ The Problem It Solves

Walking into a jewelry store — or browsing one online — is overwhelming. Thousands of pieces, no guidance, and no way to know what actually flatters *you*. Most people leave without buying, or buy something they regret.

GemAura acts as a knowledgeable personal stylist available 24/7, giving every customer a boutique-level experience at scale.

---

## 🎯 How It Works

### Step 1 — Upload Your Photo
The agent uses computer vision to detect:
- **Skin tone** — mapped to the ideal metal palette (yellow gold, rose gold, white gold, platinum)
- **Hair color** — used to enhance contrast and warmth in stone selection
- **Eye color** — matched to complementary gemstone hues
- **Face shape** — determines the most flattering earring silhouettes

### Step 2 — Tell Us About You
- **Occasion** — Everyday, Work, Wedding, Gala, Date Night, or Festival
- **Zodiac sign** — unlocks your power stones and energy-aligned gems
- **Birth month** — surfaces your personal birthstone
- **Specific requests** — any preferences, restrictions, or outfit details

### Step 3 — Get Your Look
GemAura generates:
- A **personalized color moodboard** based on your appearance palette
- A **full 4-piece jewelry collection** (earrings, necklace, ring, bracelet) curated for your occasion
- **SVG illustrations** of each recommended piece — drawn in your exact metal and gem colors
- A **power stones profile** explaining why each stone resonates with your zodiac and birthstone
- A **shareable style card** you can send to friends or use as a wishlist

---

## 🧠 Microsoft IQ Integration — Foundry IQ

GemAura integrates **Microsoft Foundry IQ** as its intelligence backbone.

Instead of hallucinating jewelry recommendations, GemAura queries a grounded knowledge base containing:

| Knowledge Source | What It Powers |
|---|---|
| Diamond grading guides (GIA standards) | Cut, clarity, color, carat recommendations |
| Gemstone meaning & metaphysical properties | Zodiac stone pairing and power stone logic |
| Face shape styling guides | Earring silhouette recommendations |
| Skin tone & metal compatibility charts | Metal palette selection |
| Occasion-based styling rules | Collection curation per event type |
| Birthstone index (month → stone → meaning) | Personalized birthstone surfacing |

Every recommendation GemAura makes is **cited and grounded** — not a guess. Foundry IQ enforces this by connecting the agent to authoritative sources and reducing hallucination through retrieval-augmented generation.

This means a customer asking *"what diamond cut suits my oval face and Libra zodiac for a wedding?"* gets a specific, sourced answer — not a guess.

---

## 🤖 GitHub Copilot — How It Assisted Development

This project was built with **GitHub Copilot in VS Code** throughout the entire development process:

### Code Generation
- Copilot generated the initial photo upload and canvas-based pixel sampling logic for skin tone and eye color detection
- Copilot autocompleted the SVG jewelry illustration functions (ring band geometry, necklace chain arc paths, chandelier earring drop structures, bracelet cuff shapes)
- Copilot suggested the color mapping logic connecting zodiac signs → gem hex colors and skin tones → metal hex colors

### Problem Solving
- Used **Copilot Chat** to debug the eye color detection algorithm — specifically the RGB channel comparison logic for distinguishing hazel from green and gray from blue
- Copilot Chat explained canvas `getImageData` pixel sampling patterns and helped optimize the color averaging approach
- Used Copilot to refactor the jewelry collection data structure for cleaner occasion-based lookup

### Architecture
- Copilot suggested the separation of concerns between trait detection, profile building, and visual rendering
- Copilot Chat helped design the Foundry IQ query structure for grounded jewelry knowledge retrieval

---

## 🗂️ Project Structure

```
gemaura/
├── README.md
├── .env.example              # API keys template (never commit .env)
├── .gitignore
├── frontend/
│   ├── index.html            # Main app entry
│   ├── app.jsx               # React component — full styling agent UI
│   ├── components/
│   │   ├── PhotoUpload.jsx   # Camera/file upload + trait detection
│   │   ├── OccasionPicker.jsx
│   │   ├── ProfileBuilder.jsx
│   │   ├── JewelryCard.jsx   # SVG jewelry illustration component
│   │   └── MoodBoard.jsx     # Color palette visual
│   └── styles/
│       └── gemaura.css
├── agent/
│   ├── stylist_agent.py      # Core GemAura agent logic
│   ├── foundry_iq.py         # Microsoft Foundry IQ integration
│   ├── trait_analyzer.py     # Photo → appearance trait extraction
│   ├── recommendation_engine.py  # Profile → jewelry collection mapping
│   └── knowledge_base/
│       ├── diamonds.json     # GIA diamond knowledge
│       ├── gemstones.json    # Stone meanings & properties
│       ├── face_shapes.json  # Styling rules per face shape
│       └── zodiac_stones.json
├── mcp/
│   └── gemaura_mcp_server.py # MCP server for GitHub Copilot integration
└── demo/
    └── demo_video.mp4        # Submission demo video
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- GitHub Copilot subscription
- Microsoft Azure account (for Foundry IQ)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/gemaura.git
cd gemaura

# Install frontend dependencies
cd frontend && npm install

# Install agent dependencies
cd ../agent && pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your Azure and Foundry IQ credentials
```

### Environment Variables

```bash
# .env.example — never commit your actual .env file
AZURE_FOUNDRY_IQ_ENDPOINT=your-foundry-iq-endpoint
AZURE_FOUNDRY_IQ_KEY=your-api-key
AZURE_OPENAI_ENDPOINT=your-openai-endpoint
AZURE_OPENAI_KEY=your-openai-key
```

### Run Locally

```bash
# Start the agent backend
cd agent && python stylist_agent.py

# Start the frontend
cd frontend && npm run dev

# Open http://localhost:3000
```

---

## 🏆 Track & Judging Alignment

| Judging Criterion | How GemAura Addresses It |
|---|---|
| **Accuracy & Relevance (20%)** | Foundry IQ grounding ensures recommendations are sourced from real jewelry and styling knowledge, not hallucinated |
| **Reasoning & Multi-step Thinking (20%)** | The agent chains photo analysis → trait mapping → occasion context → zodiac logic → grounded retrieval → visual output in a clear reasoning pipeline |
| **Creativity & Originality (15%)** | First-of-its-kind jewelry styling agent that combines computer vision, zodiac energy, and illustrated visual output in one experience |
| **User Experience & Presentation (15%)** | Conversational, visual, and shareable — designed to delight both the end customer and the jewelry brand deploying it |
| **Reliability & Safety (20%)**| No PII stored, photo stays on device, all API keys in environment variables, no confidential data in repo |
| **Community Vote (10%)** | Live demo on Discord — shareable style cards encourage organic sharing and votes |

---

## 🎨 Demo

> Upload your photo → pick your occasion → get your full curated look with illustrated jewelry pieces in seconds.

📽️ [Watch the demo video](./demo/demo_video.mp4)

🔗 [Try GemAura live](#) *(link to deployed app)*

---

## 👩‍💻 Built By

**Kinnari Dobariya**
Agents League Hackathon 2026 — Creative Apps Track
Hosted by Microsoft · June 4–14, 2026

---

## 📋 Security & Compliance

- ✅ No API keys or credentials in this repository
- ✅ All sensitive config stored in `.env` (gitignored)
- ✅ No customer PII stored or transmitted
- ✅ Photo analysis runs client-side — images never leave the user's device
- ✅ Demo uses only synthetic/sample data

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for details.

---

*GemAura was built with 💎 and GitHub Copilot for the Agents League Hackathon 2026.*
