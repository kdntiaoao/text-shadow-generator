// Shadow settings type definitions
export interface ShadowSettings {
  strokeWidth: number;
  color: string;
  innerShadow: boolean;
  glow: boolean;
  glowIntensity: number;
}

export interface TextSettings {
  content: string;
  fontSize: number;
  fontWeight: number;
  color: string;
}

export interface Preset {
  id: string;
  name: string;
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
}

export interface AppState {
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
  presets: Preset[];
  currentPresetId: string | null;
}
