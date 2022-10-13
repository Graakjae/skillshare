import { NextComponentType } from "next";
import Link from "next/link";
import styled from "styled-components";

const Nav: NextComponentType = () => {
  return (
    <HeaderStyle>
      <Link href="/users">Users</Link>
      <Link href="/skills">Skills</Link>
      <Link href="/projects">Projects</Link>
    </HeaderStyle>
  );
};

export default Nav;

const HeaderStyle = styled.div({});
