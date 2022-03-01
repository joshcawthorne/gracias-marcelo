/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const TextContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  z-index: 2;
  flex-direction: column;
`;

const Title = styled(motion.div)`
  color: #fff;
  font-size: 62px;
  font-weight: 700;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;
  span {
    color: #fbf200;
    margin-right: 10px;
  }
  @media (max-width: 760px) {
    font-size: 42px;
  }
`;

const Description = styled(motion.div)`
  color: #fff;
  max-width: 580px;
  font-weight: 500;
  letter-spacing: 0.5px;
  line-height: 24px;
  padding-right: 20px;
  p {
    margin-bottom: 20px;
  }
  @media (max-width: 760px) {
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 20px;
    padding-right: 0;
    p {
      margin-bottom: 15px;
    }
  }
`;

const TitleAnim = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
      delay: 1,
    },
  },
};

const TitleTwoAnim = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
      delay: 1.5,
    },
  },
};

const DescLineOneAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
      delay: 2,
    },
  },
};

const DescLineTwoAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
      delay: 2.05,
    },
  },
};

function TextContent() {
  const [animate, setAnimate] = useState(true);
  return (
    <TextContentContainer>
      <Title>
        <motion.div
          variants={TitleAnim}
          initial="hidden"
          animate={animate ? "show" : "hidden"}
        >
          <span>Gracias,</span>
        </motion.div>{" "}
        <motion.div
          variants={TitleTwoAnim}
          initial="hidden"
          animate={animate ? "show" : "hidden"}
        >
          Marcelo.
        </motion.div>
      </Title>
      <Description>
        <motion.p
          variants={DescLineOneAnim}
          initial="hidden"
          animate={animate ? "show" : "hidden"}
        >
          While this isn't how we dreamed our journey would end, we will be
          forever grateful to Marcelo Bielsa for what he has done for our club
          over the past four years.
        </motion.p>
        <motion.p
          variants={DescLineTwoAnim}
          initial="hidden"
          animate={animate ? "show" : "hidden"}
        >
          We, therefore, wanted to provide a way for fans to express their
          gratitude and thanks to Marcelo. Submit your message to Marcelo here,
          and we will compile them all and send them to Marcelo on your behalf.
        </motion.p>
      </Description>
    </TextContentContainer>
  );
}

export default TextContent;
