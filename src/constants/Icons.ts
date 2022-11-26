/*---------- External ----------*/
import React from "react";

/*---------- Assets ----------*/
import { ReactComponent as add } from "@/assets/icons/add.svg";
import { ReactComponent as close } from "@/assets/icons/close.svg";
import { ReactComponent as smile } from "@/assets/icons/smile.svg";
import { ReactComponent as camera } from "@/assets/icons/camera.svg";
import { ReactComponent as settings } from "@/assets/icons/settings.svg";
import { ReactComponent as paperPlane } from "@/assets/icons/paper-plane.svg";

/*
 * optimize icons using https://www.svgminify.com/
 * and remove hardcoded fill value
 */

export type IconsEnum =
  | "add"
  | "close"
  | "smile"
  | "camera"
  | "settings"
  | "paper-plane";

const IconsExport: {
  [key in IconsEnum]: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
} = { add, close, smile, camera, settings, "paper-plane": paperPlane };

export default IconsExport;
