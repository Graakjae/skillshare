import { NextComponentType } from "next";
import Link from "next/link";
import styled from "styled-components";

const Nav: NextComponentType = () => {
  return (
    <NavWrapper>
      <HeaderStyle>
        <LinkWrapper>
          <Link href="/users">Users</Link>
        </LinkWrapper>
        <LinkWrapper>
          {" "}
          <Link href="/skills">Skills</Link>
        </LinkWrapper>{" "}
        <LinkWrapper>
          {" "}
          <Link href="/projects">Projects</Link>
        </LinkWrapper>
      </HeaderStyle>
    </NavWrapper>
  );
};

export default Nav;

const HeaderStyle = styled.div({
  display: "flex",
  justifyContent: "center",
  textAlign: "center",
});

const NavWrapper = styled.div({
  justifyContent: "center",
});

const LinkWrapper = styled.div({
  padding: "5px",
});
