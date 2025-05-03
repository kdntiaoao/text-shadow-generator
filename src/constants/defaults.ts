import type { ShadowSettings, TextSettings } from "@/types";

export const DEFAULT_SHADOW_SETTINGS: ShadowSettings = {
  strokeWidth: 2,
  color: "#000000",
  innerShadow: false,
  glow: false,
  glowIntensity: 1,
};

export const DEFAULT_TEXT_SETTINGS: TextSettings = {
  content: "Preview Text",
  fontSize: 36,
  fontWeight: 700,
  color: "#ffffff",
};
