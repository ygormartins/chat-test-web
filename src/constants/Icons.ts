/*---------- External ----------*/
import React from "react";

/*---------- Assets ----------*/
import { ReactComponent as add } from "@/assets/icons/add.svg";
import { ReactComponent as close } from "@/assets/icons/close.svg";
import { ReactComponent as settings } from "@/assets/icons/settings.svg";

/*
 * optimize icons using https://www.svgminify.com/
 * and remove hardcoded fill value
 */

export type IconsEnum = "add" | "close" | "settings";

const IconsExport: {
  [key in IconsEnum]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = { add, close, settings };

export default IconsExport;
