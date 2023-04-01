import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Router from "./routes/index";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
