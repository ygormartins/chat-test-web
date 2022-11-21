/*---------- External ----------*/
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Styles ----------*/
import { ChatsPanel, Container } from "./styles";

const Home: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status } = useContext(AuthContext);

  /*---------- Effects ----------*/
  useEffect(() => {
    if (!navigate) return;

    if (status === "UNAUTHENTICATED") {
      navigate("/login");
    }
  }, [status, navigate]);

  return (
    <Container>
      <ChatsPanel></ChatsPanel>
    </Container>
  );
};

export default Home;
