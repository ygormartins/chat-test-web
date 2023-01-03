/*---------- External ----------*/
import React, { useEffect, useId, useRef } from "react";

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
  onEnterPress = () => null,
  label = "Text Input",
  placeholder = "",
  type = "text",
  debounceInterval = 1000,
  autoFocus = false,
  loading,
}) => {
  /*---------- Ids ----------*/
  const id = useId();

  /*---------- Refs ----------*/
  const timeoutRef = useRef<NodeJS.Timeout>();

  /*---------- Handlers ----------*/
  const handleOnValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.target.value);
  };

  const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onEnterPress();
    }
  };

  /*---------- Effects ----------*/
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const debounceTimeout = setTimeout(() => {
      onDebounce();
    }, debounceInterval);

    timeoutRef.current = debounceTimeout;
  }, [debounceInterval, onDebounce, value]);

  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputFieldContainer>
        <InputField
          type={type}
          placeholder={placeholder}
          id={id}
          autoFocus={autoFocus}
          onChange={handleOnValueChange}
          onKeyDown={handleOnKeyDown}
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
