import {
  DEFAULT_SHADOW_SETTINGS,
  DEFAULT_TEXT_SETTINGS,
} from "@/constants/defaults";
import type React from "react";
import { createContext, useContext, useReducer } from "react";
import type { AppState, ShadowSettings, TextSettings } from "../types";

const initialState: AppState = {
  shadowSettings: DEFAULT_SHADOW_SETTINGS,
  textSettings: DEFAULT_TEXT_SETTINGS,
};

type Action =
  | { type: "SET_SHADOW_SETTINGS"; payload: Partial<ShadowSettings> }
  | { type: "SET_TEXT_SETTINGS"; payload: Partial<TextSettings> };

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

    default:
      return state;
  }
}

type AppContextType = {
  state: AppState;
  setShadowSettings: (settings: Partial<ShadowSettings>) => void;
  setTextSettings: (settings: Partial<TextSettings>) => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const contextValue: AppContextType = {
    state,
    setShadowSettings: (settings) =>
      dispatch({ type: "SET_SHADOW_SETTINGS", payload: settings }),
    setTextSettings: (settings) =>
      dispatch({ type: "SET_TEXT_SETTINGS", payload: settings }),
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
