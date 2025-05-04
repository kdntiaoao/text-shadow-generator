export type ShadowSettings = {
  strokeWidth: number;
  color: string;
};

export type TextSettings = {
  content: string;
  fontSize: number;
  fontWeight: number;
  color: string;
};

export type Preset = {
  id: string;
  name: string;
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
};

export type AppState = {
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
  presets: Preset[];
  currentPresetId: string | null;
};
