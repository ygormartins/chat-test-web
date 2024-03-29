/*---------- External ----------*/
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

/*---------- Contexts ----------*/
import { AuthProvider } from "@/contexts/Auth";
import { ChatsProvider } from "@/contexts/Chats";

/*---------- Components ----------*/
import GradientBackground from "@/components/layouts/GradientContainer";

/*---------- Pages ----------*/
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import SignUp from "@/pages/SignUp";
import { ModalProvider } from "./contexts/Modal";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <ChatsProvider>
        <ModalProvider>
          <Router>
            <GradientBackground>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<SignUp />} />
              </Routes>
            </GradientBackground>
          </Router>
        </ModalProvider>
      </ChatsProvider>
    </AuthProvider>
  );
};

export default App;
