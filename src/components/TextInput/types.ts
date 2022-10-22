export interface TextInputProps {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  value?: string;
  onTextChange?: (value: string) => void;
}
