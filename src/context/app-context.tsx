import {
  DEFAULT_SHADOW_SETTINGS,
  DEFAULT_TEXT_SETTINGS,
} from "@/constants/defaults";
import { generateId } from "@/utils/generate-id";
import type React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import type { AppState, Preset, ShadowSettings, TextSettings } from "../types";
import {
  loadPresets,
  parseUrlParams,
  savePresets,
} from "../utils/preset-manager";

const initialState: AppState = {
  shadowSettings: DEFAULT_SHADOW_SETTINGS,
  textSettings: DEFAULT_TEXT_SETTINGS,
  presets: [],
  currentPresetId: null,
};

type Action =
  | { type: "SET_SHADOW_SETTINGS"; payload: Partial<ShadowSettings> }
  | { type: "SET_TEXT_SETTINGS"; payload: Partial<TextSettings> }
  | { type: "ADD_PRESET"; payload: Preset }
  | {
      type: "UPDATE_PRESET";
      payload: Pick<Preset, "id" | "shadowSettings" | "textSettings">;
    }
  | { type: "DELETE_PRESET"; payload: string }
  | { type: "LOAD_PRESET"; payload: string }
  | { type: "LOAD_PRESETS"; payload: Preset[] }
  | {
      type: "LOAD_FROM_URL";
      payload: { shadowSettings: ShadowSettings; textSettings: TextSettings };
    };

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

type AppContextType = {
  state: AppState;
  setShadowSettings: (settings: Partial<ShadowSettings>) => void;
  setTextSettings: (settings: Partial<TextSettings>) => void;
  addPreset: (name: string) => void;
  updatePreset: (id: string) => void;
  deletePreset: (id: string) => void;
  loadPreset: (id: string) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const savedPresets = loadPresets();
    dispatch({ type: "LOAD_PRESETS", payload: savedPresets });

    const urlParams = parseUrlParams();
    if (urlParams) {
      dispatch({ type: "LOAD_FROM_URL", payload: urlParams });
    }
  }, []);

  useEffect(() => {
    savePresets(state.presets);
  }, [state.presets]);

  const contextValue: AppContextType = {
    state,
    setShadowSettings: (settings) =>
      dispatch({ type: "SET_SHADOW_SETTINGS", payload: settings }),
    setTextSettings: (settings) =>
      dispatch({ type: "SET_TEXT_SETTINGS", payload: settings }),
    addPreset: (name) => {
      const newPreset = {
        id: generateId(),
        name,
        shadowSettings: state.shadowSettings,
        textSettings: state.textSettings,
      };
      dispatch({ type: "ADD_PRESET", payload: newPreset });
    },
    updatePreset: (id) => {
      const newPreset = {
        id,
        shadowSettings: state.shadowSettings,
        textSettings: state.textSettings,
      };
      dispatch({ type: "UPDATE_PRESET", payload: newPreset });
    },
    deletePreset: (id) => {
      dispatch({ type: "DELETE_PRESET", payload: id });
    },
    loadPreset: (id) => {
      dispatch({ type: "LOAD_PRESET", payload: id });
    },
  };

  return <AppContext value={contextValue}>{children}</AppContext>;
}

export function useAppContext() {
  const context = useContext(AppContext);

  if (context === null) {
    throw new Error("useAppContext must be used within an AppProvider");
  }

  return context;
}
