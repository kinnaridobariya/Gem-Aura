import React from "react";
import { StylingSuggestion } from "../types";
import { Sparkles, Compass, Award, Feather, ShieldCheck } from "lucide-react";

interface StylistReportProps {
  suggestion: StylingSuggestion;
}

export const StylistReport: React.FC<StylistReportProps> = ({ suggestion }) => {
  return (
    <div className="space-y-6 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 p-6 rounded-2xl border border-amber-500/20 shadow-xl text-[#FDF6E2]">
      {/* Narrative Headline */}
      <div className="text-center pb-4 border-b border-amber-900/20">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono tracking-widest uppercase mb-2">
          <Sparkles className="h-3 w-3 animate-spin" style={{ animationDuration: "25s" }} />
          <span>Bespoke Design Blueprint</span>
        </div>
        <h3 className="font-serif text-2xl font-bold tracking-wider text-amber-100 italic">
          &ldquo;{suggestion.story.split("&ldquo;").join("").split("&rdquo;").join("").split('"')[0] || "Your Gem Aura Masterpiece"}&rdquo;
        </h3>
        <p className="text-xs text-[#C5B358] font-mono tracking-widest mt-1 uppercase">
          Coordinated Alchemist Report
        </p>
      </div>

      {/* Primary specs row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Metal Color Option */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Precious Metallurgy</span>
            <h4 className="text-sm font-semibold text-amber-300 mt-1">{suggestion.metalType}</h4>
          </div>
          <p className="text-[11px] text-[#C5B358] font-mono uppercase tracking-wider mt-2">
            🎨 Color tone: {suggestion.overlayConfig?.metalColorType || "yellow"} gold
          </p>
        </div>

        {/* Diamond Cut / Gemston Shape */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Aura Gemstone Cut</span>
            <h4 className="text-sm font-semibold text-amber-300 mt-1">{suggestion.gemShape}</h4>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <span
              className="h-3.5 w-3.5 rounded-full border border-white/20"
              style={{ backgroundColor: suggestion.overlayConfig?.suggestedGemColor || "#FFFFFF" }}
            />
            <span className="text-[11px] text-[#D1C2A3] font-mono uppercase">Master Shape</span>
          </div>
        </div>

        {/* Setting Style */}
        <div className="bg-slate-950/40 p-4 rounded-xl border border-slate-900 flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Setting Silhouette</span>
            <h4 className="text-sm font-semibold text-amber-300 mt-1">{suggestion.settingStyle}</h4>
          </div>
          <span className="text-[11px] text-emerald-400 font-mono tracking-wider mt-2 flex items-center gap-1 lowercase">
            <ShieldCheck className="h-3 w-3" /> Aura harmonized
          </span>
        </div>
      </div>

      {/* Styled Color Palette chips */}
      <div className="p-4 bg-slate-950/50 rounded-xl border border-slate-900/60 space-y-2">
        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">
          Sought Aura Colorways & Gems:
        </span>
        <div className="flex flex-wrap gap-2.5 pt-1">
          {suggestion.gemColors.map((col, idx) => (
            <div
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-slate-950 border border-amber-900/10 flex items-center gap-2"
            >
              <div
                className="h-2.5 w-2.5 rounded-full ring-1 ring-white/10"
                style={{
                  backgroundColor:
                    idx === 0
                      ? suggestion.overlayConfig?.suggestedGemColor || "#E0F2FE"
                      : idx === 1
                      ? "#A855F7"
                      : "#F43F5E"
                }}
              />
              <span className="text-xs text-[#FDF6E2] font-medium">{col}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tailored description Reasoning */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 text-[#C5B358] text-xs font-semibold tracking-wider font-mono">
          <Compass className="h-4 w-4 shrink-0" />
          <span>STYLISTIC HARMONIZATION ANALYSIS</span>
        </div>
        <p className="text-xs text-[#D1C2A3] leading-relaxed bg-slate-950/30 p-4 rounded-xl border border-slate-900">
          {suggestion.analysisReasoning}
        </p>
      </div>

      {/* Accent Diamonds details */}
      <div className="space-y-2">
        <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">
          Accent Stones & Pavé Layout:
        </span>
        <p className="text-xs text-[#A8987E] italic leading-normal pl-3 border-l-2 border-amber-500/30">
          {suggestion.accentStoneRecommendations}
        </p>
      </div>

      {/* Designer guidelines list */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-1.5 text-[#C5B358] text-xs font-semibold tracking-wider font-mono">
          <Award className="h-4 w-4 shrink-0" />
          <span>MASTER DESIGNER LAWS (HOW TO WEAR)</span>
        </div>
        <ul className="space-y-2.5">
          {suggestion.designerTips.map((tip, idx) => (
            <li key={idx} className="flex gap-2.5 text-xs text-[#D1C2A3] leading-relaxed">
              <span className="h-5 w-5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center font-mono text-[10px] shrink-0">
                {idx + 1}
              </span>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Poetic Narrative Story */}
      <div className="pt-4 border-t border-amber-900/10 bg-amber-500/[0.01] p-4 rounded-xl">
        <div className="flex items-center gap-1.5 text-[#C5B358] text-xs font-semibold tracking-wider font-mono mb-2">
          <Feather className="h-4 w-4 shrink-0" />
          <span>THE BESPOKE NARRATIVE STORY</span>
        </div>
        <p className="text-xs text-[#C5B358]/80 italic leading-relaxed">
          &ldquo;{suggestion.story}&rdquo;
        </p>
      </div>
    </div>
  );
};
