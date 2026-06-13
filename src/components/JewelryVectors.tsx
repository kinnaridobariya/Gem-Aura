import React from "react";

interface VectorProps extends React.SVGProps<SVGSVGElement> {
  metal: "yellow" | "rose" | "silver";
  gemColor: string;
}

const getMetalGradients = (idPrefix: string, metal: "yellow" | "rose" | "silver") => {
  switch (metal) {
    case "rose":
      return (
        <linearGradient id={`${idPrefix}-metalGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF2EC" />
          <stop offset="30%" stopColor="#E9967A" />
          <stop offset="70%" stopColor="#D15F47" />
          <stop offset="100%" stopColor="#8A331E" />
        </linearGradient>
      );
    case "silver":
      return (
        <linearGradient id={`${idPrefix}-metalGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="30%" stopColor="#E2E8F0" />
          <stop offset="70%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
      );
    case "yellow":
    default:
      return (
        <linearGradient id={`${idPrefix}-metalGrad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFDF0" />
          <stop offset="30%" stopColor="#FACC15" />
          <stop offset="70%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>
      );
  }
};

// 1. Radiant Halo Diamond Ring Vector
export const CrownTiaraVector: React.FC<VectorProps> = ({ metal, gemColor, className, ...props }) => {
  const id = "tiara";
  return (
    <svg viewBox="0 0 200 200" className={className} {...props}>
      <defs>
        {getMetalGradients(id, metal)}
        <radialGradient id={`${id}-gemGrad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="40%" stopColor={gemColor} stopOpacity={0.8} />
          <stop offset="100%" stopColor={gemColor} />
        </radialGradient>
      </defs>

      {/* Tiara Base Arch */}
      <path
        d="M25,170 Q100,195 175,170"
        fill="none"
        stroke={`url(#${id}-metalGrad)`}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M35,160 Q100,182 165,160"
        fill="none"
        stroke={`url(#${id}-metalGrad)`}
        strokeWidth="3"
        strokeDasharray="1 4"
      />

      {/* Royal Crown Spikes */}
      {/* Left side */}
      <path d="M40,163 Q60,110 50,130 C50,130 65,120 70,148" fill={`url(#${id}-metalGrad)`} />
      {/* Mid Left */}
      <path d="M70,148 Q90,75 80,105 C80,105 95,95 100,138" fill={`url(#${id}-metalGrad)`} />
      {/* Center Main Spike */}
      <path d="M100,138 Q100,50 100,85 Q100,50 100,138" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="8" strokeLinecap="round" />
      <path d="M100,138 Q100,45 100,138" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.7" />
      {/* Mid Right */}
      <path d="M130,148 Q110,75 120,105 C120,105 105,95 100,138" fill={`url(#${id}-metalGrad)`} />
      {/* Right side */}
      <path d="M160,163 Q140,110 150,130 C150,130 135,120 130,148" fill={`url(#${id}-metalGrad)`} />

      {/* Gemstones embedded along the base */}
      <circle cx="50" cy="172" r="4" fill={`url(#${id}-gemGrad)`} />
      <circle cx="75" cy="177" r="4" fill={`url(#${id}-gemGrad)`} />
      <circle cx="100" cy="179" r="4" fill={`url(#${id}-gemGrad)`} />
      <circle cx="125" cy="177" r="4" fill={`url(#${id}-gemGrad)`} />
      <circle cx="150" cy="172" r="4" fill={`url(#${id}-gemGrad)`} />

      {/* Elegant Crown Filigree */}
      <path d="M70,150 Q100,120 130,150" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="2" />
      <path d="M50,155 Q100,100 150,155" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="1.5" strokeOpacity="0.8" />

      {/* Main Top Gemstones */}
      {/* Center Crown Gem */}
      <path d="M100,40 L112,58 L100,76 L88,58 Z" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="1.5" />
      <circle cx="100" cy="58" r="3" fill="#FFFFFF" opacity="0.8" />
      {/* Left Spire Gem */}
      <circle cx="50" cy="115" r="7" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="1" />
      {/* Mid Left Spire Gem */}
      <circle cx="80" cy="90" r="9" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="1" />
      {/* Mid Right Spire Gem */}
      <circle cx="120" cy="90" r="9" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="1" />
      {/* Right Spire Gem */}
      <circle cx="150" cy="115" r="7" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="1" />

      {/* Sparkle Flares */}
      <path d="M100,25 L100,35 M95,30 L105,30" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M45,100 L55,100 M50,95 L50,105" stroke="#FFF" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
      <path d="M155,100 L145,100 M150,95 L150,105" stroke="#FFF" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
};

// 2. Tear-Drop Necklace Vector
export const NecklaceVector: React.FC<VectorProps> = ({ metal, gemColor, className, ...props }) => {
  const id = "necklace";
  return (
    <svg viewBox="0 0 200 200" className={className} {...props}>
      <defs>
        {getMetalGradients(id, metal)}
        <radialGradient id={`${id}-gemGrad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="35%" stopColor={gemColor} stopOpacity={0.8} />
          <stop offset="100%" stopColor={gemColor} />
        </radialGradient>
      </defs>

      {/* Elegant chain loop */}
      <path
        d="M40,25 C45,140 155,140 160,25"
        fill="none"
        stroke={`url(#${id}-metalGrad)`}
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M45,25 C50,135 150,135 155,25"
        fill="none"
        stroke="#FFF"
        strokeWidth="1"
        strokeOpacity="0.5"
        strokeDasharray="2 3"
      />

      {/* Intricate hanging mount beads */}
      {[50, 60, 70, 80, 90, 110, 120, 130, 140, 150].map((angle, idx) => {
        // Simple positioning points modeled on chain curve
        const factor = angle / 100 - 1; // -0.5 to +0.5
        const cx = 100 + factor * 90;
        const cy = 80 + (0.25 - factor * factor) * 35;
        return <circle key={idx} cx={cx} cy={cy} r="2.5" fill={`url(#${id}-metalGrad)`} />;
      })}

      {/* Pendant Ring Link */}
      <circle cx="100" cy="115" r="7" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="3" />

      {/* Halo Diamond Cushion surrounding major gem */}
      <path
        d="M100,111 C113,111 123,121 123,138 C123,155 100,172 100,172 C100,172 77,155 77,138 C77,121 87,111 100,111 Z"
        fill={`url(#${id}-metalGrad)`}
        filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.35))"
      />

      {/* Minor halo mini-gems */}
      <circle cx="88" cy="120" r="1.5" fill="white" />
      <circle cx="112" cy="120" r="1.5" fill="white" />
      <circle cx="82" cy="132" r="1.5" fill="white" />
      <circle cx="118" cy="132" r="1.5" fill="white" />
      <circle cx="84" cy="145" r="1.5" fill="white" />
      <circle cx="116" cy="145" r="1.5" fill="white" />
      <circle cx="91" cy="157" r="1.5" fill="white" />
      <circle cx="109" cy="157" r="1.5" fill="white" />
      <circle cx="100" cy="166" r="2.0" fill="white" />

      {/* Main tear-drop gemstone */}
      <path
        d="M100,116 C109,116 116,124 116,137 C116,150 100,165 100,165 C100,165 84,150 84,137 C84,124 91,116 100,116 Z"
        fill={`url(#${id}-gemGrad)`}
        stroke="white"
        strokeWidth="1"
      />

      {/* Tear-drop cut facet highlights */}
      <path d="M100,123 L108,135 L100,154 L92,135 Z" fill="#FFF" fillOpacity="0.25" />
      <path d="M100,116 L100,123 M100,154 L100,165" stroke="white" strokeWidth="1" opacity="0.6" />

      {/* Radiating sparkle stars */}
      <path d="M112,110 L118,110 M115,107 L115,113" stroke="#FFF" strokeWidth="1.2" />
      <path d="M78,145 L84,145 M81,142 L81,148" stroke="#FFF" strokeWidth="1.2" />
    </svg>
  );
};

// 3. Luxurious Halo Oval Diamond Ring Vector
export const RingVector: React.FC<VectorProps> = ({ metal, gemColor, className, ...props }) => {
  const id = "ring";
  return (
    <svg viewBox="0 0 200 200" className={className} {...props}>
      <defs>
        {getMetalGradients(id, metal)}
        <radialGradient id={`${id}-gemGrad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="45%" stopColor={gemColor} stopOpacity={0.8} />
          <stop offset="100%" stopColor={gemColor} />
        </radialGradient>
      </defs>

      {/* Ring Band - Circular finger hoop */}
      <circle
        cx="100"
        cy="125"
        r="44"
        fill="none"
        stroke={`url(#${id}-metalGrad)`}
        strokeWidth="7"
        filter="drop-shadow(0px 2px 4px rgba(0,0,0,0.15))"
      />
      <circle
        cx="100"
        cy="125"
        r="44"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="1.5"
        strokeDasharray="6 3"
        opacity="0.35"
      />

      {/* Shoulder channel-set small diamonds on shank */}
      <path d="M51,105 Q65,85 100,85 Q135,85 149,105" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="9" />
      {/* Small shoulder diamonds on the curves */}
      <circle cx="60" cy="98" r="2.5" fill="#FFF" />
      <circle cx="70" cy="94" r="2.5" fill="#FFF" />
      <circle cx="80" cy="91" r="2.5" fill="#FFF" />
      <circle cx="120" cy="91" r="2.5" fill="#FFF" />
      <circle cx="130" cy="94" r="2.5" fill="#FFF" />
      <circle cx="140" cy="98" r="2.5" fill="#FFF" />

      {/* Cathedral Setting pillars */}
      <path d="M72,100 L90,80 L100,80" stroke={`url(#${id}-metalGrad)`} strokeWidth="5" fill="none" />
      <path d="M128,100 L110,80 L100,80" stroke={`url(#${id}-metalGrad)`} strokeWidth="5" fill="none" />

      {/* Outer Halo Outer Ring */}
      <ellipse
        cx="100"
        cy="74"
        rx="28"
        ry="22"
        fill={`url(#${id}-metalGrad)`}
        filter="drop-shadow(0px 4px 8px rgba(0,0,0,0.3))"
      />

      {/* Halo Accent Brilliance Points (Surrounding white spots) */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 23;
        const cy = 74 + Math.sin(rad) * 17;
        return <circle key={idx} cx={cx} cy={cy} r="2.2" fill="#FFFFFF" />;
      })}

      {/* Central Gem Mount Bezel */}
      <ellipse cx="100" cy="74" rx="19" ry="14" fill={`url(#${id}-metalGrad)`} stroke="#FFF" strokeWidth="0.8" />

      {/* Main Oval Brilliant Gemstone */}
      <ellipse cx="100" cy="74" rx="17" ry="12.5" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="1.2" />

      {/* Gem Facet Overlay Layout */}
      <path d="M100,61.5 L108,68 L117,74 L108,80 L100,86.5 L92,80 L83,74 L92,68 Z" fill="#FFF" fillOpacity="0.25" />
      <path d="M100,61.5 L100,86.5 M83,74 L117,74" stroke="#FFF" strokeWidth="0.8" opacity="0.6" />

      {/* Four Prong Tips on Crown */}
      <circle cx="84.5" cy="63" r="2.5" fill={`url(#${id}-metalGrad)`} stroke="#FFF" strokeWidth="0.5" />
      <circle cx="115.5" cy="63" r="2.5" fill={`url(#${id}-metalGrad)`} stroke="#FFF" strokeWidth="0.5" />
      <circle cx="84.5" cy="85" r="2.5" fill={`url(#${id}-metalGrad)`} stroke="#FFF" strokeWidth="0.5" />
      <circle cx="115.5" cy="85" r="2.5" fill={`url(#${id}-metalGrad)`} stroke="#FFF" strokeWidth="0.5" />

      {/* Starburst Lens Flares */}
      <path d="M112,58 L122,58 M117,53 L117,63" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M80,89 L90,89 M85,84 L85,94" stroke="#FFF" strokeWidth="1" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
};

// 4. Elegant Chandelier Earrings Vector
export const EarringsVector: React.FC<VectorProps> = ({ metal, gemColor, className, ...props }) => {
  const id = "earrings";
  return (
    <svg viewBox="0 0 200 200" className={className} {...props}>
      <defs>
        {getMetalGradients(id, metal)}
        <radialGradient id={`${id}-gemGrad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="40%" stopColor={gemColor} stopOpacity={0.8} />
          <stop offset="100%" stopColor={gemColor} />
        </radialGradient>
      </defs>

      {/* EARRING LEFT */}
      <g transform="translate(-15, 0)">
        {/* Ear Hook loop */}
        <path d="M60,35 A8,8 0 0,1 72,40 L72,55" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="72" cy="55" r="2.5" fill={`url(#${id}-metalGrad)`} />

        {/* Hanging top halo bead */}
        <circle cx="72" cy="66" r="6" fill={`url(#${id}-metalGrad)`} />
        <circle cx="72" cy="66" r="4.2" fill={`url(#${id}-gemGrad)`} />

        {/* Elegant filigree links */}
        <path d="M72,72 L72,85" stroke={`url(#${id}-metalGrad)`} strokeWidth="2" />
        <path d="M57,85 Q72,75 87,85" stroke={`url(#${id}-metalGrad)`} strokeWidth="2.5" fill="none" />

        {/* Chandelier Shield structure */}
        <path d="M57,85 C57,115 72,125 72,125 C72,125 87,115 87,85 Z" fill={`url(#${id}-metalGrad)`} opacity="0.9" />

        {/* Small cluster gems inside shield */}
        <circle cx="72" cy="94" r="3.5" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.5" />
        <circle cx="65" cy="106" r="2.5" fill="white" />
        <circle cx="79" cy="106" r="2.5" fill="white" />
        <circle cx="72" cy="115" r="3" fill="#FFF" />

        {/* Draping Tear-drop bottom droplets */}
        {/* Outer Left droplet */}
        <line x1="57" y1="85" x2="52" y2="135" stroke={`url(#${id}-metalGrad)`} strokeWidth="1.5" />
        <path d="M52,135 C50,135 48,142 52,148 C56,142 54,135 52,135 Z" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.5" />

        {/* Center droplet */}
        <line x1="72" y1="125" x2="72" y2="148" stroke={`url(#${id}-metalGrad)`} strokeWidth="2" />
        <path d="M72,148 C69,148 66,156 72,164 C78,156 75,148 72,148 Z" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.8" />

        {/* Outer Right droplet */}
        <line x1="87" y1="85" x2="92" y2="135" stroke={`url(#${id}-metalGrad)`} strokeWidth="1.5" />
        <path d="M92,135 C90,135 88,142 92,148 C96,142 94,135 92,135 Z" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.5" />
      </g>

      {/* EARRING RIGHT */}
      <g transform="translate(55, 0)">
        {/* Ear Hook loop */}
        <path d="M60,35 A8,8 0 0,1 72,40 L72,55" fill="none" stroke={`url(#${id}-metalGrad)`} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="72" cy="55" r="2.5" fill={`url(#${id}-metalGrad)`} />

        {/* Hanging top halo bead */}
        <circle cx="72" cy="66" r="6" fill={`url(#${id}-metalGrad)`} />
        <circle cx="72" cy="66" r="4.2" fill={`url(#${id}-gemGrad)`} />

        {/* Elegant filigree links */}
        <path d="M72,72 L72,85" stroke={`url(#${id}-metalGrad)`} strokeWidth="2" />
        <path d="M57,85 Q72,75 87,85" stroke={`url(#${id}-metalGrad)`} strokeWidth="2.5" fill="none" />

        {/* Chandelier Shield structure */}
        <path d="M57,85 C57,115 72,125 72,125 C72,125 87,115 87,85 Z" fill={`url(#${id}-metalGrad)`} opacity="0.9" />

        {/* Small cluster gems inside shield */}
        <circle cx="72" cy="94" r="3.5" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.5" />
        <circle cx="65" cy="106" r="2.5" fill="white" />
        <circle cx="79" cy="106" r="2.5" fill="white" />
        <circle cx="72" cy="115" r="3" fill="#FFF" />

        {/* Draping Tear-drop bottom droplets */}
        {/* Outer Left droplet */}
        <line x1="57" y1="85" x2="52" y2="135" stroke={`url(#${id}-metalGrad)`} strokeWidth="1.5" />
        <path d="M52,135 C50,135 48,142 52,148 C56,142 54,135 52,135 Z" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.5" />

        {/* Center droplet */}
        <line x1="72" y1="125" x2="72" y2="148" stroke={`url(#${id}-metalGrad)`} strokeWidth="2" />
        <path d="M72,148 C69,148 66,156 72,164 C78,156 75,148 72,148 Z" fill={`url(#${id}-gemGrad)`} stroke="white" strokeWidth="0.8" />

        {/* Outer Right droplet */}
        <line x1="87" y1="85" x2="92" y2="135" stroke={`url(#${id}-metalGrad)`} strokeWidth="1.5" />
        <path d="M92,135 C90,135 88,142 92,148 C96,142 94,135 92,135 Z" fill={`url(#Template:Earring}-gemGrad)`} stroke="white" strokeWidth="0.5" />
      </g>

      {/* Dynamic Star sparkles */}
      <path d="M120,53 L126,53 M123,50 L123,56" stroke="#FFF" strokeWidth="1" />
      <path d="M42,120 L48,120 M45,117 L45,123" stroke="#FFF" strokeWidth="1" />
    </svg>
  );
};

// 5. Deluxe Diamond Tennis Bracelet Vector
export const BraceletVector: React.FC<VectorProps> = ({ metal, gemColor, className, ...props }) => {
  const id = "bracelet";
  return (
    <svg viewBox="0 0 200 200" className={className} {...props}>
      <defs>
        {getMetalGradients(id, metal)}
        <radialGradient id={`${id}-gemGrad`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity={0.9} />
          <stop offset="42%" stopColor={gemColor} stopOpacity={0.8} />
          <stop offset="100%" stopColor={gemColor} />
        </radialGradient>
      </defs>

      {/* Classic curvy oval bracelet layout */}
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="36"
        fill="none"
        stroke={`url(#${id}-metalGrad)`}
        strokeWidth="6"
        filter="drop-shadow(0px 3px 6px rgba(0,0,0,0.25))"
      />
      <ellipse
        cx="100"
        cy="100"
        rx="78"
        ry="36"
        fill="none"
        stroke="#FFF"
        strokeWidth="1"
        strokeDasharray="4 8"
        opacity="0.4"
      />

      {/* Repeating bezel-set diamonds along the link */}
      {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345].map((angle, idx) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 100 + Math.cos(rad) * 78;
        const cy = 100 + Math.sin(rad) * 36;
        
        // Use alternate colors for a highly detailed multi-colored gemstone look
        const isOdd = idx % 2 === 1;
        const fillStyle = isOdd ? `url(#${id}-gemGrad)` : "url(#bracelet-whiteGemGrad)";
        
        return (
          <g key={idx}>
            {/* White diamond gradient nested */}
            <defs>
              <radialGradient id="bracelet-whiteGemGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </radialGradient>
            </defs>
            {/* Golden setting bezel */}
            <circle cx={cx} cy={cy} r="5" fill={`url(#${id}-metalGrad)`} />
            <circle cx={cx} cy={cy} r="3.2" fill={fillStyle} stroke="white" strokeWidth="0.5" />
            <circle cx={cx - 1} cy={cy - 1} r="0.8" fill="#FFF" opacity="0.8" />
          </g>
        );
      })}

      {/* Deluxe Emerald cut Center Statement Medallion */}
      <g transform="translate(100, 100)">
        {/* Shadow layer */}
        <polygon points="-24,-14 24,-14 28,-10 28,10 24,14 -24,14 -28,10 -28,-10" fill="rgba(0,0,0,0.4)" />
        {/* Metal link setting */}
        <polygon points="-22,-12 22,-12 26,-8 26,8 22,12 -22,12 -26,8 -26,-8" fill={`url(#${id}-metalGrad)`} />
        {/* Halo Mini-diamonds surrounding center crown */}
        {[-18, -12, -6, 0, 6, 12, 18].map((x, i) => (
          <g key={i}>
            <circle cx={x} cy="-10" r="1.5" fill="#FFF" />
            <circle cx={x} cy="10" r="1.5" fill="#FFF" />
          </g>
        ))}
        {/* Large stunning brilliant emerald cut sapphire / ruby / yellow diamond */}
        <polygon points="-16,-7 16,-7 19,-4 19,4 16,7 -16,7 -19,4 -19,-4" fill={`url(#${id}-gemGrad)`} stroke="#FFF" strokeWidth="1" />
        {/* Gem facets */}
        <line x1="-12" y1="-7" x2="-12" y2="7" stroke="#FFF" strokeWidth="0.5" opacity="0.5" />
        <line x1="12" y1="-7" x2="12" y2="7" stroke="#FFF" strokeWidth="0.5" opacity="0.5" />
        <line x1="-19" y1="0" x2="19" y2="0" stroke="#FFF" strokeWidth="0.5" opacity="0.4" />
      </g>

      {/* Sparkling diamond burst overlay */}
      <path d="M125,75 L133,75 M129,71 L129,79" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M70,125 L76,125 M73,122 L73,128" stroke="#FFF" strokeWidth="1" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
};
