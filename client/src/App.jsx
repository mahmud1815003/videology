import { useMemo, useState } from "react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./utils/PrivateRoute";
import PublicRoute from "./utils/PublicRoute";
import useAuth from "./utils/UseAuth";
import Loading from "./Component/Loading";

function App() {
  const [mode, setMode] = useState("dark");
  const checked = useAuth();
  const theme = useMemo(
    () =>
      createTheme({
        palette: { mode: mode },
        typography: { fontFamily: "Fira Sans" },
      }),
    [mode]
  );
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {checked ? (
        <BrowserRouter>
          <Routes>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route
              element={
                <PublicRoute>
                  <PublicLayout />
                </PublicRoute>
              }
            >
              <Route path="/" element={<Navigate to={"/login"} />} replace />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
          </Routes>
        </BrowserRouter>
      ) : (
        <Loading />
      )}
    </ThemeProvider>
  );
}

export default App;
