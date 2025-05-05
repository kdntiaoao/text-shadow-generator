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

export type AppState = {
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
};
