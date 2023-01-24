/*---------- External ----------*/
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";
import React, { useCallback, useContext, useEffect } from "react";

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
    sendMessage,
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

  const handleSendMessage = useCallback(
    (message: string) => {
      if (!selectedChat?.sortKey || !sendMessage) return;

      const userSub = selectedChat.sortKey.replace("chat@user#", "");

      sendMessage({
        chatType: "private",
        content: message,
        messageType: "text",
        tempId: uuidV4(),
        userSub,
      });
    },
    [selectedChat?.sortKey, sendMessage]
  );

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
            sendMessage={handleSendMessage}
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
