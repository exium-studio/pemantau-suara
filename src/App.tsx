import { ChakraProvider, HStack, Image, Text, Wrap } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./globalStyle.css";
// import "react-day-picker/style.css";

import FullscreenSpinner from "./components/independent/FullscreenSpinner";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Middleware from "./pages/Middleware";
import MissingPage from "./pages/MissingPage";
import { globalTheme } from "./theme/globalTheme";
import useScreenWidth from "./hooks/useScreenWidth";

export const App = () => {
  const sw = useScreenWidth();

  return (
    <ChakraProvider theme={globalTheme}>
      <FullscreenSpinner />

      <HStack
        w={"100%"}
        position={"fixed"}
        zIndex={2}
        bottom={4}
        left={"50%"}
        transform={"translateX(-50%)"}
        pointerEvents={"none"}
        gap={0}
        justify={sw < 500 ? "start" : "center"}
        px={4}
        // border={"1px solid red"}
      >
        <Image src="/asset/logo.png" w={"30px"} />
        <Wrap spacingY={0}>
          <Text fontSize={"sm"} whiteSpace={"nowrap"}>
            Beautifully Crafted by{" "}
          </Text>
          <a href="https://distrostudio.org/" target="_blank" rel="noreferrer">
            <Text
              fontSize={"sm"}
              pointerEvents={"auto"}
              _hover={{ color: "p.500" }}
              cursor={"pointer"}
              transition={"200ms"}
              fontWeight={700}
            >
              Distro Studio
            </Text>
          </a>
        </Wrap>
      </HStack>

      <BrowserRouter>
        <Routes>
          {/* Public route for login */}
          <Route path="/" element={<Login />} />

          {/* Middleware to protect private routes */}
          <Route path="/*" element={<Middleware />}>
            {/* Private routes that require authentication */}
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="pelaksana" element={<Dashboard />} />
          </Route>

          {/* Fallback route for non-existent routes */}
          <Route path="*" element={<MissingPage />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
};
