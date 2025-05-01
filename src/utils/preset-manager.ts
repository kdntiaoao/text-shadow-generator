import type { Preset, ShadowSettings, TextSettings } from "../types";

const STORAGE_KEY = "text-shadow-presets";

// Generate a unique ID for new presets
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Save presets to localStorage
export function savePresets(presets: Preset[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
}

// Load presets from localStorage
export function loadPresets(): Preset[] {
  const presets = localStorage.getItem(STORAGE_KEY);
  return presets ? JSON.parse(presets) : [];
}

// Create a new preset
export function createPreset(
  name: string,
  shadowSettings: ShadowSettings,
  textSettings: TextSettings,
): Preset {
  return {
    id: generateId(),
    name,
    shadowSettings,
    textSettings,
  };
}

// Delete a preset
export function deletePreset(presets: Preset[], id: string): Preset[] {
  return presets.filter((preset) => preset.id !== id);
}

// Get preset by ID
export function getPresetById(
  presets: Preset[],
  id: string,
): Preset | undefined {
  return presets.find((preset) => preset.id === id);
}

// Update an existing preset
export function updatePreset(
  presets: Preset[],
  id: string,
  shadowSettings: ShadowSettings,
  textSettings: TextSettings,
): Preset[] {
  return presets.map((preset) => {
    if (preset.id === id) {
      return {
        ...preset,
        shadowSettings,
        textSettings,
      };
    }
    return preset;
  });
}

// Create URL parameters from settings
export function createShareableUrl(
  shadowSettings: ShadowSettings,
  textSettings: TextSettings,
): string {
  const params = new URLSearchParams();

  // Add shadow settings
  params.append("sw", shadowSettings.strokeWidth.toString());
  params.append("sc", shadowSettings.color);
  params.append("is", shadowSettings.innerShadow ? "1" : "0");
  params.append("gl", shadowSettings.glow ? "1" : "0");
  params.append("gi", shadowSettings.glowIntensity.toString());

  // Add text settings
  params.append("tx", encodeURIComponent(textSettings.content));
  params.append("fs", textSettings.fontSize.toString());
  params.append("fw", textSettings.fontWeight.toString());
  params.append("tc", textSettings.color);

  return `${window.location.origin}${window.location.pathname}?${params.toString()}`;
}

// Parse URL parameters into settings
export function parseUrlParams(): {
  shadowSettings: ShadowSettings;
  textSettings: TextSettings;
} | null {
  if (!window.location.search) return null;

  const params = new URLSearchParams(window.location.search);

  try {
    const shadowSettings: ShadowSettings = {
      strokeWidth: Number.parseInt(params.get("sw") || "0", 10),
      color: params.get("sc") || "#000000",
      innerShadow: params.get("is") === "1",
      glow: params.get("gl") === "1",
      glowIntensity: Number.parseFloat(params.get("gi") || "1"),
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
