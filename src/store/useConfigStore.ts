import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  AnalysisPageOptions,
  SearchCheckPageOptions,
  ThemeOptions,
} from "../constants/enum";

interface ConfigState {
  theme: ThemeOptions;
  lastCheck: SearchCheckPageOptions;
  lastSearch: SearchCheckPageOptions;
  lastAnalysis: AnalysisPageOptions;
  toggleTheme: (theme: ThemeOptions) => void;
  updateLastCheck: (option: SearchCheckPageOptions) => void;
  updateLastSearch: (option: SearchCheckPageOptions) => void;
  updateLastAnalysis: (option: AnalysisPageOptions) => void;
}

const useConfigStore = create(
  persist<ConfigState>(
    (set) => ({
      theme: ThemeOptions.light,
      lastCheck: SearchCheckPageOptions.characters,
      lastSearch: SearchCheckPageOptions.characters,
      lastAnalysis: AnalysisPageOptions.stardream,
      toggleTheme: (theme) =>
        set((state) => ({
          ...state,
          theme: theme,
        })),
      updateLastCheck: (option) =>
        set((state) => ({
          ...state,
          lastCheck: option,
        })),
      updateLastSearch: (option) =>
        set((state) => ({
          ...state,
          lastSearch: option,
        })),
      updateLastAnalysis: (option) =>
        set((state) => ({
          ...state,
          lastAnalysis: option,
        })),
    }),
    {
      name: "AE_CONFIG_V4",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useConfigStore;
