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
    label: "Alat Peraga",
    color: "#00CCFF",
  },
  {
    label: "Sosialisasi",
    color: "#0C6091",
  },
];

export {
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
