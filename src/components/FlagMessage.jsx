import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Button from "src/components/Button";
import BackButton from "src/components/BackButton";
import flagMessage from "src/services/flagMessage";
import NewlineText from "src/utils/newlineText";

import Logo from "src/assets/svg/lustLogo.svg";
import ErrorIcon from "src/assets/svg/error.svg";

const FlagMessageOuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #130c1f78;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
`;

const FlagMessageContainer = styled(motion.div)`
  padding: 40px;
  background-color: #0a0514;
  border-radius: 10px;
  width: 600px;
  max-width: 100%;
  position: relative;
  min-height: 100vh;
  overflow-y: auto;
  margin-top: 0px;
  max-height: 100vh;
  z-index: 10000;
  overflow: auto;
  max-height: 100vh;
`;

const UpperLayer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  min-height: 15px;
  overflow: hidden;
`;

const TitleContainer = styled(motion.div)`
  margin-bottom: 18px;
  text-align: left;
  max-width: 600px;
  z-index: 5;
`;

const Title = styled.div`
  font-weight: 700;
  line-height: 34px;
  font-size: 32px;
  color: #fff;
  margin-bottom: 6px;
  z-index: 5;
`;

const Desc = styled.div`
  line-height: 18px;
  font-size: 14px;
  color: #fff;
  margin-bottom: 26px;
  z-index: 5;
  margin-top: 16px;
  p {
    margin-top: 10px;
  }
`;

const LogoContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ButtonContainer = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 24px;
`;

const MessageContainer = styled(motion.div)`
  color: #fff;
  font-size: 14px;
  width: 100%;
  background-color: #0a0514;
  padding: 20px;
  line-height: 18px;
  letter-spacing: 0.1px;
  background-color: #ff1945;
  border-radius: 5px;
`;

const ErrorContainer = styled(motion.div)`
  padding: 12px 18px;
  border-radius: 10px;
  width: 450px;
  background-color: #e02f3c;
  margin-bottom: 20px;
  background: #f30313a7;
  backdrop-filter: blur(40px);
  -webkit-backdrop-filter: blur(40px);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  position: absolute;
  top: -75px;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 5;
  color: #fff;
  width: 600px;
`;

const ModalIconContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 18px;
`;

const ModalMessageContainer = styled.div`
  font-size: 15px;
  letter-spacing: 0.1px;
  font-weight: 600;
  font-family: "Public Sans", sans-serif;
  p {
    margin-bottom: 15px;
  }
`;

const ContainerAnim = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.2 },
  },
};

const ButtonAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      delay: 0.7,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
    },
  },
};

const UpperLayerAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      delay: 0.5,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
    },
  },
};

const ContentLayerAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 1],
    y: 0,
    transition: {
      duation: 0.1,
      delay: 0.6,
      ease: "easeOut",
      type: "spring",
      velocity: 200,
      stiffness: 500,
      damping: 100,
    },
  },
};

function FlagMessage({ quote, id, setFlagMessage }) {
  const [runAnimation, setRunAnimation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  function backAction() {
    setFlagMessage(false);
  }

  async function handleFlag() {
    setLoading(true);
    const { error, errorMessage, data } = await flagMessage({ id: id });
    setTimeout(() => {
      if (error) {
        setError(true);
        setErrorMessage(errorMessage);
      } else {
        handleComplete();
      }
      setLoading(false);
    }, 2000);
  }

  function handleComplete() {}

  return (
    <FlagMessageOuterContainer>
      <FlagMessageContainer
        initial="hidden"
        animate={runAnimation ? "show" : "hidden"}
        variants={ContainerAnim}
      >
        {error && (
          <ErrorContainer
            initial={{ opacity: 0 }}
            animate={error ? { opacity: 1 } : { opacity: 0 }}
          >
            <ModalIconContainer>
              <ErrorIcon stroke={"#fff"} width={"35px"} />
            </ModalIconContainer>
            <ModalMessageContainer>{errorMessage}</ModalMessageContainer>
          </ErrorContainer>
        )}
        <UpperLayer
          initial="hidden"
          animate={runAnimation ? "show" : "hidden"}
          variants={UpperLayerAnim}
        >
          <LogoContainer>
            <Logo width={"45px"} fill={"#fff"} />
          </LogoContainer>
          <BackButton action={backAction} text={"Cancel"} />
        </UpperLayer>
        <TitleContainer
          initial="hidden"
          animate={runAnimation ? "show" : "hidden"}
          variants={UpperLayerAnim}
        >
          <Title>Flag this message as inappropriate?</Title>
          <Desc>
            <p>
              {
                "While we're working to filter out any inappropriate content, we're just a team of volunteers, and we had thousands of messages submitted."
              }
            </p>
            <p>
              {
                "If you feel this specific message is inappropriate, please let us know by clicking the button below. We'll review the message and remove it if it's inappropriate."
              }
            </p>
          </Desc>
        </TitleContainer>
        <MessageContainer
          initial="hidden"
          animate={runAnimation ? "show" : "hidden"}
          variants={ContentLayerAnim}
        >
          <NewlineText text={quote} />
        </MessageContainer>

        <ButtonContainer
          initial="hidden"
          animate={runAnimation ? "show" : "hidden"}
          variants={ButtonAnim}
        >
          <Button
            text={"Cancel"}
            action={backAction}
            loading={false}
            disabled={false}
          />
          <Button
            text={"Flag Inappropriate"}
            action={handleFlag}
            loading={loading}
            disabled={loading}
          />
        </ButtonContainer>
      </FlagMessageContainer>
    </FlagMessageOuterContainer>
  );
}

export default FlagMessage;
