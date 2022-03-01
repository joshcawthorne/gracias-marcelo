import { useEffect, useRef } from "react";
import styled, { css } from "styled-components";
import { NextSeo } from "next-seo";
import animateScrollTo from "animated-scroll-to";
import { useRouter } from "next/router";

import IntroText from "src/components/Homepage/IntroText";
import Carousel from "src/components/Homepage/Carousel";
import AllSubmissions from "src/components/Homepage/AllSubmissions";
import mq from "src/utils/mq";

const OuterContainer = styled.div`
  margin-top: 100px;
  ${mq.mobile(css`
    margin-top: 75px;
  `)};
`;

function Index({ setRemoveZIndex }) {
  const router = useRouter();

  return (
    <OuterContainer>
      <NextSeo title={`Gracias, Marcelo `} />
      <IntroText />
      <Carousel />

      <AllSubmissions setRemoveZIndex={setRemoveZIndex} />
    </OuterContainer>
  );
}

export default Index;
