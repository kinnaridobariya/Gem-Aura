import React from "react";
import { Sparkles, HelpCircle } from "lucide-react";

export const AuraHeader: React.FC = () => {
  return (
    <header className="border-b border-amber-900/20 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative p-2 bg-gradient-to-tr from-amber-500 to-yellow-300 rounded-lg shadow-inner shadow-amber-900/30">
          <Sparkles className="h-5 w-5 text-slate-950 animate-pulse" />
        </div>
        <div>
          <h1 className="font-serif text-2xl tracking-widest text-[#FDF6E2] font-semibold">
            GEM <span className="text-amber-400">AURA</span>
          </h1>
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C5B358] opacity-80">
            Luxury Jewelry Alchemist & AR Try-On
          </p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-[#D4C4A8]">
        <div className="px-3 py-1.5 rounded-full border border-amber-500/20 bg-amber-500/5 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>ALCHEMIST ACTIVE</span>
        </div>
        <div className="flex items-center gap-1 opacity-75 hover:opacity-100 cursor-pointer transition-opacity">
          <HelpCircle className="h-4 w-4 text-amber-400" />
          <span>Stylist Guidance</span>
        </div>
      </div>
    </header>
  );
};
