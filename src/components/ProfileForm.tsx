import React, { useState } from "react";
import { CustomerProfile, JewelryType } from "../types";
import {
  Sparkles,
  Crown,
  Smile,
  Compass,
  Gift,
  Flame,
  User,
  Heart,
  HelpCircle,
  Gem,
  ArrowLeft,
  ArrowRight,
  Check,
  Camera,
  Upload,
  RefreshCw,
  Clock,
  Eye,
  ScanFace
} from "lucide-react";

interface ProfileFormProps {
  profile: CustomerProfile;
  setProfile: React.Dispatch<React.SetStateAction<CustomerProfile>>;
  onAnalyze: () => void;
  loading: boolean;
}

const PRESET_PERSONALITIES = [
  { id: "classic", label: "Classic & Timeless", desc: "Symmetry, understated prestige, historical elegance" },
  { id: "bold", label: "Bold & Avant-Garde", desc: "Geometric sharp lines, oversized statements, rare designs" },
  { id: "minimalist", label: "Minimalist Chic", desc: "Clean solid paths, single solitaire diamonds, high utility" },
  { id: "bohemian", label: "Vintage Romantic", desc: "Floral filigrees, rose gold warmth, micro-milgrain trims" },
  { id: "extravagant", label: "Regal & Grand", desc: "High halo counts, cascading tiers of side stones" }
];

const BIRTHSTONES = [
  { name: "None - pure diamond focus", month: "--", color: "#E2E8F0" },
  { name: "Garnet (Deep Red)", month: "Jan", color: "#991B1B" },
  { name: "Amethyst (Royal Purple)", month: "Feb", color: "#7E22CE" },
  { name: "Aquamarine (Ice Blue)", month: "Mar", color: "#38BDF8" },
  { name: "Diamond (Flawless Clear)", month: "Apr", color: "#F8FAFC" },
  { name: "Emerald (Lush Green)", month: "May", color: "#047857" },
  { name: "Pearl / Alexandrite (Teal Pearl)", month: "Jun", color: "#2DD4BF" },
  { name: "Ruby (Vivid Crimson)", month: "Jul", color: "##DC2626" },
  { name: "Peridot (Lime Shimmer)", month: "Aug", color: "#84CC16" },
  { name: "Sapphire (Royal Navy Blue)", month: "Sep", color: "#1D4ED8" },
  { name: "Opal / Pink Tourmaline", month: "Oct", color: "#F472B6" },
  { name: "Topaz / Golden Citrine", month: "Nov", color: "#F59E0B" },
  { name: "Turquoise / Blue Zircon", month: "Dec", color: "#06B6D4" }
];

const PRESET_SKIN_TONES = [
  { label: "Porcelain White", hex: "#FFF5EB", desc: "Cool veins, pink undertones" },
  { label: "Warm Honey", hex: "#F3C594", desc: "Neutral veins, peach/gold" },
  { label: "Golden Olive", hex: "#D6A374", desc: "Warm gold veins, sunny bronze" },
  { label: "Rich Cocoa", hex: "#835C3E", desc: "Deep rich chocolate tones" },
  { label: "Deep Mahogany", hex: "#4A2B1E", desc: "Cool royal espresso undertones" }
];

const PRESET_HAIR_COLORS = [
  { label: "Obsidian Black", color: "Black" },
  { label: "Chestnut Brown", color: "Brown" },
  { label: "Honey Blonde", color: "Blonde" },
  { label: "Auburn Sunset", color: "Auburn/Red" },
  { label: "Platinum Silver", color: "Silver/Gray" }
];

const OCCASIONS = [
  { id: "Bridal", label: "Bridal & Wedding", icon: Heart },
  { id: "Gala", label: "Gala & Red Carpet", icon: Crown },
  { id: "Aniversary", label: "Anniversary Celebration", icon: Gift },
  { id: "Everyday", label: "Everyday Luxury", icon: Compass },
  { id: "Dinner", label: "Special Date Night", icon: Flame }
];

const PRESET_EYE_COLORS = [
  { label: "Deep Brown", color: "Brown" },
  { label: "Sky Blue", color: "Blue" },
  { label: "Emerald Green", color: "Green" },
  { label: "Mystic Hazel", color: "Hazel" },
  { label: "Cool Gray", color: "Gray" }
];

const PRESET_FACE_SHAPES = [
  { label: "Oval Face", shape: "Oval", desc: "Balanced proportions, soft curves" },
  { label: "Round Face", shape: "Round", desc: "Soft circular silhouette" },
  { label: "Square Face", shape: "Square", desc: "Strong structural jaw angles" },
  { label: "Heart Face", shape: "Heart", desc: "Tapered chin, warm forehead" },
  { label: "Diamond Face", shape: "Diamond", desc: "Dramatic cheekbone flare" }
];

const ZODIAC_SIGNS = [
  { name: "Aries", element: "Fire" },
  { name: "Taurus", element: "Earth" },
  { name: "Gemini", element: "Air" },
  { name: "Cancer", element: "Water" },
  { name: "Leo", element: "Fire" },
  { name: "Virgo", element: "Earth" },
  { name: "Libra", element: "Air" },
  { name: "Scorpio", element: "Water" },
  { name: "Sagittarius", element: "Fire" },
  { name: "Capricorn", element: "Earth" },
  { name: "Aquarius", element: "Air" },
  { name: "Pisces", element: "Water" }
];

export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  setProfile,
  onAnalyze,
  loading
}) => {
  const [activeTab, setActiveTab] = useState<"scan" | "quiz">("scan");
  const [quizStep, setQuizStep] = useState<number>(1);
  const [customPersonality, setCustomPersonality] = useState("");
  const fileInputRef2 = React.useRef<HTMLInputElement | null>(null);

  const updateProfile = (key: keyof CustomerProfile, value: any) => {
    setProfile((prev) => ({ ...prev, [key]: value }));
  };

  const handleCustomPersonalityChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setCustomPersonality(text);
    updateProfile("personality", text || "Classic & Timeless");
  };

  const selectPresetPersonality = (label: string) => {
    setCustomPersonality("");
    updateProfile("personality", label);
  };

  const handleLocalImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        updateProfile("userImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearLocalImage = () => {
    updateProfile("userImage", null);
  };

  const triggerLocalFileInput = () => {
    if (fileInputRef2.current) {
      fileInputRef2.current.click();
    }
  };

  // Move forward through quiz pages
  const nextStep = () => {
    if (quizStep < 5) {
      setQuizStep(prev => prev + 1);
    }
  };

  // Move backward through quiz pages
  const prevStep = () => {
    if (quizStep > 1) {
      setQuizStep(prev => prev - 1);
    }
  };

  return (
    <div className="space-y-6 bg-slate-900/60 p-5 md:p-6 rounded-2xl border border-amber-950 shadow-xl text-[#FDF6E2]">
      
      {/* Luxurious Header Mode Switcher Tab */}
      <div className="grid grid-cols-2 gap-2 p-1 bg-[#020617]/90 rounded-xl border border-slate-800">
        <button
          type="button"
          id="tab-scan-mode"
          onClick={() => setActiveTab("scan")}
          className={`py-3 px-2 rounded-lg text-center transition-all text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer ${
            activeTab === "scan"
              ? "bg-amber-400 text-slate-950 font-bold shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          📸 AI Portrait Scan
        </button>
        <button
          type="button"
          id="tab-quiz-mode"
          onClick={() => setActiveTab("quiz")}
          className={`py-3 px-2 rounded-lg text-center transition-all text-xs font-mono uppercase tracking-wider font-semibold cursor-pointer ${
            activeTab === "quiz"
              ? "bg-amber-400 text-slate-950 font-bold shadow"
              : "text-slate-400 hover:text-slate-200"
          }`}
        >
          ✨ Deluxe Styled Quiz
        </button>
      </div>

      {/* ==================== FEATURE MODE 1: AI PORTRAIT SCAN ==================== */}
      {activeTab === "scan" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="bg-[#020617]/40 p-4 rounded-xl border border-amber-500/10 text-xs leading-relaxed">
            <span className="font-semibold text-amber-300 flex items-center gap-1.5 mb-1 text-[11px] font-mono tracking-wider uppercase">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>FACIAL PIGMENT & STRUCTURE MAPPING</span>
            </span>
            Upload a chest-up portrait or capture with your live camera. Our styling alchemist analyzes skin color pigments, hairdo constraints, and light reflections to recommend matching settings, custom metal alloys, and gemstone shapes.
          </div>

          {/* Photo Preview inside scanner box */}
          <div className="relative border border-slate-800 bg-[#020617]/80 rounded-2xl p-4 overflow-hidden flex flex-col items-center justify-center min-h-[160px]">
            {profile.userImage ? (
              <div className="relative group w-full flex flex-col items-center">
                <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-amber-400/50 shadow-lg">
                  <img src={profile.userImage} alt="Scanned Portrait" className="w-full h-full object-cover" />
                  {/* Digital scanner line art effect */}
                  <div className="absolute inset-x-0 h-0.5 bg-amber-400/80 shadow-[0_0_8px_#F59E0B] animate-pulse" style={{ animationDuration: "1.5s", top: "50%" }}></div>
                </div>
                
                <div className="text-center mt-3 space-y-1">
                  <div className="text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1">
                    <Check className="h-3.5 w-3.5" /> PORTRAIT SPECTRA SECURED
                  </div>
                  <p className="text-[10px] text-[#A8987E]">Ready to map skin values & calculate gold tone pairing.</p>
                </div>

                <button
                  type="button"
                  onClick={handleClearLocalImage}
                  className="mt-3 px-3 py-1 rounded bg-red-950/40 border border-red-500/20 hover:border-red-500/50 text-red-300 text-[10px] uppercase font-mono transition-all cursor-pointer"
                >
                  Remove Portrait
                </button>
              </div>
            ) : (
              <div className="text-center space-y-3 py-2 w-full">
                <ScanFace className="h-10 w-10 text-[#C5B358]/40 mx-auto animate-pulse" />
                <div className="space-y-1">
                  <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-amber-200/80">No Portrait Loaded</h4>
                  <p className="text-[10px] text-[#A8987E] max-w-xs mx-auto leading-normal">
                    Drag and drop, upload from files, or click <strong>TRY LIVE CAMERA</strong> on the right viewport to feed live visual pixel coordinates!
                  </p>
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef2}
                  onChange={handleLocalImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  type="button"
                  id="btn-upload-local-scan"
                  onClick={triggerLocalFileInput}
                  className="mx-auto py-2 px-4 rounded-xl border border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 text-xs font-mono font-semibold uppercase flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Choose Image File</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Category Settings for fast scan */}
          <div className="space-y-4 pt-2">
            {/* Choose category */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A8987E]">
                Target Fine Jewelry Category:
              </label>
              <div className="grid grid-cols-5 gap-1.5">
                {(["ring", "necklace", "earrings", "bracelet", "tiara"] as JewelryType[]).map((type) => {
                  const isSelected = profile.jewelryType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => updateProfile("jewelryType", type)}
                      className={`py-2 px-1 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-amber-500/10 text-amber-300 font-bold"
                          : "border-slate-800 bg-slate-950/20 text-[#D1C2A3] text-[10px] hover:border-amber-950"
                      }`}
                    >
                      <span className="capitalize">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose event */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono uppercase tracking-wider text-[#A8987E]">
                Wear Destination / Occasion:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                {OCCASIONS.map((occ) => {
                  const isSelected = profile.occasion === occ.id;
                  return (
                    <button
                      type="button"
                      key={occ.id}
                      onClick={() => updateProfile("occasion", occ.id)}
                      className={`text-center py-2 px-1 rounded-lg border transition-all cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-amber-800/20 text-indigo-100 font-bold text-[10px]"
                          : "border-slate-800 bg-slate-950/20 text-[#D1C2A3] text-[10px]"
                      }`}
                    >
                      <span className="truncate block">{occ.label.split(" & ")[0]}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Optional custom skin-tone adjustment fallback if image is dark */}
            <div className="bg-[#020617]/50 p-3 rounded-lg border border-slate-900 text-[11px] leading-normal space-y-2">
              <span className="block text-[#A8987E] font-mono uppercase">Fine-Tune Skin Accent Tone Matching:</span>
              <div className="flex gap-2">
                {PRESET_SKIN_TONES.map((tone) => (
                  <button
                    type="button"
                    key={tone.label}
                    onClick={() => updateProfile("skinColor", tone.hex)}
                    className={`h-5 w-5 rounded-full border transform hover:scale-110 transition-all ${
                      profile.skinColor === tone.hex ? "border-amber-400 ring-2 ring-amber-400/30" : "border-transparent"
                    }`}
                    style={{ backgroundColor: tone.hex }}
                    title={tone.label}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Core Master Trigger Button */}
          <div className="pt-2">
            <button
              type="button"
              id="btn-trigger-scan-analysis"
              onClick={onAnalyze}
              disabled={loading}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-600 hover:to-yellow-400 text-slate-950 font-serif font-bold text-base tracking-widest shadow-lg shadow-amber-500/10 hover:shadow-amber-500/20 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-40 select-none disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Alchemist scanning pixels...</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5 text-slate-950 animate-pulse" />
                  <span>ACTIVATE IMAGE PIXEL SCANNER</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}


      {/* ==================== FEATURE MODE 2: DELUXE STYLE QUIZ ==================== */}
      {activeTab === "quiz" && (
        <div className="space-y-5 animate-in fade-in duration-200">
          
          {/* Progress bar info header */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A8987E] font-mono">
              <span className="uppercase tracking-widest font-semibold text-amber-300">Styling Quiz Protocol</span>
              <span>Slide {quizStep} of 5</span>
            </div>
            
            {/* Grid dots progress tracker */}
            <div className="grid grid-cols-5 gap-1.5 h-1">
              {[1, 2, 3, 4, 5].map((stepNum) => (
                <div
                  key={stepNum}
                  className={`h-full rounded-full transition-all duration-300 ${
                    quizStep >= stepNum ? "bg-amber-400" : "bg-slate-800"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* QUIZ SLIDE 1: Jewelry masterpiece Category selection */}
          {quizStep === 1 && (
            <div className="space-y-3.5 animate-in slide-in-from-right-4 duration-250">
              <div className="space-y-1">
                <h3 className="font-serif text-base text-amber-200">Select Jewelry Masterwork</h3>
                <p className="text-[11px] text-[#A8987E]">Specify which precious category should mold the design blueprints.</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-3.5">
                {(["ring", "necklace", "earrings", "bracelet", "tiara"] as JewelryType[]).map((type) => {
                  const isSelected = profile.jewelryType === type;
                  return (
                    <button
                      type="button"
                      key={type}
                      onClick={() => updateProfile("jewelryType", type)}
                      className={`py-3 px-1 rounded-xl border transition-all text-center flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-amber-500/10 text-amber-300 ring-2 ring-amber-400/10"
                          : "border-slate-800 bg-slate-950/40 hover:border-amber-900/40 text-[#D1C2A3] hover:bg-slate-950/70"
                      }`}
                    >
                      <Gem className={`h-4 w-4 ${isSelected ? "text-amber-400 animate-bounce" : "text-amber-500/55"}`} />
                      <span className="capitalize font-bold text-[10px] tracking-wider">{type}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUIZ SLIDE 2: Wear destination occasion selection */}
          {quizStep === 2 && (
            <div className="space-y-3.5 animate-in slide-in-from-right-4 duration-250">
              <div className="space-y-1">
                <h2 className="font-serif text-base text-amber-200">Sought Occasion / Destination</h2>
                <p className="text-[11px] text-[#A8987E]">Where will this spectacular hardware showcase its brilliance?</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {OCCASIONS.map((occ) => {
                  const OccIcon = occ.icon;
                  const isSelected = profile.occasion === occ.id;
                  return (
                    <button
                      type="button"
                      key={occ.id}
                      onClick={() => updateProfile("occasion", occ.id)}
                      className={`text-left p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-amber-500/10 text-amber-300 font-bold"
                          : "border-slate-800/80 bg-slate-950/30 hover:border-amber-950 text-[#D1C2A3]"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <OccIcon className="h-4 w-4 text-amber-400" />
                        <span className="text-xs uppercase font-mono tracking-wider">{occ.label}</span>
                      </div>
                      {isSelected && <span className="h-2 w-2 rounded-full bg-amber-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* QUIZ SLIDE 3: Appearance color palette skin color & hair tone matching */}
          {quizStep === 3 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-250 max-h-[380px] overflow-y-auto pr-1">
              <div className="space-y-0.5">
                <h2 className="font-serif text-base text-amber-200">Personal Appearance Palette</h2>
                <p className="text-[11px] text-[#A8987E]">We map skin tones, hair accents, eye colors, & face shapes for custom goldsmithing.</p>
              </div>

              {/* Skin Swatch rows */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Selected Skin Pigment Target:</span>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_SKIN_TONES.map((tone) => {
                    const isSelected = profile.skinColor === tone.hex;
                    return (
                      <button
                        type="button"
                        key={tone.label}
                        onClick={() => updateProfile("skinColor", tone.hex)}
                        className={`flex flex-col items-center gap-1 p-1 py-1.5 rounded-lg border text-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/10 text-amber-300"
                            : "border-slate-800 bg-slate-950/20 text-[#D1C2A3]"
                        }`}
                      >
                        <div className="h-5 w-5 rounded-full border border-slate-700/60 shadow-inner shrink-0" style={{ backgroundColor: tone.hex }} />
                        <span className="text-[9px] font-mono leading-tight truncate w-full">{tone.label.split(" ")[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hair color selectors */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Hair Tone / Accent Color:</span>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_HAIR_COLORS.map((hair) => {
                    const isSelected = profile.hairColor === hair.color;
                    return (
                      <button
                        type="button"
                        key={hair.color}
                        onClick={() => updateProfile("hairColor", hair.color)}
                        className={`py-1 rounded-lg border text-center transition-all text-[9.5px] truncate cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/10 text-amber-300 font-bold"
                            : "border-slate-800 bg-slate-950/20 text-[#D1C2A3]"
                        }`}
                      >
                        {hair.color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Eye color selectors */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Complementary Eye Color:</span>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_EYE_COLORS.map((eye) => {
                    const isSelected = profile.eyeColor === eye.color;
                    return (
                      <button
                        type="button"
                        key={eye.color}
                        onClick={() => updateProfile("eyeColor", eye.color)}
                        className={`py-1 rounded-lg border text-center transition-all text-[9.5px] truncate cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/10 text-amber-300 font-bold"
                            : "border-slate-800 bg-slate-950/20 text-[#D1C2A3]"
                        }`}
                      >
                        {eye.color}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Face Shape selectors */}
              <div className="space-y-1.5">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Face Silhouette / Earring Proportions:</span>
                <div className="grid grid-cols-5 gap-2">
                  {PRESET_FACE_SHAPES.map((fs) => {
                    const isSelected = profile.faceShape === fs.shape;
                    return (
                      <button
                        type="button"
                        key={fs.shape}
                        onClick={() => updateProfile("faceShape", fs.shape)}
                        className={`py-1 rounded-lg border text-center transition-all text-[9.5px] truncate cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-500/10 text-amber-300 font-bold"
                            : "border-slate-800 bg-slate-950/20 text-[#D1C2A3]"
                        }`}
                        title={fs.desc}
                      >
                        {fs.shape}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* QUIZ SLIDE 4: Style Vibe & custom designer description */}
          {quizStep === 4 && (
            <div className="space-y-3.5 animate-in slide-in-from-right-4 duration-250">
              <div className="space-y-1">
                <h2 className="font-serif text-base text-amber-200">Wearer Persona & Vibe</h2>
                <p className="text-[11px] text-[#A8987E]">Define the energetic signature of your unique luxury profile.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[160px] overflow-y-auto">
                {PRESET_PERSONALITIES.map((p) => {
                  const isSelected = profile.personality === p.label;
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => selectPresetPersonality(p.label)}
                      className={`text-left p-2.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? "border-amber-400 bg-amber-500/5 text-amber-300"
                          : "border-slate-800/80 bg-slate-950/10 text-[#D1C2A3]"
                      }`}
                    >
                      <div>
                        <h4 className="text-[11px] font-bold tracking-wider font-mono uppercase leading-tight">{p.label}</h4>
                        <p className="text-[9px] text-[#A8987E] leading-snug mt-0.5 truncate max-w-[190px]">{p.desc}</p>
                      </div>
                      {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-amber-400 shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom textbox */}
              <div className="space-y-1">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">Or write down custom lifestyle details:</span>
                <textarea
                  id="quiz-custom-details"
                  value={customPersonality}
                  onChange={handleCustomPersonalityChange}
                  placeholder="Describe your design tastes, outfit guidelines, preferred layouts..."
                  className="w-full h-14 p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs focus:ring-1 focus:ring-amber-400 text-slate-100 placeholder-slate-600 resize-none"
                />
              </div>
            </div>
          )}

          {/* QUIZ SLIDE 5: Birthstone Synergy and Lunar parameters */}
          {quizStep === 5 && (
            <div className="space-y-4 animate-in slide-in-from-right-4 duration-250 max-h-[400px] overflow-y-auto pr-1">
              {/* Birthstone block */}
              <div className="space-y-1.5">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-sm text-amber-200">Birthstone / Spiritual Aura</h3>
                  <p className="text-[10px] text-[#A8987E]">Include your birth month stone to unlock corresponding color properties.</p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                  {BIRTHSTONES.map((stone) => {
                    const isSelected = profile.birthstone === stone.name;
                    return (
                      <button
                        type="button"
                        key={stone.name}
                        onClick={() => updateProfile("birthstone", stone.name)}
                        className={`p-1.5 rounded-lg border text-center flex flex-col justify-center items-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/10 text-slate-100 font-bold"
                            : "border-slate-800/80 bg-slate-950/20 text-[#D1C2A3] hover:border-amber-950"
                        }`}
                      >
                        <div className="flex items-center gap-1">
                          <div className="h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: stone.color }} />
                          <span className="text-[8px] font-mono text-amber-400 uppercase font-medium">{stone.month}</span>
                        </div>
                        <div className="text-[10px] truncate max-w-[80px] mt-0.5 leading-tight">{stone.name.split(" ")[0]}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Zodiac block */}
              <div className="space-y-1.5">
                <div className="space-y-0.5">
                  <h3 className="font-serif text-sm text-amber-200">Zodiac Sign / Energy Resonance</h3>
                  <p className="text-[10px] text-[#A8987E]">Select your birth sign to integrate personalized power stones and celestial guidance.</p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 max-h-[140px] overflow-y-auto bg-slate-950/40 p-2 rounded-xl border border-slate-800">
                  {ZODIAC_SIGNS.map((zodiac) => {
                    const isSelected = profile.zodiac === zodiac.name;
                    return (
                      <button
                        type="button"
                        key={zodiac.name}
                        onClick={() => updateProfile("zodiac", zodiac.name)}
                        className={`p-1.5 rounded-lg border text-center flex flex-col justify-center items-center transition-all cursor-pointer ${
                          isSelected
                            ? "border-amber-400 bg-amber-400/10 text-slate-100 font-bold"
                            : "border-slate-800/50 bg-slate-950/20 text-[#D1C2A3] hover:border-amber-950"
                        }`}
                      >
                        <span className="text-[8px] font-mono text-amber-400 uppercase font-medium">{zodiac.element}</span>
                        <div className="text-[10px] font-semibold truncate max-w-[80px] mt-0.5 leading-tight">{zodiac.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Final submission report summary */}
              <div className="bg-[#020617]/50 p-3 rounded-lg border border-slate-900 border-dashed text-center text-[10px] text-[#A8987E] leading-normal">
                🌱 Configuration Complete! Let our premium stylist structure your personalized color moodboard, 4-piece jewelry collection, and certified specifications.
              </div>

              {/* Core trigger button on page 5 */}
              <div>
                <button
                  type="button"
                  id="btn-quiz-generate-report"
                  onClick={onAnalyze}
                  disabled={loading}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-300 hover:from-amber-600 hover:to-yellow-400 text-slate-950 font-serif font-bold text-sm tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <RefreshCw className="animate-spin h-4.5 w-4.5" />
                      <span>Alchemist assembling jewels...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4.5 w-4.5" />
                      <span>GENERATE CONCIERGE REPORT</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* Quiz Action Control footer */}
          <div className="flex items-center justify-between pt-3 border-t border-amber-990/20">
            <button
              type="button"
              onClick={prevStep}
              disabled={quizStep === 1}
              className={`py-2 px-3 text-xs font-mono font-medium rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                quizStep === 1 ? "opacity-30 cursor-not-allowed text-slate-600" : "text-amber-200 hover:text-white hover:bg-slate-950/60"
              }`}
            >
              <ArrowLeft className="h-4 w-4" /> Prev Step
            </button>
            
            {quizStep < 5 && (
              <button
                type="button"
                onClick={nextStep}
                className="py-2 px-3 text-xs font-mono font-bold bg-[#C5B358]/10 hover:bg-[#C5B358]/20 text-amber-300 rounded-lg transition-all flex items-center gap-1 cursor-pointer border border-[#C5B358]/20"
              >
                Next Step <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
