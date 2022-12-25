/*---------- External ----------*/
import ModalContainer from "@/components/layouts/ModalContainer";
import React, { ReactNode, useState } from "react";

/*---------- Services ----------*/

/*---------- Types ----------*/
import { ModalProviderProps, IModalContext } from "./types";

export const ModalContext = React.createContext<IModalContext>({
  isVisible: false,
});

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  /*---------- Public States ----------*/
  const [isVisible, setIsVisible] = useState<boolean>(false);

  /*---------- Private States ----------*/
  const [modalContent, setModalContent] = useState<ReactNode>(null);

  /*---------- Handlers ----------*/
  const show = () => {
    setIsVisible(true);
  };

  const dismiss = () => {
    setIsVisible(false);
  };

  const setContent = (content: ReactNode) => {
    setModalContent(content);
  };

  return (
    <ModalContext.Provider
      value={{
        isVisible,
        show,
        dismiss,
        setContent,
      }}
    >
      {children}
      {isVisible ? (
        <ModalContainer modalContent={modalContent} onOutsideClick={dismiss} />
      ) : null}
    </ModalContext.Provider>
  );
};
