import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import styled, { css } from "styled-components";
import copy from "copy-to-clipboard";
import { useRouter } from "next/router";

import WhatsAppIcon from "src/assets/svg/whatsapp.svg";
import TwitterIcon from "src/assets/svg/twitter.svg";
import LinkIcon from "src/assets/svg/copy.svg";

import TickIcon from "src/assets/svg/tick.svg";

import Button from "src/components/Button";
import BackButton from "src/components/BackButton";
import flagMessage from "src/services/flagMessage";
import NewlineText from "src/utils/newlineText";
import mq from "src/utils/mq";

import Logo from "src/assets/svg/lustLogo.svg";
import ErrorIcon from "src/assets/svg/error.svg";

const FlagMessageOuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
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
  position: relative;
  ${mq.mobile(css`
    height: 100vh;
    width: 100vw;
  `)};
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
  z-index: 5;
  margin-bottom: 25px;
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

const ShareButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ShareButton = styled.a`
  border-bottom-left-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 0px;
  border-top-right-radius: 0px;
  text-decoration: none;
  padding: 10px;
  color: #000;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  cursor: pointer;
  user-select: none;
  background-color: #24232e;
  transition: 400ms;
  border-style: solid;
  border-width: 0px;
  border-right-width: 1px;
  border-color: #53637d;

  ${(props) =>
    props.left &&
    css`
      border-right-width: 0px;
      border-bottom-left-radius: 0px;
      border-top-left-radius: 0px;
      border-bottom-right-radius: 5px;
      border-top-right-radius: 5px;
    `}
  :hover {
    transition: 400ms;
    background-color: #2d3547;
  }
`;

const ShareIconContainer = styled.div`
  height: 18px;
  width: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ShareText = styled.div`
  font-weight: 500;
  line-height: 0px;
  padding-top: 2.5px;
  letter-spacing: 0.5px;
  font-size: 12px;
  color: #fff;
  margin-left: 10px;
  @media (max-width: 768px) {
    font-size: 10px;
    span {
      display: none;
    }
  }
`;

const TopLayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-left: 15px;
  padding-right: 15px;
`;

const CloseIconContainer = styled.div`
  width: 30px;
  height: 30px;
  margin: 20px 5px;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
`;

const DomainCopyItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  margin-bottom: 40px;
  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;

const DomainInput = styled.input`
  width: calc(100% - 50px);
  padding: 10px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  height: 50px;
  font-size: 18px;
  font-weight: 500;
  background-color: #24222d;
  border-style: solid;
  border-width: 0px;
  color: #54647d;
  outline: none;
  ::-moz-selection {
    background: #e5de0b;
  }
  ::selection {
    background: #e5de0b;
  }
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const DomainCopyButton = styled.div`
  width: 50px;
  height: 50px;
  background-color: #2d3547;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const OptionTitle = styled.div`
  font-size: 12px;
  letter-spacing: 1px;
  font-weight: 500;
  opacity: 0.5;
  margin-bottom: 5px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 10px;
  }
`;

const backgroundAnim = {
  false: {
    opacity: 0,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
  true: {
    opacity: 1,
    transition: {
      delay: 0.1,
      duration: 0.2,
    },
  },
};

const containerAnim = {
  hidden: { y: 20 },
  visible: {
    y: 0,
  },
};

const ContainerAnim = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.2 },
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

const DomainAnim = {
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

function ShareSubmission({ quote, id, setShareSubmission, submitter }) {
  const [runAnimation, setRunAnimation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitterFirstName, setSubmitterFirstName] = useState("User");
  const [displayDialouge, setdisplayDialouge] = useState(false);
  const [copied, setCopied] = useState(false);
  const [twitterShareText, settwitterShareText] = useState("");
  const [whatsAppShareText, setwhatsAppShareText] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [linkedInShareTitle, setlinkedInShareTitle] = useState("");
  const [linkedInShareText, setlinkedInShareText] = useState("");
  const [copyLinkButtonText, setcopyLinkButtonText] = useState("Copy Link");
  const router = useRouter();
  useEffect(() => {
    let twitterShare = `via @lufctrust. `;
    settwitterShareText(twitterShare);

    let whatsAppShare =
      `Check out on the Leeds United Supporters' Trust mural map:` +
      "https://murals.lufctrust.com" +
      router.asPath;
    setwhatsAppShareText(whatsAppShare);

    let url = "https://gracias-marcelo.lufctrust.com/s/" + id;
    let linkedInTitle = "Here's an interactive map of all the LUFC Murals.";
    let linkedInText = "Here's an interactive map of all the LUFC Murals.";
    setShareUrl(url);
    setlinkedInShareTitle(linkedInTitle);
    setlinkedInShareText(linkedInText);
    setTimeout(() => {
      setcopyLinkButtonText("Copy Link");
    }, 100);

    setdisplayDialouge(true);
  }, []);

  function copyToClipboard() {
    copy("https://gracias-marcelo.lufctrust.com/s/" + id);
    setcopyLinkButtonText("Copied!");
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  let messageData = quote;
  var messageCutLength = 219;
  if (quote.length > 216) {
    messageData = quote.substring(0, messageCutLength) + "...";
  }

  let twitterShare = `"${messageData}"via @lufctrust.`;

  function handleTwitterShare() {
    const url =
      "https://twitter.com/intent/tweet?text=" +
      twitterShare +
      "&url=" +
      `https://gracias-marcelo.lufctrust.com/s/${id}` +
      "&hashtags=GraciasMarcelo";

    window.open(url, "_blank").focus();
  }

  let whatsAppShare =
    `${submitterFirstName + "'s"} message to Marcelo: "` +
    quote +
    `". See more at https://gracias-marcelo.lufctrust.com/s/${id}`;

  function handleWhatsAppShare() {
    const url = "https://api.whatsapp.com/send?text=" + whatsAppShare;
    window.open(url, "_blank").focus();
  }

  useEffect(() => {
    setSubmitterFirstName(submitter.split(" ")[0]);
  }, []);

  function backAction() {
    setShareSubmission(false);
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
          <Title>Share {submitterFirstName + "'s"} Submission?</Title>
        </TitleContainer>
        <ShareButtonsContainer>
          <motion.div
            initial="hidden"
            animate={runAnimation ? "show" : "hidden"}
            variants={DomainAnim}
          >
            <OptionTitle>Copy Link</OptionTitle>
            <DomainCopyItem>
              <DomainInput
                type={"text"}
                value={"https://gracias-marcelo.lufctrust.com/s/" + id}
                onClick={(e) => e.target.select()}
              />
              <DomainCopyButton onClick={() => copyToClipboard()}>
                {copied ? (
                  <TickIcon color={"#fff"} />
                ) : (
                  <LinkIcon color={"#fff"} />
                )}
              </DomainCopyButton>
            </DomainCopyItem>
          </motion.div>
          <motion.div
            initial="hidden"
            animate={runAnimation ? "show" : "hidden"}
            variants={ButtonAnim}
          >
            <OptionTitle>Share on Social Media</OptionTitle>
            <ButtonsContainer>
              <ShareButton onClick={() => handleTwitterShare()}>
                <ShareIconContainer>
                  <TwitterIcon height={"18px"} fill={"#fff"} />
                </ShareIconContainer>
                <ShareText>
                  <span>Share on</span> Twitter
                </ShareText>
              </ShareButton>
              <ShareButton onClick={() => handleWhatsAppShare()} left={true}>
                <ShareIconContainer>
                  <WhatsAppIcon height={"18px"} fill={"#fff"} />
                </ShareIconContainer>
                <ShareText>
                  <span>Share on</span> WhatsApp
                </ShareText>
              </ShareButton>
            </ButtonsContainer>
          </motion.div>
        </ShareButtonsContainer>
      </FlagMessageContainer>
    </FlagMessageOuterContainer>
  );
}

export default ShareSubmission;
