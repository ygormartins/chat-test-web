/*---------- External ----------*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*---------- Contexts ----------*/
import { AuthProvider } from "@/contexts/Auth";

/*---------- Components ----------*/
import GradientBackground from "@/components/GradientContainer";

/*---------- Pages ----------*/
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <GradientBackground>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
          </Routes>
        </GradientBackground>
      </Router>
    </AuthProvider>
  );
};

export default App;
