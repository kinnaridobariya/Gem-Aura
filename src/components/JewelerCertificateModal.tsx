import React, { useRef, useState } from "react";
import { StylingSuggestion, CustomerProfile } from "../types";
import { 
  X, 
  Printer, 
  Copy, 
  Check, 
  Award, 
  FileText, 
  Clock, 
  ShieldCheck, 
  Fingerprint,
  RotateCw,
  Sparkles
} from "lucide-react";

interface JewelerCertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  suggestion: StylingSuggestion;
  profile: CustomerProfile;
}

export const JewelerCertificateModal: React.FC<JewelerCertificateModalProps> = ({
  isOpen,
  onClose,
  suggestion,
  profile
}) => {
  const [copied, setCopied] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  // Render specified metal color representation
  const getMetalDescription = () => {
    switch (suggestion.overlayConfig?.metalColorType) {
      case "rose":
        return "18K Suede Rose Gold (Warm Blush Alloy)";
      case "silver":
        return "Platinum 950 Imperial / 18K White Gold";
      case "yellow":
      default:
        return "18K Premium Sovereign Yellow Gold (Royal Core)";
    }
  };

  // Generate unique certificate ID for luxury immersion
  const generateCertificateID = () => {
    const prefix = "AUR";
    const datePart = new Date().getFullYear().toString().substring(2);
    const randPart = Math.floor(100000 + Math.random() * 900000);
    return `${prefix}-${datePart}-${randPart}`;
  };

  const certificateId = useRef(generateCertificateID()).current;

  // Process copying action
  const handleCopySpecs = async () => {
    const formattedText = `
=========================================
      GEM AURA FINE JEWELRY ARCHITECT
              DESIGN BLUEPRINT
=========================================
Certificate ID: ${certificateId}
Date: ${new Date().toLocaleDateString()}
Occasion: ${profile.occasion}
Vibe / Personality: ${profile.personality}
Zodiac Celestial Sign: ${profile.zodiac || "Not specified"}
Computed Eye Color: ${profile.eyeColor || "Not specified"}
Face Shape Architecture: ${profile.faceShape || "Not specified"}

-----------------------------------------
JEWELRY ARCHITECTURE DETAILS:
-----------------------------------------
Category: ${profile.jewelryType.toUpperCase()}
Suggested Model: "${suggestion.story.split('"')[0]}"

Precious Metal: ${suggestion.metalType}
Main Gemstone Cut: ${suggestion.gemShape}
Setting Style: ${suggestion.settingStyle}
Primary Aura Gemstone Colors: ${suggestion.gemColors.join(", ")}
Accent Diamonds & Pavé: ${suggestion.accentStoneRecommendations}

-----------------------------------------
DESIGNER SELECTION HARMONY NOTE:
-----------------------------------------
"${suggestion.analysisReasoning}"

Designer Wear Tips:
1. ${suggestion.designerTips[0]}
2. ${suggestion.designerTips[1]}
3. ${suggestion.designerTips[2]}

=========================================
Generated via the Gem Aura AI Architect Stylist.
Please share this layout config with your private jeweler to execute.
    `.trim();

    try {
      await navigator.clipboard.writeText(formattedText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Could not copy specs:", err);
    }
  };

  // Process standard printing mechanic
  const handlePrint = () => {
    // Elegant approach to print just the card using window.print()
    const printContent = printAreaRef.current?.innerHTML;
    const originalContent = document.body.innerHTML;
    
    if (printContent) {
      // Create printable viewport content
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>Gem Aura Design Certificate - ${certificateId}</title>
              <style>
                body {
                  background-color: #ffffff;
                  color: #000000;
                  font-family: 'Georgia', serif;
                  padding: 40px;
                  margin: 0;
                }
                .cert-container {
                  border: 4px double #C5B358;
                  padding: 30px;
                  max-width: 750px;
                  margin: 0 auto;
                }
                .header-title {
                  text-align: center;
                  font-size: 24px;
                  letter-spacing: 2px;
                  text-transform: uppercase;
                  color: #9c8a1e;
                  margin-bottom: 5px;
                }
                .subtitle {
                  text-align: center;
                  font-size: 11px;
                  font-family: 'Courier New', monospace;
                  letter-spacing: 3px;
                  text-transform: uppercase;
                  color: #666;
                  margin-bottom: 25px;
                }
                .cert-id {
                  text-align: center;
                  font-family: 'Courier New', monospace;
                  font-size: 12px;
                  color: #333;
                  margin-bottom: 30px;
                }
                .section-title {
                  font-family: 'Courier New', monospace;
                  font-size: 13px;
                  border-bottom: 1px solid #C5B358;
                  padding-bottom: 5px;
                  margin-top: 25px;
                  margin-bottom: 15px;
                  text-transform: uppercase;
                  color: #C5B358;
                  font-weight: bold;
                }
                .grid-specs {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  gap: 15px;
                }
                .spec-item {
                  margin-bottom: 10px;
                }
                .spec-label {
                  font-size: 10px;
                  text-transform: uppercase;
                  color: #666;
                  font-family: 'Courier New', monospace;
                }
                .spec-value {
                  font-size: 14px;
                  font-weight: bold;
                  color: #111;
                }
                .narrative {
                  font-size: 12px;
                  line-height: 1.6;
                  color: #333;
                  font-style: italic;
                  background: #fafaf6;
                  padding: 15px;
                  border-left: 3px solid #C5B358;
                }
                .seal-footer {
                  margin-top: 50px;
                  display: flex;
                  justify-content: space-between;
                  align-items: flex-end;
                  font-size: 11px;
                  font-family: 'Courier New', monospace;
                }
                .signature-line {
                  width: 180px;
                  border-top: 1px solid #111;
                  text-align: center;
                  padding-top: 5px;
                }
              </style>
            </head>
            <body>
              <div class="cert-container">
                ${printContent}
              </div>
              <script>
                window.onload = function() {
                  window.print();
                  setTimeout(function() { window.close(); }, 500);
                };
              </script>
            </body>
          </html>
        `);
        printWindow.document.close();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto selection:bg-amber-400 selection:text-slate-950">
      
      {/* Container Card */}
      <div className="relative w-full max-w-3xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/10 bg-slate-950">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-amber-400" />
            <span className="font-serif text-sm tracking-widest text-[#C5B358] uppercase font-semibold">Jeweler Certificate Exporter</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 transition-all cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Instructions Panel */}
        <div className="bg-amber-500/[0.02] border-b border-amber-500/10 px-6 py-4 flex gap-3 text-xs leading-normal text-amber-100/90">
          <Clock className="h-5 w-5 shrink-0 text-amber-400" />
          <div>
            <span className="font-semibold text-[#FDF6E2] block mb-0.5">Share with Your Craftsman or Private Designer</span>
            Download, print or copy this official styling architecture document. Hand it directly to your favorite bench jeweler, jewelry boutique, or private designer so they can assemble your dream precious hardware!
          </div>
        </div>

        {/* PRINTABLE AREA CONTAINER */}
        <div className="p-6 md:p-8 flex-1 overflow-y-auto max-h-[60vh] space-y-6">
          
          <div 
            ref={printAreaRef}
            className="relative bg-slate-950/45 rounded-2xl border-2 border-dashed border-amber-500/20 p-6 md:p-8 space-y-6 text-[#FDF6E2]"
            style={{ backgroundImage: "linear-gradient(rgba(197, 179, 88, 0.01) 1px, transparent 1px), linear-gradient(90deg, rgba(197, 179, 88, 0.01) 1px, transparent 1px)", backgroundSize: "20px 20px" }}
          >
            
            {/* Elegant double line gold design border */}
            <div className="absolute inset-2 border border-amber-500/10 rounded-xl pointer-events-none" />
            
            {/* Certificate Header */}
            <div className="text-center relative">
              {/* Luxury Stamp/Seal */}
              <div className="absolute -top-2 left-4 opacity-15 md:opacity-20 flex flex-col items-center">
                <Fingerprint className="h-10 w-10 text-amber-400" />
                <span className="text-[7px] font-mono tracking-widest">VERIFIED SYMMETRY</span>
              </div>

              <span className="font-mono text-[9px] tracking-[0.25em] text-amber-400 uppercase font-bold">Official GIA-Style AI Formulation</span>
              <h1 className="font-serif text-2xl md:text-3xl tracking-wider text-amber-100 font-semibold mt-1">
                JEWELRY ARCHITECT LUXURY DESIGN BLUEPRINT
              </h1>
              <p className="text-[10px] font-mono tracking-widest text-[#A8987E] uppercase mt-1">
                Atelier System-Grade certified • ID: <span className="text-amber-200 font-semibold">{certificateId}</span>
              </p>
              <div className="h-[1px] w-32 bg-amber-500/30 mx-auto mt-4" />
            </div>

            {/* Profile Context Section (Wearer characteristics) */}
            <div>
              <div className="section-title text-amber-400 font-mono text-[11px] uppercase tracking-widest border-b border-amber-900/10 pb-0.5 mb-2 font-bold flex items-center gap-1.5">
                <Award className="h-3.5 w-3.5" />
                <span>Section I: Wearer Attributes & Aura Parameters</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-2 text-xs">
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Category</div>
                  <div className="font-bold text-amber-100 capitalize mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{profile.jewelryType}</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Occasion</div>
                  <div className="font-bold text-amber-100 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={profile.occasion}>{profile.occasion}</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Vibe / Style</div>
                  <div className="font-bold text-amber-100 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={profile.personality}>{profile.personality}</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Birthstone</div>
                  <div className="font-bold text-amber-100 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={profile.birthstone}>{profile.birthstone.split(" ")[0]}</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Zodiac Astral</div>
                  <div className="font-bold text-amber-100 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={profile.zodiac}>{profile.zodiac || "N/A"}</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Eye Palette</div>
                  <div className="font-bold text-amber-100 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={profile.eyeColor}>{profile.eyeColor || "N/A"}</div>
                </div>
                <div className="bg-slate-900/70 p-2 rounded-lg border border-slate-800">
                  <div className="text-[8px] font-mono text-[#A8987E] uppercase">Face Shape</div>
                  <div className="font-bold text-amber-100 mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis" title={profile.faceShape}>{profile.faceShape || "N/A"}</div>
                </div>
              </div>
            </div>

            {/* Master Technical Specifications Section */}
            <div>
              <div className="section-title text-amber-400 font-mono text-[11px] uppercase tracking-widest border-b border-amber-900/10 pb-0.5 mb-2 font-bold flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                <span>Section II: Precious Hardware Specifications</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-900 py-1">
                    <span className="text-[#A8987E] font-mono uppercase text-[9px]">Precious Metal Base</span>
                    <span className="font-bold text-amber-100 text-right">{suggestion.metalType}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 py-1">
                    <span className="text-[#A8987E] font-mono uppercase text-[9px]">Sovereign Metal tone</span>
                    <span className="font-semibold text-amber-300 capitalize text-right">{suggestion.overlayConfig?.metalColorType} Gold</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 py-1 flex-col sm:flex-row sm:items-center">
                    <span className="text-[#A8987E] font-mono uppercase text-[9px]">Diamond / Gem Shape</span>
                    <span className="font-bold text-amber-100 text-right">{suggestion.gemShape}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between border-b border-slate-900 py-1 flex-col sm:flex-row sm:items-center">
                    <span className="text-[#A8987E] font-mono uppercase text-[9px]">Master Setting Style</span>
                    <span className="font-bold text-amber-100 text-right">{suggestion.settingStyle}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 py-1">
                    <span className="text-[#A8987E] font-mono uppercase text-[9px]">Primary Center stone hue</span>
                    <span className="font-bold text-amber-400 text-right flex items-center gap-1.5 justify-end">
                      <span className="h-2 w-2 rounded-full border border-white/50" style={{ backgroundColor: suggestion.overlayConfig?.suggestedGemColor || "#FFFFFF" }} />
                      <span>{suggestion.gemColors[0] || "D-Color Flawless"}</span>
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-slate-900 py-1">
                    <span className="text-[#A8987E] font-mono uppercase text-[9px]">Accent stones layout</span>
                    <span className="font-semibold text-slate-200 text-right text-[11px] leading-tight truncate max-w-[200px]" title={suggestion.accentStoneRecommendations}>{suggestion.accentStoneRecommendations}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Harmony Statement Narrative Section */}
            <div>
              <div className="section-title text-amber-400 font-mono text-[11px] uppercase tracking-widest border-b border-amber-900/10 pb-0.5 mb-2 font-bold flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                <span>Section III: Stylistic Harmony Analysis & Story</span>
              </div>
              <div className="bg-slate-900/40 p-4 rounded-xl border border-slate-800 text-xs text-[#D1C2A3] leading-relaxed italic space-y-3">
                <p>&ldquo;{suggestion.analysisReasoning}&rdquo;</p>
                <div className="pt-2 border-t border-slate-800">
                  <span className="block text-[9px] font-mono uppercase text-[#A8987E] tracking-widest font-semibold">Artifact Storyboard Title:</span>
                  <p className="text-amber-300 font-serif font-bold mt-0.5">&ldquo;{suggestion.story}&ldquo;</p>
                </div>
              </div>
            </div>

            {/* Precautions Wear Rules */}
            <div>
              <div className="section-title text-amber-400 font-mono text-[11px] uppercase tracking-widest border-b border-amber-900/10 pb-0.5 mb-1.5 font-bold flex items-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>Section IV: Wearer Guidelines & Preservation</span>
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-[11px] text-slate-300">
                {suggestion.designerTips.map((tip, idx) => (
                  <li key={idx} className="bg-slate-900/40 p-2.5 rounded-lg border border-slate-800 flex items-start gap-1.5">
                    <span className="h-4 w-4 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 flex items-center justify-center text-[9px] font-mono shrink-0">
                      {idx + 1}
                    </span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Official Signature Lines & GIA Seals matching a physical masterwork layout */}
            <div className="pt-6 border-t border-amber-900/10 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6 text-[10px] font-mono text-[#A8987E]">
              <div className="text-center sm:text-left">
                <div>DATE OF FORMULATION: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</div>
                <div>ISSUED BY: GEM AURA DESIGN PROTOCOLS (ATELIER COCHLEA)</div>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="h-px w-36 bg-slate-500 mt-8 mb-1" />
                <div className="text-[9px] uppercase tracking-wider text-slate-400">Master Alchemist Signature</div>
              </div>
            </div>

          </div>
        </div>

        {/* Modal Controls Footer */}
        <div className="flex flex-wrap items-center justify-end gap-3 px-6 py-4 border-t border-amber-900/10 bg-slate-950">
          <button
            type="button"
            onClick={handleCopySpecs}
            className="px-4 py-2.5 rounded-xl border border-slate-800 hover:border-amber-500/20 text-slate-300 hover:text-white transition-all text-xs font-mono font-medium flex items-center gap-1.5 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-400" />
                <span className="text-emerald-400">Specifications Copied!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-400" />
                <span>Copy Specs to Clipboard</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handlePrint}
            className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all text-xs font-mono font-semibold uppercase flex items-center gap-1.5 cursor-pointer shadow-lg shadow-amber-500/5 hover:shadow-amber-500/10"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save Layout PDF</span>
          </button>
        </div>

      </div>
    </div>
  );
};
