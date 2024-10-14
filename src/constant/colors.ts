import { useColorModeValue } from "@chakra-ui/react";

const useContentBgColor = () => {
  return useColorModeValue("#f8f8f8", "#151515");
};

const useTableStripedColor = () => {
  return useColorModeValue("#fbfbfb", "#161616");
};

const useWhiteDarkColor = () => {
  return useColorModeValue("white", "dark");
};

const useLightDarkColor = () => {
  return useColorModeValue("white", "#191919");
};

const useLightDarkColorAlpha = () => {
  return useColorModeValue("#FFFFFF70", "#19191970");
};

const useDarkLightColor = () => {
  return useColorModeValue("dark", "white");
};

const useErrorColor = () => {
  return useColorModeValue("#E53E3E", "#FC8181");
};

const useWarningColor = () => {
  return useColorModeValue("#C05621", "#FBD38D");
};

const useErrorAlphaColor = () => {
  return useColorModeValue("red.50", "rgba(254, 178, 178, 0.12)");
};

const useWarningAlphaColor = () => {
  return useColorModeValue(
    "rgba(251, 211, 141, 0.12)",
    "rgba(251, 211, 141, 0.12)"
  );
};

const statusKaryawanColorScheme = {
  tetap: "orange",
  Tetap: "orange",
  kontrak: "purple",
  Kontrak: "purple",
  magang: "green",
  Magang: "green",
  training: "green",
  Training: "green",
};

const statusAktivitasColor = [
  {
    label: "Belum Ada Aktivitas",
    color: "#FFFFFF",
  },
  {
    label: "Alat Peraga",
    color: "#00CCFF",
  },
  {
    label: "Sosialisasi",
    color: "#0C6091",
  },
];

const partaisColor = [
  { id: 1, label: "DEMOKRAT", color: "#002060" },
  { id: 2, label: "PKB", color: "#006600" },
  { id: 3, label: "GERINDRA", color: "#E26B0A" },
  { id: 4, label: "PDIP", color: "#FF0000" },
  { id: 5, label: "GOLKAR", color: "#FFFF00" },
  { id: 6, label: "NASDEM", color: "#0F243E" },
  { id: 7, label: "BURUH", color: "#FF9933" },
  { id: 8, label: "GELORA", color: "#00B0F0" },
  { id: 9, label: "PKS", color: "#FFC000" },
  { id: 10, label: "PKN", color: "#FF0066" },
  { id: 11, label: "HANURA", color: "#E26B0A" },
  { id: 12, label: "GARUDA", color: "#FFFFFF" },
  { id: 13, label: "PAN", color: "#00B0F0" },
  { id: 14, label: "PBB", color: "#00B050" },
  { id: 15, label: "PSI", color: "#FF5050" },
  { id: 16, label: "PERINDO", color: "#CC0000" },
  { id: 17, label: "PPP", color: "#006600" },
  { id: 18, label: "UMAT", color: "#222222" },
];

export {
  partaisColor,
  statusAktivitasColor,
  useLightDarkColorAlpha,
  useContentBgColor,
  useWhiteDarkColor,
  statusKaryawanColorScheme,
  useLightDarkColor,
  useDarkLightColor,
  useErrorColor,
  useErrorAlphaColor,
  useWarningColor,
  useWarningAlphaColor,
  useTableStripedColor,
};
