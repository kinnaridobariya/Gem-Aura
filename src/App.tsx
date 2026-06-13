import React, { useState, useRef, useEffect } from "react";
import { CustomerProfile, StylingSuggestion, JewelryType } from "./types";
import { AuraHeader } from "./components/AuraHeader";
import { ProfileForm } from "./components/ProfileForm";
import { StylistReport } from "./components/StylistReport";
import { RealJewelryExamples } from "./components/RealJewelryExamples";
import { JewelerCertificateModal } from "./components/JewelerCertificateModal";
import {
  CrownTiaraVector,
  NecklaceVector,
  RingVector,
  EarringsVector,
  BraceletVector
} from "./components/JewelryVectors";
import {
  Camera,
  Upload,
  RotateCcw,
  Sparkles,
  Maximize2,
  ZoomIn,
  Move,
  RotateCw,
  Sliders,
  Download,
  CheckCircle,
  TrendingUp,
  SlidersHorizontal,
  RefreshCw,
  ChevronRight,
  Info,
  ShieldCheck,
  Award
} from "lucide-react";

// Elegantly pre-select default gemstone tones
const GEMSTONE_PALETTE = [
  { name: "D-Flawless (Clear)", hex: "#F8FAFC" },
  { name: "Canary (Canary Yellow)", hex: "#FDE047" },
  { name: "Royal Sapphire (Blue)", hex: "#1D4ED8" },
  { name: "Crimson Ruby (Deep Red)", hex: "#DC2626" },
  { name: "Imperial Emerald (Lush Green)", hex: "#047857" },
  { name: "African Amethyst (Imperial Purple)", hex: "#7E22CE" },
  { name: "Blush Peach Morganite", hex: "#FFB09C" },
  { name: "Champagne Cognac", hex: "#EAB308" }
];

export default function App() {
  const [profile, setProfile] = useState<CustomerProfile>({
    jewelryType: "ring",
    personality: "Classic & Timeless",
    birthstone: "None - pure diamond focus",
    skinColor: "#F3C594",
    hairColor: "Black",
    eyeColor: "Brown",
    faceShape: "Oval",
    zodiac: "Leo",
    occasion: "Bridal",
    userImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<StylingSuggestion | null>(null);
  const [certificateOpen, setCertificateOpen] = useState(false);

  // AR Try-on state parameters
  const [arScale, setArScale] = useState<number>(1.0);
  const [arRotation, setArRotation] = useState<number>(0);
  const [arPosX, setArPosX] = useState<number>(0);
  const [arPosY, setArPosY] = useState<number>(0);

  // On-the-fly customizable properties for interactive jewelry modifications
  const [activeGemColor, setActiveGemColor] = useState<string>("#FFFFFF");
  const [activeMetal, setActiveMetal] = useState<"yellow" | "rose" | "silver">("yellow");

  // Camera stream variables
  const [streamActive, setStreamActive] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Drag and drop mechanics state
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [savedLooks, setSavedLooks] = useState<Array<{
    id: string;
    name: string;
    jewelryType: string;
    gemColor: string;
    metal: string;
    timestamp: string;
  }>>([]);
  const [showSavedNotification, setShowSavedNotification] = useState(false);

  // Initialize with standard demo blueprint on first load to make app immediately engaging
  useEffect(() => {
    // Generate initial luxury state matching the default preset
    setSuggestion({
      metalType: "18K Yellow Gold",
      gemShape: "Oval Cut",
      settingStyle: "Vintage Diamond Halo",
      gemColors: ["D-Color Flawless Diamond", "Golden Canary Diamond", "Soft Amber Citrine"],
      analysisReasoning: "A glorious 18k Yellow Gold halo structure is ideal for bringing out the beautiful warmth in Golden Olive skins. The brilliant, elongated facets of the Oval Cut maximize light transmission and visually elevate physical posture, while the vintage diamond halo complements elegant personalities seeking classic, immortal prestige for bridal occasions.",
      accentStoneRecommendations: "Bespoke micro-pavé diamonds surrounding the shank and halo.",
      designerTips: [
        "Position the ring on your middle or ring finger to elongate and balance hand proportions.",
        "Maintain high-contrast background fabrics like deep velvet or midnight navy to let the canister shine.",
        "Store in soft suede jewelry rolls away from moisture to safeguard the intense 18k yellow gold luster."
      ],
      story: "The 'Aura of Empress Victoria'—a timeless masterwork celebrating classic high-society romance.",
      overlayConfig: {
        metalColorType: "yellow",
        suggestedGemColor: "#FFFFFF",
        scaleMultiplier: 1.1,
        rotationOffset: 0
      }
    });
    setActiveGemColor("#FFFFFF");
    setActiveMetal("yellow");
  }, []);

  // Whenever suggestion loads or changes, update interactive parameters
  useEffect(() => {
    if (suggestion) {
      setActiveGemColor(suggestion.overlayConfig?.suggestedGemColor || "#FFFFFF");
      setActiveMetal(suggestion.overlayConfig?.metalColorType || "yellow");
      setArScale(suggestion.overlayConfig?.scaleMultiplier || 1.1);
      setArRotation(suggestion.overlayConfig?.rotationOffset || 0);
      setArPosX(0);
      setArPosY(0);
    }
  }, [suggestion]);

  // Request & Start real-time camera stream
  const handleStartCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480, facingMode: "user" }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setStreamActive(true);
        // Clear uploaded image to prioritize live video
        setProfile(prev => ({ ...prev, userImage: null }));
      }
    } catch (err: any) {
      console.error("Camera access failed:", err);
      setCameraError("Unable to access front camera. Please verify device permissions or try uploading a high-contrast photo instead.");
    }
  };

  const handleStopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setStreamActive(false);
  };

  // Process uploaded image base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(prev => ({ ...prev, userImage: reader.result as string }));
        // Stop camera if active to prevent overlapping visual tracks
        handleStopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearMedia = () => {
    handleStopCamera();
    setProfile(prev => ({ ...prev, userImage: null }));
  };

  // Submit profile to Express backend calling Gemini flash model
  const handleConsultStylist = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/suggest-jewelry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jewelryType: profile.jewelryType,
          personality: profile.personality,
          birthstone: profile.birthstone,
          skinColor: profile.skinColor,
          hairColor: profile.hairColor,
          eyeColor: profile.eyeColor,
          faceShape: profile.faceShape,
          zodiac: profile.zodiac,
          occasion: profile.occasion,
          userImage: profile.userImage // Send base64 payload to let Gemini analyze appearance constraints!
        }),
      });

      if (!response.ok) {
        throw new Error("Aura analysis failure. Utilizing premium fallback suggestions.");
      }

      const data: StylingSuggestion = await response.json();
      setSuggestion(data);
    } catch (error) {
      console.error(error);
      // Hard fallback structured layout so flow is never interrupted
      setSuggestion({
        metalType: "Platinum 950",
        gemShape: "Radiant Emerald Cut",
        settingStyle: "Modern Architectural Tier",
        gemColors: ["Imperial Teal Tourmaline", "Cognac Diamond", "Sparkling Brilliance White"],
        analysisReasoning: "A futuristic platinum tier provides robust structural symmetry that highlights individual grit. This complements bold personalities, utilizing crisp clean geometric lines that match the occasion beautifully.",
        accentStoneRecommendations: "Baguette diamond rails wrapped along the shoulders.",
        designerTips: [
          "Maintain clear workspace contrast when modeling.",
          "Keep adjacent dress shirts or jewelry metals minimal.",
          "Polish platinum surfaces using fiber cloths to keep highlights pristine."
        ],
        story: "The 'Futurism Aura'—a sleek, modern, linear masterwork reflecting ambition and modern confidence.",
        overlayConfig: {
          metalColorType: "silver",
          suggestedGemColor: "#2DD4BF",
          scaleMultiplier: 1.0,
          rotationOffset: 0
        }
      });
    } finally {
      setLoading(false);
    }
  };

  // Reset interactive overlay adjustments
  const handleResetARAdjustments = () => {
    if (suggestion) {
      setArScale(suggestion.overlayConfig?.scaleMultiplier || 1.1);
      setArRotation(suggestion.overlayConfig?.rotationOffset || 0);
    } else {
      setArScale(1.0);
      setArRotation(0);
    }
    setArPosX(0);
    setArPosY(0);
  };

  // Custom click-and-drag mechanics directly on try-on preview
  const handleDragStart = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    dragStart.current = { x: clientX - arPosX, y: clientY - arPosY };
  };

  const handleDragMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    setArPosX(clientX - dragStart.current.x);
    setArPosY(clientY - dragStart.current.y);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Save customized look to profile gallery
  const handleSaveLookAndSpecs = () => {
    const timestamp = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    
    // Create new saved item
    const newItem = {
      id: Math.random().toString(36).substring(2, 9),
      name: suggestion?.story || "Custom Breathtaking Setup",
      jewelryType: profile.jewelryType,
      gemColor: GEMSTONE_PALETTE.find(g => g.hex === activeGemColor)?.name || "Bespoke Hue",
      metal: activeMetal,
      timestamp
    };

    setSavedLooks(prev => [newItem, ...prev]);
    setShowSavedNotification(true);
    setTimeout(() => setShowSavedNotification(false), 3500);
  };

  // Delete saved look
  const handleDeleteLook = (id: string) => {
    setSavedLooks(prev => prev.filter(look => look.id !== id));
  };

  // Render correct Jewelry Vector based on type
  const renderInteractiveJewelry = (className: string) => {
    const props = {
      metal: activeMetal,
      gemColor: activeGemColor,
      className,
      style: {
        transform: `translate(${arPosX}px, ${arPosY}px) scale(${arScale}) rotate(${arRotation}deg)`,
        transition: isDragging ? "none" : "transform 0.15s ease-out",
        cursor: isDragging ? "grabbing" : "grab"
      }
    };

    switch (profile.jewelryType) {
      case "necklace":
        return <NecklaceVector {...props} />;
      case "earrings":
        return <EarringsVector {...props} />;
      case "bracelet":
        return <BraceletVector {...props} />;
      case "tiara":
        return <CrownTiaraVector {...props} />;
      case "ring":
      default:
        return <RingVector {...props} />;
    }
  };

  // Minimalist Studio Posture Vectors for standard backups
  const renderStudioBackdropSilhouette = () => {
    // Elegant line outlines matching the current selected jewelry type
    switch (profile.jewelryType) {
      case "necklace":
        return (
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-35" fill="none" stroke="#F1E3D3" strokeWidth="1.5">
            {/* Elegant neck and shoulder curve */}
            <path d="M200,80 C180,120 180,180 180,210 C180,225 150,250 120,265 C70,290 40,320 40,360 L360,360 C360,320 330,290 280,265 C250,250 220,225 220,210 C220,180 220,120 200,80" />
            <path d="M165,80 C165,70 235,70 235,80" strokeDasharray="3 3" />
            <circle cx="200" cy="180" r="1.5" fill="#C5B358" />
            <span className="absolute bottom-4 left-4 text-[9px] font-mono tracking-widest text-amber-300">STUDIO COCHLEA BACKSTAGE</span>
          </svg>
        );
      case "earrings":
        return (
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-35" fill="none" stroke="#F1E3D3" strokeWidth="1.5">
            {/* Elegant profile ear outline */}
            <path d="M140,110 C140,80 170,50 210,50 C250,50 270,80 270,120 C270,165 240,195 240,210 C240,230 220,250 200,250 C180,250 175,230 180,215 C185,200 195,190 210,180 C231,166 242,145 240,120 C238,90 210,75 190,80 C170,85 160,115 165,140" />
            <circle cx="200" cy="245" r="2" fill="#C5B358" />
            <circle cx="200" cy="245" r="12" strokeDasharray="2 3" />
          </svg>
        );
      case "bracelet":
        return (
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-35" fill="none" stroke="#F1E3D3" strokeWidth="1.5">
            {/* Elegant wrist model gesture line-art */}
            <path d="M120,40 C140,120 120,200 110,250 C100,290 120,330 150,350 C180,370 240,360 260,320 C280,280 260,180 240,100 M110,250 Q180,280 265,245" />
            {/* Wrist crease reference line */}
            <path d="M115,265 Q180,292 260,260" strokeDasharray="3 3"/>
          </svg>
        );
      case "tiara":
        return (
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-35" fill="none" stroke="#F1E3D3" strokeWidth="1.5">
            {/* Serene face profile looking right */}
            <path d="M90,340 C100,270 120,230 140,200 C150,185 140,140 135,110 C130,80 155,50 195,50 C235,50 260,80 260,120 C260,135 270,140 280,150 C295,165 295,180 280,185 C270,190 265,195 265,210 C265,230 255,270 280,340" />
            <path d="M140,100 C150,90 240,90 250,100" strokeDasharray="3 4" stroke="#FFF" />
          </svg>
        );
      case "ring":
      default:
        return (
          <svg viewBox="0 0 400 400" className="absolute inset-0 w-full h-full opacity-35" fill="none" stroke="#F1E3D3" strokeWidth="1.5">
            {/* Hand & slender elegant finger silhouette */}
            <path d="M150,360 L150,220 C150,210 145,200 145,190 L145,90 C145,75 165,75 165,90 L165,180 L175,180 L175,60 C175,45 195,45 195,60 L195,170 L205,170 L205,75 C205,60 225,60 225,75 L225,185 L235,185 L235,100 C235,85 255,85 255,100 L255,230 C255,300 240,330 220,360 Z" />
            {/* Ring placement zone */}
            <ellipse cx="195" cy="135" rx="14" ry="4" strokeDasharray="3 2" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-[#FDF6E2] font-sans antialiased overflow-x-hidden selection:bg-amber-400 selection:text-slate-950">
      <AuraHeader />

      {/* Main Luxury Split Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: Configuration Workspace (5 Columns lg) */}
        <section className="lg:col-span-5 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-300 text-[10px] font-mono tracking-widest uppercase">
              <Award className="h-3 w-3" />
              <span>Goldsmith Atelier</span>
            </div>
            <h2 className="font-serif text-3xl tracking-wide font-medium">Bespoke Jewelry Architect</h2>
            <p className="text-xs text-[#D1C2A3] leading-relaxed">
              Design a masterpiece reflecting your core personality. The Gem Aura AI will analyze your physical profile, skin palette, and birthdays to generate a custom-suited fine jewelry design blueprint.
            </p>
          </div>

          <ProfileForm
            profile={profile}
            setProfile={setProfile}
            onAnalyze={handleConsultStylist}
            loading={loading}
          />

          {/* Master designer advice statement */}
          <div className="p-4 rounded-xl border border-amber-500/10 bg-amber-500/[0.02] flex gap-3 text-xs leading-relaxed text-[#C5B358]">
            <Info className="h-5 w-5 shrink-0 text-amber-400" />
            <div>
              <span className="font-semibold block mb-0.5">Note on Virtual Try-on:</span>
              Allow webcam permissions to stream real-time camera feeds, upload a high-contrast portrait photo, or utilize our premium vector posture silhouettes tailored beautifully for your selected jewelry template.
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: AR Studio Viewport & AI Suggestion Output (7 Columns lg) */}
        <section className="lg:col-span-7 space-y-8 lg:sticky lg:top-24">
          
          {/* Main Interactive AR Try-on Canvas */}
          <div className="relative bg-slate-900 rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl flex flex-col items-stretch">
            
            {/* Live Camera, Static Photo, or Silhouette Studio Canvas */}
            <div
              id="tryon-viewport"
              className="relative h-[480px] bg-slate-950 flex items-center justify-center overflow-hidden"
              style={{ backgroundColor: profile.skinColor ? `${profile.skinColor}08` : "#020617" }}
              onMouseDown={handleDragStart}
              onMouseMove={handleDragMove}
              onMouseUp={handleDragEnd}
              onMouseLeave={handleDragEnd}
              onTouchStart={handleDragStart}
              onTouchMove={handleDragMove}
              onTouchEnd={handleDragEnd}
            >
              {/* Complex backdrop state determination */}
              {streamActive ? (
                /* Live Webcam Stream */
                <video
                  ref={videoRef}
                  className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
                  playsInline
                  muted
                />
              ) : profile.userImage ? (
                /* Static Portrait Photo */
                <img
                  src={profile.userImage}
                  alt="User try-on template"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                /* Standard Pure Gold Contour Studio Silhouette representing postural coordinates */
                <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-900 flex items-center justify-center">
                  {renderStudioBackdropSilhouette()}
                  {/* Backdrop information overlay */}
                  <div className="absolute top-4 left-4 bg-slate-950/80 border border-amber-500/20 rounded-lg px-2 py-1 text-[10px] font-mono tracking-wider text-amber-300">
                    STUDIO POSTURE ENGAGED
                  </div>
                </div>
              )}

              {/* Dynamic Overlay Shadow reflecting the user's skin color for high-performance integration */}
              {profile.skinColor && (
                <div
                  className="absolute inset-0 pointer-events-none mix-blend-color opacity-25"
                  style={{ backgroundColor: profile.skinColor }}
                />
              )}

              {/* super-imposition AR jewelry layer with drag, scale, and rotation */}
              <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none select-none">
                {renderInteractiveJewelry("w-56 h-56 select-none pointer-events-auto")}
              </div>

              {/* Quick instructions indicator overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 bg-slate-950/70 backdrop-blur-md border border-amber-500/30 rounded-full px-4 py-1.5 flex items-center gap-2 text-xs text-[#FDF6E2] cursor-move shadow-lg">
                <Move className="h-3.5 w-3.5 text-amber-400 animate-bounce" />
                <span>Drag, zoom or turn to align beautifully</span>
              </div>

              {/* Top Control Media HUD */}
              <div className="absolute top-4 right-4 z-30 flex items-center gap-2.5">
                {/* Media Reset indicator */}
                {(streamActive || profile.userImage) && (
                  <button
                    type="button"
                    onClick={handleClearMedia}
                    className="p-2 rounded-xl bg-slate-950/80 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1 cursor-pointer"
                    title="Switch back to Studio Posture Outlines"
                  >
                    Clear Media
                  </button>
                )}
                
                {/* Change Backdrop file input */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <button
                  type="button"
                  id="btn-upload-ar"
                  onClick={triggerFileInput}
                  className="p-2.5 rounded-xl bg-slate-950/90 border border-slate-800 hover:border-amber-500/40 text-amber-300 hover:text-amber-400 transition-all cursor-pointer flex items-center gap-2"
                  title="Upload profile image"
                >
                  <Upload className="h-4 w-4" />
                </button>

                {streamActive ? (
                  <button
                    type="button"
                    onClick={handleStopCamera}
                    className="py-2 px-3.5 rounded-xl bg-red-950/80 border border-red-500/40 hover:bg-red-900/90 text-red-300 transition-all text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                    <span>STOP CAM</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    id="btn-start-camera"
                    onClick={handleStartCamera}
                    className="py-2 px-3.5 rounded-xl bg-emerald-950/85 border border-emerald-500/40 hover:bg-emerald-900/90 text-emerald-300 transition-all text-xs font-mono font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Camera className="h-4 w-4" />
                    <span>TRY LIVE CAMERA</span>
                  </button>
                )}
              </div>

              {/* Camera Error Alert HUD */}
              {cameraError && (
                <div className="absolute inset-x-4 top-16 z-30 bg-red-950/90 border border-red-500/30 rounded-xl p-3 text-xs text-red-200 leading-tight">
                  {cameraError}
                </div>
              )}
            </div>

            {/* Live Fine-tuning Interactive Controls Panel */}
            <div className="bg-slate-950/95 border-t border-amber-900/30 p-5 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-amber-900/10">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-amber-400" />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-[#C5B358]">AR Alchemist Controls</h3>
                </div>
                <button
                  type="button"
                  onClick={handleResetARAdjustments}
                  className="px-2.5 py-1 rounded-md border border-slate-800 hover:border-amber-900 text-[10px] font-mono text-slate-400 hover:text-amber-300 transition-all flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" /> Reset positioning
                </button>
              </div>

              {/* Sliders for Placement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-xs font-mono">
                {/* Scale Multiplier Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#A8987E]">
                    <span>JEWELRY VOLUME SCALING</span>
                    <span className="text-amber-400">{(arScale * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.3"
                    max="2.5"
                    step="0.05"
                    value={arScale}
                    onChange={(e) => setArScale(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Rotation Offset Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#A8987E]">
                    <span>ROTATE RADIANS</span>
                    <span className="text-amber-400">{arRotation}°</span>
                  </div>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={arRotation}
                    onChange={(e) => setArRotation(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* X Position Offset */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#A8987E]">
                    <span>HORIZONTAL SHIFT (X)</span>
                    <span className="text-amber-300">{arPosX}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={arPosX}
                    onChange={(e) => setArPosX(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                {/* Y Position Offset */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-[11px] text-[#A8987E]">
                    <span>VERTICAL SHIFT (Y)</span>
                    <span className="text-amber-300">{arPosY}px</span>
                  </div>
                  <input
                    type="range"
                    min="-200"
                    max="200"
                    value={arPosY}
                    onChange={(e) => setArPosY(parseInt(e.target.value))}
                    className="w-full h-1 bg-slate-900 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
              </div>

              {/* Real-time Custom Alloy Selection & Custom Gemstone Selection Overrides */}
              <div className="pt-3 border-t border-amber-900/10 grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Override Metal Alloy */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">
                    Precious Metal Swaps:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: "yellow", label: "Yellow Gold" },
                      { id: "rose", label: "Rose Gold" },
                      { id: "silver", label: "Platinum" }
                    ].map((m) => (
                      <button
                        type="button"
                        key={m.id}
                        onClick={() => setActiveMetal(m.id as any)}
                        className={`py-1.5 px-2 rounded-lg text-center transition-all text-[11px] cursor-pointer ${
                          activeMetal === m.id
                            ? "bg-amber-400 text-slate-950 font-bold"
                            : "bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-900/40"
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Override Gemstone Shimmer */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#A8987E]">
                    Bespoke Gemstone Colors:
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {GEMSTONE_PALETTE.map((g) => (
                      <button
                        type="button"
                        key={g.name}
                        onClick={() => setActiveGemColor(g.hex)}
                        className={`h-6 w-6 rounded-full border transition-all cursor-pointer transform hover:scale-110 flex items-center justify-center ${
                          activeGemColor === g.hex
                            ? "border-amber-400 ring-2 ring-amber-400/40"
                            : "border-slate-800 hover:border-slate-500"
                        }`}
                        title={g.name}
                        style={{ backgroundColor: g.hex }}
                      >
                        {activeGemColor === g.hex && (
                          <span className={`h-1.5 w-1.5 rounded-full ${g.hex === "#F8FAFC" ? "bg-slate-900" : "bg-white"}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Save Design and Export look */}
              <div className="pt-2">
                <button
                  type="button"
                  id="btn-save-specs"
                  onClick={handleSaveLookAndSpecs}
                  className="w-full py-3.5 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-amber-500/5 hover:bg-amber-500/10 text-amber-300 hover:text-amber-400 transition-all font-mono text-xs tracking-wider font-semibold uppercase flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Download className="h-4 w-4" />
                  <span>SAVE THE DESIGNS & RECORD CERTIFICATE</span>
                </button>
              </div>

            </div>
          </div>

          {/* Toast Notification for saved look */}
          {showSavedNotification && (
            <div className="p-4 bg-emerald-950 border border-emerald-500/45 rounded-2xl flex items-center gap-3 text-emerald-100 shadow-xl animate-fade-in-up">
              <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
              <div>
                <h4 className="font-semibold text-xs uppercase tracking-wider">Design blueprint Certified</h4>
                <p className="text-[11px] text-emerald-300">Your custom layout config has been secured in your personal archives gallery below.</p>
              </div>
            </div>
          )}

          {/* AI Stylist Blueprint Suggestion Output */}
          {suggestion ? (
            <div className="space-y-6">
              <StylistReport suggestion={suggestion} />
              
              {/* Luxury Jeweler Export triggers */}
              <button
                type="button"
                onClick={() => setCertificateOpen(true)}
                className="w-full py-4 rounded-xl border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 hover:bg-amber-500/15 text-amber-300 hover:text-amber-400 font-mono text-xs tracking-widest font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/5 hover:shadow-amber-500/10"
              >
                <Award className="h-4.5 w-4.5 text-amber-400 animate-pulse" />
                <span>Export Design Specs & Jeweler Certificate</span>
              </button>

              <RealJewelryExamples
                jewelryType={profile.jewelryType}
                metalColor={activeMetal}
                suggestedGemColor={activeGemColor}
              />
            </div>
          ) : (
            <div className="p-8 border border-dashed border-slate-800 rounded-2xl text-center space-y-4">
              <Sparkles className="h-8 w-8 text-amber-500/40 mx-auto animate-pulse" />
              <div className="space-y-1">
                <h4 className="font-serif text-lg tracking-wide text-amber-200/80">Awaiting your styling consultation</h4>
                <p className="text-xs text-[#A8987E] max-w-md mx-auto leading-relaxed">
                  Modify the jewelry type, specify your skin color, and click "ACTIVATE GEM AURA REPORT" in the left panel to receive premium recommendations from our master generative stylist.
                </p>
              </div>
            </div>
          )}

          {/* SAVED GALLERY: Recorded masterwork certificates */}
          {savedLooks.length > 0 && (
            <div className="p-5 bg-slate-900/40 rounded-2xl border border-slate-800 space-y-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
                <h3 className="font-serif text-sm tracking-wide text-amber-200 uppercase">Your Saved Masterwork Archive ({savedLooks.length})</h3>
              </div>
              <p className="text-[11px] text-[#A8987E] leading-snug">
                The certified layouts below represent your verified combinations, including metallurgic alloy styles and custom-picked precious gems.
              </p>
              
              <div className="divide-y divide-slate-800">
                {savedLooks.map((look) => (
                  <div key={look.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-amber-100 font-semibold">{look.name}</span>
                        <span className="text-[10px] font-mono bg-slate-950 px-2 py-0.5 rounded border border-amber-900/10 text-amber-300 capitalize shrink-0">
                          {look.jewelryType}
                        </span>
                      </div>
                      <div className="text-[11px] text-[#A8987E] flex flex-wrap gap-2">
                        <span>Gem: <span className="text-[#C5B358]">{look.gemColor}</span></span>
                        <span>•</span>
                        <span>Metal: <span className="text-[#C5B358] uppercase">{look.metal}</span></span>
                        <span>•</span>
                        <span className="text-slate-500">{look.timestamp}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteLook(look.id)}
                      className="px-2.5 py-1.5 rounded-lg border border-red-500/15 text-red-400 hover:text-red-300 hover:bg-red-950/15 text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer shrink-0"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

      </main>
      
      {/* Elegantly branded high-fashion luxury footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-8 px-6 text-center text-xs text-[#A8987E] space-y-2 font-mono">
        <p className="tracking-widest uppercase">
          © 2026 GEM AURA ARCHITECTS — bespoke diamonds & precious hardware
        </p>
        <p className="text-[10px] opacity-60">
          Crafted under professional jewelry designer guidance with AI styling algorithms.
        </p>
      </footer>
      <JewelerCertificateModal
        isOpen={certificateOpen}
        onClose={() => setCertificateOpen(false)}
        suggestion={suggestion!}
        profile={profile}
      />
    </div>
  );
}
