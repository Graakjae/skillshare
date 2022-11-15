import type { NextPage } from "next";
import styled from "styled-components";
import React from "react";
import { Oval } from "react-loader-spinner";
import { colors } from "../../util/colorPalette";

export const LoadingSpinner: NextPage = () => {
  return (
    <div>
      <Spinner>
        <Oval
          height={50}
          width={50}
          color={colors.base.grey800}
          ariaLabel="oval-loading"
          secondaryColor={colors.base.white}
          strokeWidth={2}
          strokeWidthSecondary={2}
        />
      </Spinner>
    </div>
  );
};

export default LoadingSpinner;

const Spinner = styled.div({
  position: "relative",
  justifyContent: "center",
  display: "flex",
  zIndex: "1",
});
