/*---------- External ----------*/
import React, { useId, useRef } from "react";

/*---------- Types ----------*/
import { TextInputProps } from "./types";

/*---------- Styles ----------*/
import {
  InputContainer,
  InputField,
  InputFieldContainer,
  InputLabel,
  InputRightItemContainer,
} from "./styles";
import { ColorRing } from "react-loader-spinner";

const TextInput: React.FC<TextInputProps> = ({
  value,
  onTextChange = () => null,
  onDebounce = () => null,
  label = "Text Input",
  placeholder = "",
  type = "text",
  loading,
}) => {
  /*---------- Ids ----------*/
  const id = useId();

  /*---------- Refs ----------*/
  const timeoutRef = useRef<NodeJS.Timeout>();

  /*---------- Handlers ----------*/
  const handleOnValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    onTextChange(event.target.value);

    const debounceTimeout = setTimeout(() => {
      onDebounce();
    }, 1000);

    timeoutRef.current = debounceTimeout;
  };

  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputFieldContainer>
        <InputField
          type={type}
          placeholder={placeholder}
          id={id}
          onChange={handleOnValueChange}
          value={value}
        />
        {typeof loading !== "undefined" ? (
          <InputRightItemContainer>
            <ColorRing
              height={24}
              visible={loading}
              width={24}
              colors={["teal", "teal", "teal", "teal", "teal"]}
            />
          </InputRightItemContainer>
        ) : null}
      </InputFieldContainer>
    </InputContainer>
  );
};

export default TextInput;
