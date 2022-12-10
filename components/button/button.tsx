import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

export type ButtonProps = {
  label: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">;

export const Button: FC<ButtonProps> = ({ label }) => {
  const router = useRouter();
  const { updateProjectId } = router.query;

  return (
    <StyledButton
    //onClick={() => router.push(`/project/${updateProjectId}`)}
    >
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.button({
  width: "260px",
  height: "60px",
  backgroundColor: "black",
  color: "white",
  fontSize: "25px",
  border: "none",
  transition: "1s all ease",
  display: "block",
  margin: "auto",
  borderRadius: "10px",
  cursor: "pointer",
  ["&:hover"]: {
    backgroundColor: "#FFEC3F",
    color: "black",
  },
});
