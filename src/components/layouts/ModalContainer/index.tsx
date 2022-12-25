/*---------- External ----------*/
import React from "react";
import { ModalBackground } from "./styles";
import { ModalContainerProps } from "./types";

const ModalContainer: React.FC<ModalContainerProps> = ({
  modalContent,
  onOutsideClick = () => null,
}) => {
  /*---------- Handlers ----------*/
  const handleOnOutsideClick = () => {
    onOutsideClick();
  };

  return (
    <ModalBackground onClick={handleOnOutsideClick} aria-modal="true">
      {modalContent}
    </ModalBackground>
  );
};

export default ModalContainer;
