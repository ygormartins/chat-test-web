/*---------- External ----------*/
import React, { useId } from "react";

/*---------- Types ----------*/
import { TextInputProps } from "./types";

/*---------- Styles ----------*/
import { InputContainer, InputField, InputLabel } from "./styles";

const TextInput: React.FC<TextInputProps> = ({
  value,
  onTextChange = () => null,
  label = "Text Input",
  placeholder = "",
  type = "text",
}) => {
  const id = useId();

  const handleOnValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTextChange(event.target.value);
  };

  return (
    <InputContainer>
      <InputLabel htmlFor={id}>{label}</InputLabel>
      <InputField
        type={type}
        placeholder={placeholder}
        id={id}
        onChange={handleOnValueChange}
        value={value}
      />
    </InputContainer>
  );
};

export default TextInput;
