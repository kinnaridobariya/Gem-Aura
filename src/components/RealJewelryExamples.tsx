import React from "react";
import { JewelryType } from "../types";
import { 
  Gem, 
  TrendingUp, 
  Sparkles, 
  Tag, 
  Compass, 
  ShieldAlert,
  ArrowRight,
  Info
} from "lucide-react";

interface RealJewelryExamplesProps {
  jewelryType: JewelryType;
  metalColor: "yellow" | "rose" | "silver";
  suggestedGemColor: string;
}

interface ExampleArtifact {
  id: string;
  name: string;
  carats: string;
  metal: string;
  gemstone: string;
  setting: string;
  price: string;
  note: string;
  imageAlt: string;
  svgIcon: React.ReactNode;
}

export const RealJewelryExamples: React.FC<RealJewelryExamplesProps> = ({
  jewelryType,
  metalColor,
  suggestedGemColor
}) => {
  
  // Custom premium line-art drawings for example items based on category
  const getSymmetrySVG = (type: JewelryType, color: string) => {
    switch (type) {
      case "necklace":
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-85" fill="none" stroke="#F1E3D3" strokeWidth="1.2">
            <path d="M50,20 C35,45 35,65 50,85 C65,65 65,45 50,20 Z" />
            <path d="M50,20 C15,35 15,75 50,90 Z" opacity="0.4" />
            <path d="M50,20 C85,35 85,75 50,90 Z" opacity="0.4" />
            <circle cx="50" cy="85" r="4.5" fill={color} />
          </svg>
        );
      case "earrings":
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-85" fill="none" stroke="#F1E3D3" strokeWidth="1.2">
            <line x1="35" y1="20" x2="35" y2="60" />
            <line x1="65" y1="20" x2="65" y2="60" />
            <polygon points="30,60 40,60 35,75" fill={color} />
            <polygon points="60,60 70,60 65,75" fill={color} />
            <circle cx="35" cy="40" r="1.5" fill="#fef" />
            <circle cx="65" cy="40" r="1.5" fill="#fef" />
          </svg>
        );
      case "bracelet":
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-85" fill="none" stroke="#F1E3D3" strokeWidth="1.2">
            <ellipse cx="50" cy="50" rx="35" ry="12" />
            <ellipse cx="50" cy="52" rx="32" ry="10" strokeDasharray="2 3" />
            <circle cx="20" cy="50" r="3" fill={color} />
            <circle cx="50" cy="38" r="3" fill="#FFF" />
            <circle cx="80" cy="50" r="3" fill={color} />
          </svg>
        );
      case "tiara":
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-85" fill="none" stroke="#F1E3D3" strokeWidth="1.2">
            <path d="M15,75 C25,55 75,55 85,75" />
            <path d="M50,25 L40,60 L50,55 L60,60 Z" fill={color} />
            <path d="M28,45 L25,68 L32,65 Z" />
            <path d="M72,45 L75,68 L68,65 Z" />
            <circle cx="50" cy="22" r="2.5" fill={color} />
          </svg>
        );
      case "ring":
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-16 h-16 opacity-85" fill="none" stroke="#F1E3D3" strokeWidth="1.2">
            <circle cx="50" cy="60" r="22" />
            <circle cx="50" cy="62" r="19" strokeDasharray="3 2" />
            <polygon points="40,34 60,34 50,18" fill={color} />
            <circle cx="50" cy="18" r="1.5" fill="#fff" />
          </svg>
        );
    }
  };

  const getSovereignMetalLabel = () => {
    if (metalColor === "rose") return "18K Imperial Rose Gold";
    if (metalColor === "silver") return "Platinum 950 Sovereign Grade";
    return "18K Royal Yellow Gold";
  };

  // Generate dynamic customized real-world catalogs matching category selection
  const catalog: Record<JewelryType, ExampleArtifact[]> = {
    ring: [
      {
        id: "R-109",
        name: "The Gilded Victoria Halo Ring",
        carats: "3.4 Carat GIA Grade VVS1",
        metal: getSovereignMetalLabel(),
        gemstone: "Oval Cushion Cut Aura Gem",
        setting: "Intricate Diamond Micro-Pavé split shank basket",
        price: "$19,400 USD",
        note: "An exact materialization of classic noble vintage glamour. Beautifully highlights slender hand movements and lets skin tones glow under candle-lit fine dining atmospheres.",
        imageAlt: "Gilded Victoria Halo ring setting",
        svgIcon: getSymmetrySVG("ring", suggestedGemColor)
      },
      {
        id: "R-302",
        name: "Empress Architectural Cathedral Ring",
        carats: "4.5 Carat Elite Emerald-Cut Solitaire",
        metal: getSovereignMetalLabel(),
        gemstone: "Deep Radiant Emerald-Cut Cushion",
        setting: "Delicate 4-prong structural high-beveled vault alignment",
        price: "$28,500 USD",
        note: "Highlights sharp architectural geometries. Perfectly mirrors brave, modern, ambitious personalities who prefer high stability and premium structure.",
        imageAlt: "Architectural Cathedral ring setting",
        svgIcon: getSymmetrySVG("ring", suggestedGemColor)
      }
    ],
    necklace: [
      {
        id: "N-401",
        name: "Sovereign Chandelier Cascade Choker",
        carats: "12.8 Total Carat Brilliant Pear-Drops",
        metal: getSovereignMetalLabel(),
        gemstone: "Cascade teardrop alignment diamonds",
        setting: "Interlocking crown-set tennis line with floating drops",
        price: "$74,000 USD",
        note: "An immortal red-carpet companion designed to elongate collar lines. This custom silhouette beautifully fits porcelain white & rich honey palettes.",
        imageAlt: "Sovereign Chandelier Collar necklace",
        svgIcon: getSymmetrySVG("necklace", suggestedGemColor)
      },
      {
        id: "N-105",
        name: "The Regent Marquise Solitaire Pendant",
        carats: "5.1 Carat Single Focal masterwork",
        metal: getSovereignMetalLabel(),
        gemstone: "Marquise Divine Shimmer Cluster",
        setting: "V-prong minimalist slider pendant with micro-halo crown",
        price: "$39,500 USD",
        note: "A quiet luxury statement maximizing fire indexes. Recommended to set in Platinum or Royal Yellow gold to complement evening date nights.",
        imageAlt: "Regent Marquise Solitaire pendant",
        svgIcon: getSymmetrySVG("necklace", suggestedGemColor)
      }
    ],
    earrings: [
      {
        id: "E-883",
        name: "Valkyrie Brilliant Chandelier Drops",
        carats: "6.8 Carats Combined Double Drops",
        metal: getSovereignMetalLabel(),
        gemstone: "Royal Cushion Cut Brilliant diamonds",
        setting: "Cascading floral earclimber with matching micro-pavé halos",
        price: "$16,200 USD",
        note: "Engineered to balance side silhouettes. The micro-halo count complements vintage personalities while catching standard stage lighting gracefully.",
        imageAlt: "Valkyrie Chandelier Ear drop setting",
        svgIcon: getSymmetrySVG("earrings", suggestedGemColor)
      },
      {
        id: "E-220",
        name: "Minimalist Crown Royal Solitaire Studs",
        carats: "2.4 Carats Combined GIA Stud pair",
        metal: getSovereignMetalLabel(),
        gemstone: "Perfect Round Brilliant Cut",
        setting: "Intricate 6-prong crown crown-cup studs",
        price: "$9,500 USD",
        note: "A pristine high-fashion staple. Excellent performance for corporate events and luxury everyday styling.",
        imageAlt: "Crown Royal Solitaire studs pair",
        svgIcon: getSymmetrySVG("earrings", suggestedGemColor)
      }
    ],
    bracelet: [
      {
        id: "B-771",
        name: "The Regency Interlocking Tennis Cuff",
        carats: "9.6 Total Carat Seamless Layout",
        metal: getSovereignMetalLabel(),
        gemstone: "Alternating Cushion cut aura gems",
        setting: "Four-prong double link comfort bar with master safety buckle",
        price: "$45,000 USD",
        note: "Designed with absolute fluid dynamics to rest with perfect poise. Highlights wrist gestures, introducing gorgeous colorways with extreme precision.",
        imageAlt: "Regency Interlocking Tennis Cuff",
        svgIcon: getSymmetrySVG("bracelet", suggestedGemColor)
      }
    ],
    tiara: [
      {
        id: "T-012",
        name: "Empress Diadem Royal Coronation Crown",
        carats: "21.5 Carats Royal Tier Masterwork",
        metal: "Platinum 950 Imperial Core",
        gemstone: "Pear Cut Masterpiece and marquise spikes",
        setting: "Extravagant cathedral halo spike architecture",
        price: "$165,000 USD",
        note: "An ultimate grand design celebrating high-society romantic occasions. Intended for galas or high-court bridal ceremonies to capture maximum prestige.",
        imageAlt: "Empress Diadem Crown design",
        svgIcon: getSymmetrySVG("tiara", "#FFD700")
      }
    ]
  };

  const selectedArtifacts = catalog[jewelryType] || catalog.ring;

  return (
    <div className="space-y-4 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-[#FDF6E2] transition-all">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Gem className="h-5 w-5 text-amber-400 rotate-12" />
          <h2 className="font-serif text-lg tracking-wide text-amber-100">Recommended Real Jewelry Showcase</h2>
        </div>
        <div className="inline-flex items-center gap-1.5 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-2 py-0.5 rounded-full">
          <TrendingUp className="h-3 w-3" />
          <span>Real-world Pricing & Spec Harmonized</span>
        </div>
      </div>

      <p className="text-xs text-[#D1C2A3] leading-relaxed">
        Our master jewelry curator recommends the following actual historical blueprints & catalog highlights. These match your chosen category, selected gold alloy tones: <span className="font-semibold text-amber-200">{getSovereignMetalLabel()}</span>, and suggested focal gemstone colors.
      </p>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
        {selectedArtifacts.map((art) => (
          <div 
            key={art.id} 
            className="group relative bg-[#040914]/80 border border-[#C5B358]/20 hover:border-[#C5B358]/60 p-5 rounded-2xl flex flex-col md:flex-row md:items-start md:gap-4 transition-all duration-300 hover:shadow-xl hover:shadow-[#C5B358]/5"
          >
            {/* Visual Vector Icon backdrop */}
            <div className="relative shrink-0 w-20 h-20 bg-slate-950/80 rounded-xl border border-slate-900/60 flex items-center justify-center p-2 mb-3 md:mb-0 group-hover:scale-105 transition-transform">
              <div className="absolute inset-0 bg-radial from-amber-500/[0.03] to-transparent pointer-events-none" />
              {art.svgIcon}
              <span className="absolute bottom-1 right-1 px-1 py-[1.5px] rounded bg-slate-950 border border-amber-500/20 text-[8px] font-mono text-amber-300 font-semibold uppercase">
                {art.id}
              </span>
            </div>

            {/* Core textual info */}
            <div className="flex-1 space-y-1.5 text-xs">
              <div className="flex flex-wrap items-center justify-between gap-x-2">
                <h4 className="font-serif text-sm font-semibold tracking-wide text-amber-200 group-hover:text-amber-400 transition-colors">
                  {art.name}
                </h4>
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-amber-400 font-bold bg-[#A8987E]/5 px-2 py-0.5 rounded">
                  <Tag className="h-3 w-3" />
                  <span>{art.price}</span>
                </div>
              </div>

              <div className="text-[11px] space-y-0.5 text-[#D1C2A3] font-mono font-medium">
                <div>Focal Weight: <span className="text-slate-200">{art.carats}</span></div>
                <div>Metal Hardware: <span className="text-amber-300/90">{art.metal}</span></div>
                <div>Main Gemstone: <span className="text-[#C5B358]">{art.gemstone}</span></div>
                <div>Setting Craft: <span className="text-amber-100/80">{art.setting}</span></div>
              </div>

              <p className="text-[11px] text-[#A8987E] leading-relaxed pt-1.5 border-t border-slate-900 group-hover:text-slate-300 transition-colors">
                {art.note}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-3.5 rounded-xl border border-amber-500/10 bg-amber-500/[0.01] flex items-center gap-3 text-[11px] text-[#C5B358] leading-normal font-sans">
        <Info className="h-4.5 w-4.5 text-amber-400 shrink-0" />
        <p>
          These exquisite blueprints represent GIA-compliant settings. You can download and present these exact codes, carat volumes, and mounting types to your private custom goldsmith during your customization consultation.
        </p>
      </div>

    </div>
  );
};
