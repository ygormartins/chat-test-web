/*---------- External ----------*/
import React, { useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

/*---------- Types ----------*/
import { IChat } from "@/@types/chat";
import { OptionItem } from "@/components/layouts/ProfileHeader/types";

/*---------- Contexts ----------*/
import { AuthContext } from "@/contexts/Auth";
import { ModalContext } from "@/contexts/Modal";
import { ChatsContext } from "@/contexts/Chats";

/*---------- Components ----------*/
import ChatsList from "@/components/lists/ChatsList";
import ProfileHeader from "@/components/layouts/ProfileHeader";
import ConversationScreen from "@/components/layouts/ConversationScreen";
import NewConversationModal from "@/components/modals/NewConversationModal";

/*---------- Styles ----------*/
import { ChatsPanel, Container, ConversationPanel } from "./styles";

const Home: React.FC = () => {
  /*---------- Hooks ----------*/
  const navigate = useNavigate();

  /*---------- Contexts ----------*/
  const { status, user } = useContext(AuthContext);
  const { setContent, show } = useContext(ModalContext);
  const {
    chats,
    selectedChat,
    currentChatUserInfo,
    setSelectedChat,
    markMessagesAsRead,
  } = useContext(ChatsContext);

  /*---------- Handlers ----------*/
  const openChat = useCallback(
    (chat: IChat) => {
      setSelectedChat?.(chat);
      markMessagesAsRead?.(chat);
    },
    [setSelectedChat, markMessagesAsRead]
  );

  const showNewConversationModal = useCallback(() => {
    setContent?.(<NewConversationModal />);
    show?.();
  }, [show, setContent]);

  /*---------- Lists ----------*/
  const optionsList: OptionItem[] = [
    {
      icon: "add",
      tooltip: "New Conversation",
      onClick: showNewConversationModal,
    },
    { icon: "settings", tooltip: "Settings" },
  ];

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
        <ProfileHeader options={optionsList} userInfo={user!} />
        <ChatsList onChatItemClick={openChat} chatsList={chats || []} />
      </ChatsPanel>
      <ConversationPanel>
        {selectedChat ? (
          <ConversationScreen
            setSelectedChat={setSelectedChat}
            chatInfo={selectedChat!}
            chatUserInfo={currentChatUserInfo}
          />
        ) : null}
      </ConversationPanel>
    </Container>
  );
};

export default Home;
