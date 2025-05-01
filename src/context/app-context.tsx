import type React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import type { AppState, Preset, ShadowSettings, TextSettings } from "../types";
import {
  loadPresets,
  parseUrlParams,
  savePresets,
} from "../utils/preset-manager";

// Initial shadow settings
const defaultShadowSettings: ShadowSettings = {
  strokeWidth: 2,
  color: "#000000",
  innerShadow: false,
  glow: false,
  glowIntensity: 1,
};

// Initial text settings
const defaultTextSettings: TextSettings = {
  content: "Preview Text",
  fontSize: 36,
  fontWeight: 700,
  color: "#ffffff",
};

// Initial app state
const initialState: AppState = {
  shadowSettings: defaultShadowSettings,
  textSettings: defaultTextSettings,
  presets: [],
  currentPresetId: null,
};

// Action types
type Action =
  | { type: "SET_SHADOW_SETTINGS"; payload: Partial<ShadowSettings> }
  | { type: "SET_TEXT_SETTINGS"; payload: Partial<TextSettings> }
  | { type: "ADD_PRESET"; payload: Preset }
  | {
      type: "UPDATE_PRESET";
      payload: {
        id: string;
        shadowSettings: ShadowSettings;
        textSettings: TextSettings;
      };
    }
  | { type: "DELETE_PRESET"; payload: string }
  | { type: "LOAD_PRESET"; payload: string }
  | { type: "LOAD_PRESETS"; payload: Preset[] }
  | {
      type: "LOAD_FROM_URL";
      payload: { shadowSettings: ShadowSettings; textSettings: TextSettings };
    };

// Reducer function
function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_SHADOW_SETTINGS":
      return {
        ...state,
        shadowSettings: {
          ...state.shadowSettings,
          ...action.payload,
        },
      };

    case "SET_TEXT_SETTINGS":
      return {
        ...state,
        textSettings: {
          ...state.textSettings,
          ...action.payload,
        },
      };

    case "ADD_PRESET":
      return {
        ...state,
        presets: [...state.presets, action.payload],
        currentPresetId: action.payload.id,
      };

    case "UPDATE_PRESET": {
      const { id, shadowSettings, textSettings } = action.payload;
      const updatedPresets = state.presets.map((preset) =>
        preset.id === id ? { ...preset, shadowSettings, textSettings } : preset,
      );

      return {
        ...state,
        presets: updatedPresets,
      };
    }

    case "DELETE_PRESET": {
      const filteredPresets = state.presets.filter(
        (preset) => preset.id !== action.payload,
      );

      return {
        ...state,
        presets: filteredPresets,
        currentPresetId:
          filteredPresets.length > 0 ? filteredPresets[0].id : null,
      };
    }

    case "LOAD_PRESET": {
      const presetToLoad = state.presets.find(
        (preset) => preset.id === action.payload,
      );

      if (!presetToLoad) return state;

      return {
        ...state,
        shadowSettings: { ...presetToLoad.shadowSettings },
        textSettings: { ...presetToLoad.textSettings },
        currentPresetId: presetToLoad.id,
      };
    }

    case "LOAD_PRESETS":
      return {
        ...state,
        presets: action.payload,
      };

    case "LOAD_FROM_URL":
      return {
        ...state,
        shadowSettings: action.payload.shadowSettings,
        textSettings: action.payload.textSettings,
        currentPresetId: null,
      };

    default:
      return state;
  }
}

// Context type
interface AppContextType {
  state: AppState;
  setShadowSettings: (settings: Partial<ShadowSettings>) => void;
  setTextSettings: (settings: Partial<TextSettings>) => void;
  addPreset: (name: string) => void;
  updatePreset: (id: string) => void;
  deletePreset: (id: string) => void;
  loadPreset: (id: string) => void;
}

// Create context
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load presets from localStorage on initial render
  useEffect(() => {
    const savedPresets = loadPresets();
    dispatch({ type: "LOAD_PRESETS", payload: savedPresets });

    // Check for URL parameters
    const urlParams = parseUrlParams();
    if (urlParams) {
      dispatch({
        type: "LOAD_FROM_URL",
        payload: urlParams,
      });
    }
  }, []);

  // Save presets to localStorage when they change
  useEffect(() => {
    savePresets(state.presets);
  }, [state.presets]);

  // Context value
  const contextValue: AppContextType = {
    state,
    setShadowSettings: (settings) =>
      dispatch({ type: "SET_SHADOW_SETTINGS", payload: settings }),
    setTextSettings: (settings) =>
      dispatch({ type: "SET_TEXT_SETTINGS", payload: settings }),
    addPreset: (name) => {
      const newPreset: Preset = {
        id: Date.now().toString(),
        name,
        shadowSettings: state.shadowSettings,
        textSettings: state.textSettings,
      };
      dispatch({ type: "ADD_PRESET", payload: newPreset });
    },
    updatePreset: (id) => {
      dispatch({
        type: "UPDATE_PRESET",
        payload: {
          id,
          shadowSettings: state.shadowSettings,
          textSettings: state.textSettings,
        },
      });
    },
    deletePreset: (id) => {
      dispatch({ type: "DELETE_PRESET", payload: id });
    },
    loadPreset: (id) => {
      dispatch({ type: "LOAD_PRESET", payload: id });
    },
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
}

// Custom hook to use the app context
export function useAppContext() {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
