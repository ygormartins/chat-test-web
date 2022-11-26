export interface ChatInputBarProps {
  messageText?: string;
  onSendClick?: () => void;
  setMessageText?: (message: string) => void;
}
