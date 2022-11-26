/*---------- External ----------*/
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*---------- Types ----------*/
import { IChat } from "@/@types/chat";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";
import { ChatsContext } from "@/contexts/Chats";

/*---------- Components ----------*/
import ChatsList from "@/components/ChatsList";
import ProfileHeader from "@/components/ProfileHeader";
import ConversationScreen from "@/components/ConversationScreen";

/*---------- Styles ----------*/
import { ChatsPanel, Container, ConversationPanel } from "./styles";

const Home: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, user } = useContext(AuthContext);
  const { chats, selectedChat, setSelectedChat, markMessagesAsRead } =
    useContext(ChatsContext);

  /*---------- Handlers ----------*/
  const openChat = useCallback(
    (chat: IChat) => {
      // TODO: make API call to mark messages as read

      setSelectedChat?.(chat);
      markMessagesAsRead?.(chat);
    },
    [setSelectedChat, markMessagesAsRead]
  );

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
        <ChatsList onChatItemClick={openChat} chatsList={chats || []} />
      </ChatsPanel>
      <ConversationPanel>
        {selectedChat ? (
          <ConversationScreen
            setSelectedChat={setSelectedChat}
            chatInfo={selectedChat!}
          />
        ) : null}
      </ConversationPanel>
    </Container>
  );
};

export default Home;
