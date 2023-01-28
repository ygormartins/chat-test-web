/*---------- External ----------*/
import { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "danger";

export interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  variant?: ButtonVariant;
  submit?: boolean;
}
