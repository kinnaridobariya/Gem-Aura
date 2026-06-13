export type JewelryType = "ring" | "necklace" | "earrings" | "bracelet" | "tiara";

export interface CustomerProfile {
  jewelryType: JewelryType;
  personality: string;
  birthstone: string;
  skinColor: string; // hex representation
  hairColor: string;
  eyeColor?: string;
  faceShape?: string;
  zodiac?: string;
  occasion: string;
  userImage: string | null; // base64 representation of camera shot or uploaded photo
}

export interface StylingSuggestion {
  metalType: string;
  gemShape: string;
  settingStyle: string;
  gemColors: string[];
  analysisReasoning: string;
  accentStoneRecommendations: string;
  designerTips: string[];
  story: string;
  overlayConfig: {
    metalColorType: "yellow" | "rose" | "silver";
    suggestedGemColor: string; // hex standard
    scaleMultiplier: number;
    rotationOffset: number;
  };
}

export interface ARItem {
  id: string;
  name: string;
  type: JewelryType;
  svgPath: string; // custom drawn elegant SVG or visual mockup path
  gemstoneColor: string;
  metalColor: "yellow" | "rose" | "silver";
}
