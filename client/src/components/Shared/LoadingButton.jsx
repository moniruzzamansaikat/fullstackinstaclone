import React from "react";
import Loader from "react-loader-spinner";

function LoadingButton() {
  return <Loader type="RevolvingDot" color="#fff" height={10} width={10} />;
}

export default LoadingButton;
