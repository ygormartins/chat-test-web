/*---------- External ----------*/
import { ReactNode } from "react";

export interface ModalProviderProps {
  children?: ReactNode;
}

export interface IModalContext {
  isVisible: boolean;

  show?: () => void;
  dismiss?: () => void;
  setContent?: (content: ReactNode) => void;
}
