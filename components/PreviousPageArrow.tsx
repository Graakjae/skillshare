import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import Image from "next/image";
import arrow from "../icons/arrow-left.svg";

const PreviousPageArrow: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <PreviousPageWrapper onClick={() => router.back()}>
        <Image src={arrow} alt="previous page arrow" width={20} height={20} />
      </PreviousPageWrapper>
    </div>
  );
};

export default PreviousPageArrow;

const PreviousPageWrapper = styled.span({
  cursor: "pointer",
  position: "relative",
});
