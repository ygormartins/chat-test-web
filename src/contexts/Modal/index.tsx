/*---------- External ----------*/
import ModalContainer from "@/components/layouts/ModalContainer";
import React, { ReactNode, useState } from "react";

/*---------- Types ----------*/
import { ModalProviderProps, IModalContext, IModalSettings } from "./types";

/*---------- Constants ----------*/
const DEFAULT_MODAL_SETTINGS: IModalSettings = {
  dismissOnOutsideClick: true,
};

export const ModalContext = React.createContext<IModalContext>({
  isVisible: false,
});

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  /*---------- Public States ----------*/
  const [isVisible, setIsVisible] = useState<boolean>(false);

  /*---------- Private States ----------*/
  const [modalContent, setModalContent] = useState<ReactNode>(null);
  const [dismissOnOutsideClick, setDismissOnOutsideClick] =
    useState<boolean>(true);

  /*---------- Handlers ----------*/
  const show = () => {
    setIsVisible(true);
  };

  const dismiss = () => {
    setIsVisible(false);
  };

  const setContent = (
    content: ReactNode,
    settings: IModalSettings = DEFAULT_MODAL_SETTINGS
  ) => {
    setDismissOnOutsideClick(settings.dismissOnOutsideClick || false);

    setModalContent(content);
  };

  const handleOnOutsideClick = () => {
    if (dismissOnOutsideClick) dismiss();
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
        <ModalContainer
          modalContent={modalContent}
          onOutsideClick={handleOnOutsideClick}
        />
      ) : null}
    </ModalContext.Provider>
  );
};
