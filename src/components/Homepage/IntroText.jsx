import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Container from "../Container";
import mq from "src/utils/mq";
import getTotalMessageLength from "src/services/getTotalMessageLength";

const IntroTextContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 48px;
  line-height: 56px;
  text-align: center;
  color: #fff;
  margin-bottom: 40px;

  ${mq.mobile(css`
    font-size: 38px;
    line-height: 45px;
    text-align: left;
    width: 100%;
  `)};
`;

const Description = styled(motion.div)`
  font-size: 18px;
  line-height: 21px;
  text-align: center;
  color: #fff;
  max-width: 740px;
  width: 100%;
  span {
    font-weight: bold;
  }
  p {
    margin-bottom: 28px;
  }
  ${mq.mobile(css`
    font-size: 16px;
    line-height: 18px;
    text-align: left;
    p {
      margin-bottom: 22px;
      :last-of-type {
        margin-bottom: 0;
      }
      :last-child {
        margin-bottom: 0;
      }
    }
  `)};
`;

const TitleAnimOne = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.5, duration: 0.5 },
  },
};

const TitleAnimTwo = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 1, duration: 0.5 },
  },
};

const DescriptionAnim = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 1.5, duration: 0.5 },
  },
};

function IntroText() {
  const [totalLength, setTotalLength] = useState(6123);
  useEffect(() => {
    loadTotalMessageLength();
  }, []);

  async function loadTotalMessageLength() {
    const totalMessageLength = await getTotalMessageLength();
    setTotalLength(totalMessageLength.data);
  }

  return (
    <Container style={{ overflow: "hidden" }}>
      <IntroTextContainer>
        <Title>
          <motion.span
            initial={hasRun ? "show" : "hidden"}
            animate={"show"}
            variants={TitleAnimOne}
            style={{ color: "#fde115" }}
          >
            Gracias,
          </motion.span>{" "}
          <motion.span
            initial={hasRun ? "show" : "hidden"}
            animate={"show"}
            variants={TitleAnimTwo}
          >
            Marcelo.
          </motion.span>
        </Title>
        <Description
          initial={hasRun ? "show" : "hidden"}
          animate={"show"}
          variants={DescriptionAnim}
        >
          <p>
            <span>
              Every Leeds fan has a story about what Marcelo Bielsa’s time at
              Leeds means to them.{" "}
            </span>
          </p>
          <p>
            Marcelo has spoken so often about how football belongs to the
            supporters above anyone else, so it seems only right that he should
            know just how important he is to us. Below you’ll see{" "}
            <span>{totalLength + 217}</span> messages to Marcelo that we will be
            making sure he receives.{" "}
          </p>
          <p>
            Each is a unique and special example of the impact Bielsa has had on
            of us all as individuals. Marcelo has earned his place in Leeds
            United history as well as in the hearts and minds of fans, he
            deserves to know just how much he means to us.{" "}
          </p>
        </Description>
      </IntroTextContainer>
    </Container>
  );
}

export default IntroText;
