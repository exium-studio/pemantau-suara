import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./globalStyle.css";
import Login from "./pages/Login";
import MissingPage from "./pages/MissingPage";
import { globalTheme } from "./theme/globalTheme";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./components/independent/wrapper/AppLayout";

export const App = () => (
  <ChakraProvider theme={globalTheme}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <AppLayout>
              <Dashboard />
            </AppLayout>
          }
        />
        <Route path="/pelaksana" element={<Dashboard />} />
        <Route path="*" element={<MissingPage />} />
      </Routes>
    </BrowserRouter>
  </ChakraProvider>
);
