/*---------- External ----------*/
import React from "react";

/*---------- Styles ----------*/
import { Container } from "./styles";

/*---------- Types ----------*/
import { ShimmerProps } from "./types";

const Shimmer: React.FC<ShimmerProps> = ({ active = true, className }) => {
  return <Container className={className} />;
};

export default Shimmer;
