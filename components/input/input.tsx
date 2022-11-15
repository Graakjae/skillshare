import React, { FC, useRef, useState } from "react";
import styled from "styled-components";
import { SvgIcon } from "../svg-icon";
import { colors } from "../../util/colorPalette";
import { getStatusColor } from "../../lib/helpers/color.helper";
import { Status, TextAlignment } from "../../models/ui-types";
import Image from "next/image";
import searchIcon from "../../icons/search-icon.svg";

export type InputProps = {
  color?: Status;
  textAlignment?: TextAlignment;
  inputId?: string;
  inputType?: string;
  placeholderInputText?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "children">;

export const Input: FC<InputProps> = ({
  color = "default",
  textAlignment,
  inputId,
  inputType,
  placeholderInputText,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [focus, setFocus] = useState(false);

  const borderColor = getStatusColor(color);

  return (
    <Input2>
      <InputWrapper
        borderColor={focus ? colors.notification.focus500 : borderColor}
        onClick={() => inputRef?.current?.focus()}
        {...props}
        color={color}
      >
        <StyledInput
          ref={inputRef}
          placeholder={"Search..."}
          {...props}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          id={inputId}
          type={inputType}
        />
        <IconWrapper>
          <Image src={searchIcon} alt="searchicon" width={20} height={20} />
        </IconWrapper>
      </InputWrapper>
    </Input2>
  );
};
const Input2 = styled.div({
  display: "flex",
  justifyContent: "center",
});

const StyledInput = styled.input({
  flex: 1,
  color: colors.base.grey800,
  fontSize: "16px",
  border: "none",
  outline: "none",
  backgroundColor: "white",
  ["&::placeholder"]: {
    color: colors.base.grey500,
  },
});

const IconWrapper = styled.span({
  padding: "0px 8px",
  marginTop: "2px",
});

const InfoSection = styled.div({
  display: "flex",
  justifyContent: "space-between",
  textAlign: "center",
  fontSize: "12px",
  alignContent: "center",
  color: colors.base.grey700,
});

const InputWrapper = styled.div<{
  borderColor?: string;
  disabled?: boolean;
  statusColor?: Status;
}>(({ borderColor, disabled }) => ({
  backgroundColor: "white",
  width: "50%",
  position: "relative",
  display: "flex",
  borderRadius: "5px",
  height: "20px",
  padding: "14px 16px",
  marginTop: "8px",
  //   border: "1px solid black",
  boxSizing: "content-box",
  boxShadow: "0 0px 10px 0 rgba(0, 0, 0, 0.25);",
  ["&:focus"]: {
    border: "1px solid #348DF7",
  },
}));
