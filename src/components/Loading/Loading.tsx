import React from "react";
import { SpinnerContainer, LoadingCircle } from "./index";

export const Loading = () => {
  return (
    <SpinnerContainer>
      <div>
        <LoadingCircle />
      </div>
    </SpinnerContainer>
  );
};
