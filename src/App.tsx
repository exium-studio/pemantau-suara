import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./globalStyle.css";
// import "react-day-picker/style.css";

import Login from "./pages/Login";
import MissingPage from "./pages/MissingPage";
import { globalTheme } from "./theme/globalTheme";
import Dashboard from "./pages/Dashboard";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pelaksana" element={<Dashboard />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
