import { NextPage } from "next";
import { useRouter } from "next/router";
import styled from "styled-components";

import Image from "next/image";
import arrow from "../icons/arrow-left.svg";

const PreviousPageArrow: NextPage = () => {
  const router = useRouter();

  return (
    <div>
      <PreviousPageArrow2 onClick={() => router.back()}>
        <Image src={arrow} alt="previous page arrow" width={20} height={20} />
      </PreviousPageArrow2>
    </div>
  );
};

export default PreviousPageArrow;

const PreviousPageArrow2 = styled.span({
  cursor: "pointer",
});
