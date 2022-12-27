export interface TextInputProps {
  type?: React.HTMLInputTypeAttribute;
  label?: string;
  placeholder?: string;
  value?: string;
  loading?: boolean;
  debounceInterval?: number;
  onTextChange?: (value: string) => void;
  onDebounce?: () => void;
}
