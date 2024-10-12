export const MenuOptions = {
  check: "check",
  search: "search",
  analysis: "analysis",
  link: "link",
} as const;

export const ThemeOptions = {
  dark: "dark",
  light: "light",
} as const;

export const PopupOnCheckOptions = {
  none: "none",
  fourOnly: "four-only",
  all: "all",
} as const;

export const LanguageOptions = {
  ko: "ko",
  en: "en",
  ja: "ja",
} as const;

export const CheckMenuOptions = {
  characters: "characters",
  buddies: "buddies",
} as const;

export const CheckTabOptions = {
  inven: "inven",
  manifest: "manifest",
  grasta: "grasta",
  staralign: "staralign",
} as const;

export const AnalysisMenuOptions = {
  stardream: "stardream",
  whitekey: "whitekey",
  legacy: "legacy",
  legacyTable: "legacy-table",
} as const;

export const ModalType = {
  dataLoader: "dataLoader",
  filter: "filter",
  character: "character",
  loading: "loading",
} as const;

export type MenuOptions = (typeof MenuOptions)[keyof typeof MenuOptions];
export type ThemeOptions = (typeof ThemeOptions)[keyof typeof ThemeOptions];
export type PopupOnCheckOptions =
  (typeof PopupOnCheckOptions)[keyof typeof PopupOnCheckOptions];
export type LanguageOptions =
  (typeof LanguageOptions)[keyof typeof LanguageOptions];

export type CheckMenuOptions =
  (typeof CheckMenuOptions)[keyof typeof CheckMenuOptions];
export type CheckTabOptions =
  (typeof CheckTabOptions)[keyof typeof CheckTabOptions];
export type AnalysisMenuOptions =
  (typeof AnalysisMenuOptions)[keyof typeof AnalysisMenuOptions];
export type ModalType = (typeof ModalType)[keyof typeof ModalType];

// Filter enums

export const InvenStatus = {
  notOwned: "not-owned",
  ccRequired: "cc-required",
  owned: "owned",
} as const;

export const ManifestStatus = {
  notOwned: "not-owned",
  ccRequired: "cc-required",
  incompleted: "incompleted",
  completed: "completed",
} as const;

export type InvenStatus = (typeof InvenStatus)[keyof typeof InvenStatus];
export type ManifestStatus =
  (typeof ManifestStatus)[keyof typeof ManifestStatus];

// AE Data enums

export const AECharacterStyles = {
  four: "4☆",
  normal: "NS",
  another: "AS",
  extra: "ES",
} as const;

export const AEManifestLevels = {
  none: 0,
  manifest: 1,
  trueManifest: 2,
} as const;

export const AECategories = {
  encounter: "ENCOUNTER",
  free: "FREE",
  colab: "COLAB",
} as const;

export const AEAwakenStatus = {
  notAwakened: false,
  awakened: true,
} as const;

export const AELightShadow = {
  light: "light",
  shadow: "shadow",
} as const;

export const AEAlterStatus = {
  none: false,
  alter: true,
} as const;

export type AECharacterStyles =
  (typeof AECharacterStyles)[keyof typeof AECharacterStyles];
export type AECategories = (typeof AECategories)[keyof typeof AECategories];
export type AEAwakenStatus =
  (typeof AEAwakenStatus)[keyof typeof AEAwakenStatus];
export type AELightShadow = (typeof AELightShadow)[keyof typeof AELightShadow];
export type AEAlterStatus = (typeof AEAlterStatus)[keyof typeof AEAlterStatus];
export type AEManifestLevels =
  (typeof AEManifestLevels)[keyof typeof AEManifestLevels];
