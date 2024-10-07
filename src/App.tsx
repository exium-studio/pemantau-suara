import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./globalStyle.css";
// import "react-day-picker/style.css";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Middleware from "./pages/Middleware";
import MissingPage from "./pages/MissingPage";
import { globalTheme } from "./theme/globalTheme";

export const App = () => {
  return (
    <ChakraProvider theme={globalTheme}>
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
