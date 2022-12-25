/*---------- External ----------*/
import { ReactNode } from "react";

export interface ButtonProps {
  onClick?: () => void;
  children?: ReactNode;
  loading?: boolean;
  disabled?: boolean;
}
