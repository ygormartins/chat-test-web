export interface ChatInputBarProps {
  messageText?: string;
  onSendMessage?: (message: string) => void;
  setMessageText?: (message: string) => void;
}
