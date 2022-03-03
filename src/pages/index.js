import { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { NextSeo } from "next-seo";
import animateScrollTo from "animated-scroll-to";
import { useRouter } from "next/router";
import { disablePageScroll, enablePageScroll } from "scroll-lock";

import IntroText from "src/components/Homepage/IntroText";
import Carousel from "src/components/Homepage/Carousel";
import AllSubmissions from "src/components/Homepage/AllSubmissions";
import mq from "src/utils/mq";

const OuterContainer = styled.div`
  margin-top: 100px;
  ${mq.mobile(css`
    margin-top: 75px;
  `)};
  overflow-x: hidden;
  max-width: 100vw;
`;

function Index({ setRemoveZIndex }) {
  const router = useRouter();
  const [totalLengthObj, setTotalLengthObj] = useState(10000);

  useEffect(() => {
    disablePageScroll();
    setTimeout(() => {
      enablePageScroll();
    }, 3600);
  }, []);

  return (
    <OuterContainer>
      <NextSeo title={`Gracias, Marcelo `} />

      <IntroText totalLengthObj={totalLengthObj} />

      <Carousel />

      <AllSubmissions
        setRemoveZIndex={setRemoveZIndex}
        setTotalLengthObj={setTotalLengthObj}
      />
    </OuterContainer>
  );
}

export default Index;
