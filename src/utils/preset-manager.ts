import type { Preset, ShadowSettings, TextSettings } from "../types";

const STORAGE_KEY = "text-shadow-presets";

export function savePresets(presets: Preset[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

export function loadPresets(): Preset[] {
  const presets = localStorage.getItem(STORAGE_KEY);
  return presets ? JSON.parse(presets) : [];
}

export function createShareableUrl(
  shadowSettings: ShadowSettings,
  textSettings: TextSettings,
): string {
  const params = new URLSearchParams();

  params.append("sw", shadowSettings.strokeWidth.toString());
  params.append("sc", shadowSettings.color);
  params.append("tx", encodeURIComponent(textSettings.content));
  params.append("fs", textSettings.fontSize.toString());
  params.append("fw", textSettings.fontWeight.toString());
  params.append("tc", textSettings.color);

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

export function parseUrlParams(): {
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
} | null {
  if (!window.location.search) return null;

  // TODO: URLパラメータから取得した値はバリデーションする
  const params = new URLSearchParams(window.location.search);

  try {
    const shadowSettings: ShadowSettings = {
      strokeWidth: Number.parseInt(params.get("sw") || "0", 10),
      color: params.get("sc") || "#000000",
    };

    const textSettings: TextSettings = {
      content: decodeURIComponent(params.get("tx") || "Preview Text"),
      fontSize: Number.parseInt(params.get("fs") || "0", 10),
      fontWeight: Number.parseInt(params.get("fw") || "0", 10),
      color: params.get("tc") || "#ffffff",
    };

    return { shadowSettings, textSettings };
  } catch (error) {
    console.error("Error parsing URL parameters:", error);
    return null;
  }
}
