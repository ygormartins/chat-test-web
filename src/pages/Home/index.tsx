/*---------- External ----------*/
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";

/*---------- Components ----------*/
import ChatsList from "@/components/ChatsList";
import ProfileHeader from "@/components/ProfileHeader";

/*---------- Styles ----------*/
import { ChatsPanel, Container } from "./styles";

const Home: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, user } = useContext(AuthContext);

  /*---------- Effects ----------*/
  useEffect(() => {
    if (!navigate) return;

    if (status === "UNAUTHENTICATED") {
      navigate("/login");
    }
  }, [status, navigate]);

  return (
    <Container>
      <ChatsPanel>
        <ProfileHeader userInfo={user!} />
        <ChatsList />
      </ChatsPanel>
    </Container>
  );
};

export default Home;
