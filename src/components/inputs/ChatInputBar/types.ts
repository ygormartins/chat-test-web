export interface ChatInputBarProps {
  messageText?: string;
  onSendMessage?: () => void;
  setMessageText?: (message: string) => void;
}
