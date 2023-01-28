/*---------- External ----------*/
import { ReactNode } from "react";

export interface ModalContainerProps {
  modalContent: ReactNode;
  onOutsideClick?: () => void;
}
