/*---------- External ----------*/
import React, { useId } from "react";
import { ModalBackground } from "./styles";
import { ModalContainerProps } from "./types";

const ModalContainer: React.FC<ModalContainerProps> = ({
  modalContent,
  onOutsideClick = () => null,
}) => {
  /*---------- IDs ----------*/
  const backgroundID = useId();

  /*---------- Handlers ----------*/
  const handleOnOutsideClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const typedTarget = event.target as HTMLDivElement;

    if (typedTarget.id === backgroundID) {
      onOutsideClick();
    }
  };

  return (
    <ModalBackground id={backgroundID} onClick={handleOnOutsideClick}>
      {modalContent}
    </ModalBackground>
  );
};

export default ModalContainer;
