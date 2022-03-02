import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV3,
} from "react-recaptcha-x";
import Cookies from "js-cookie";

import Button from "src/components/Button";
import BackButton from "src/components/BackButton";
import View from "src/assets/svg/view.svg";
import flagMessage from "src/services/flagMessage";
import NewlineText from "src/utils/newlineText";
import mq from "src/utils/mq";
import Share from "src/assets/svg/share.svg";
import Logo from "src/assets/svg/lustLogo.svg";
import ErrorIcon from "src/assets/svg/error.svg";
import Cross from "src/assets/svg/cross.svg";
import { supabase } from "src/utils/supabaseClient";
import { validateFullName, validateEmail } from "src/utils/validators";
import errorKeys from "src/utils/errorKeys";
import Router, { useRouter } from "next/router";

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
  overflow-y: auto;
  margin-top: 0px;
  max-height: 100vh;
  z-index: 10000;
  overflow: auto;
  max-height: 100vh;
  ${mq.mobile(css`
    min-height: 100vh;
    border-radius: 0px;
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
  background-color: transparent;
  padding: 00px;
  line-height: 18px;
  letter-spacing: 0.1px;

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

const InputItem = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const Label = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const TextInput = styled.input`
  width: 100%;
  font-family: "Public Sans", sans-serif;
  font-weight: 500;
  color: #fefefe;
  appearance: none;
  font-size: 16px;
  height: 40px;
  padding: 8px 12px;
  width: 100%;

  z-index: 1;
  border: 1px solid #35354f;
  box-sizing: border-box;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 400ms;
  background: transparent;
  ${(props) =>
    props.preText &&
    css`
      border-radius: 0px 8px 8px 0px;
      border-left-width: 0px;
    `}
  ::placeholder {
    opacity: 0.4;
    color: #fefefe;
  }

  ${(props) =>
    props.error &&
    css`
      border-color: #a6101e;
    `}

  :focus {
    border-width: 2px;
    border-color: #2362dc;
    outline: none;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    transition: 400ms;
  }

  ${(props) =>
    props.error &&
    css`
      border-color: #e02f3c;
    `}
`;

const MessageContent = styled.textarea`
  width: 100%;
  font-family: "Public Sans", sans-serif;
  font-weight: 500;
  color: ${(props) => props.theme.text50};
  appearance: none;
  font-size: 16px;
  color: #fefefe;
  padding: 8px 12px;
  width: 100%;

  z-index: 1;
  border: 1px solid #35354f;
  box-sizing: border-box;
  border-radius: 4px;
  box-sizing: border-box;
  transition: 400ms;
  background: transparent;
  ${(props) =>
    props.preText &&
    css`
      border-radius: 0px 8px 8px 0px;
      border-left-width: 0px;
    `}
  ::placeholder {
    opacity: 1;
    color: ${(props) => props.theme.text20};
  }

  :focus {
    border-width: 2px;
    border-color: #2362dc;
    outline: none;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    transition: 400ms;
  }

  ${(props) =>
    props.error &&
    css`
      border-color: #e02f3c;
    `}
`;

const CaptchaContainer = styled.div`
  @media (max-width: 560px) {
    margin-bottom: 20px;
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

function FlagMessage({ quote, setSubmitMessage, submitMessage }) {
  const [runAnimation, setRunAnimation] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [cookieSubmitted, setCookieSubmitted] = useState(false);
  const [hasCookieId, setHasCookieId] = useState(false);
  const [id, setId] = useState(48);

  const router = useRouter();

  function backAction() {
    setSubmitMessage(false);
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

  useEffect(() => {
    if (Cookies.get("submitted")) {
      setSubmitted(true);
      setCookieSubmitted(true);
      if (Cookies.get("submitId")) {
        setId(parseInt(Cookies.get("submitId")));
        setHasCookieId(true);
      }
    }
  }, []);

  async function handleSubmit() {
    setEmailError(false);
    setNameError(false);
    setMessageError(false);
    if (!validateFullName(nameInput)) {
      setNameError(true);
      setError(true);
      setErrorMessage("Please enter your full name");
      return;
    }
    if (!validateEmail(emailInput)) {
      setEmailError(true);
      setError(true);
      setErrorMessage("Please enter a valid email address");
      return;
    }
    if (nameInput.length < 1) {
      setNameError(true);
    } else if (emailInput.length < 1) {
      setEmailError(true);
    } else if (messageInput.length < 1) {
      setMessageError(true);
    } else {
      const data = await submitMessage();
    }
  }

  async function submitMessage() {
    try {
      setLoading(true);
      setError(false);
      setErrorMessage("");
      const user = supabase.auth.user();

      const messageData = {
        email: emailInput,
        submitter: nameInput,
        message_content: messageInput,
      };

      let { error, data } = await supabase.from("messages").insert(messageData);

      if (error) {
        console.warn(error.message);
        if (
          error.message === errorKeys.DUPLICATE_EMAIL ||
          error.message ===
            'duplicate key value violates unique constraint "messages_email_key"'
        ) {
          setTimeout(() => {
            setErrorMessage(
              "It looks like you've already submitted a message."
            );
            setError(true);
            setLoading(false);
          }, 2000);
        } else {
          setTimeout(() => {
            setErrorMessage(error.message);
            setError(true);
            setLoading(false);
          }, 2000);
        }
      } else if (data) {
        setTimeout(() => {
          Cookies.set("submitted", true, { expires: 1000 });
          Cookies.set("submitId", data[0].id, { expires: 1000 });
          setId(data[0].id);
          setLoading(false);
          setSubmitted(true);
        }, 2000);
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  function handleComplete() {}

  const v2Callback = (token) => {
    if (typeof token === "string") {
      setNotRobot(true);
    } else if (typeof token === "boolean" && !token) {
      setNotRobot(false);
      setError(true);
      setErrorMessage("Please complete the captcha");
    } else if (token instanceof Error) {
      setNotRobot(false);
      setError(true);
      setErrorMessage("Please complete the captcha");
    }
  };

  const v3Callback = (token, refreshToken) => {
    if (typeof token === "string") {
      setNotRobot(true);
    } else {
      console.warn("token retrieval in progress...");
    }
  };

  function viewSubmission() {
    router.push(`/s/${id}`);
    backAction();
  }

  function handleShareClick() {}

  return (
    <ReCaptchaProvider
      siteKeyV3={process.env.NEXT_PUBLIC_CAPTCHA}
      langCode="en"
      hideV3Badge={true}
    >
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
            <BackButton
              action={backAction}
              text={submitted ? "Close" : "Cancel"}
            />
          </UpperLayer>
          {cookieSubmitted ? (
            <TitleContainer
              initial="hidden"
              animate={runAnimation ? "show" : "hidden"}
              variants={UpperLayerAnim}
            >
              <Title>You already submitted a message!</Title>
              <Desc>
                It looks like you previously submitted a message for Marcelo.{" "}
                {hasCookieId && "Click below to view your submission."}
              </Desc>
              <ButtonContainer>
                {hasCookieId && (
                  <Button
                    text={"View Submission"}
                    Icon={View}
                    useIcon
                    action={viewSubmission}
                  />
                )}
              </ButtonContainer>
            </TitleContainer>
          ) : (
            <>
              {submitted ? (
                <>
                  <TitleContainer
                    initial="hidden"
                    animate={runAnimation ? "show" : "hidden"}
                    variants={UpperLayerAnim}
                  >
                    <Title>Message Submitted!</Title>
                    <Desc>
                      Thank you for submitting your own message for Marcelo.
                      Click below to view it!
                    </Desc>
                    <ButtonContainer>
                      <Button
                        text={"View Submission"}
                        Icon={View}
                        useIcon
                        action={viewSubmission}
                      />
                    </ButtonContainer>
                  </TitleContainer>
                </>
              ) : (
                <>
                  <TitleContainer
                    initial="hidden"
                    animate={runAnimation ? "show" : "hidden"}
                    variants={UpperLayerAnim}
                  >
                    <Title>Leave Your Own Message</Title>
                  </TitleContainer>

                  <MessageContainer
                    initial="hidden"
                    animate={runAnimation ? "show" : "hidden"}
                    variants={ContentLayerAnim}
                  >
                    <InputItem>
                      <Label>Your Name</Label>
                      <TextInput
                        placeholder="Your Name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        error={nameError}
                        type={"name"}
                        autoComplete={"name"}
                        autoFocus={true}
                      />
                    </InputItem>
                    <InputItem>
                      <Label>Your Email</Label>
                      <TextInput
                        placeholder="Your email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        error={emailError}
                        autoCapitalize={false}
                        type={"email"}
                        autoComplete={"email"}
                      />
                    </InputItem>
                    <InputItem>
                      <Label>Your Message</Label>
                      <MessageContent
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        rows={10}
                        error={messageError}
                      />
                    </InputItem>
                    <CaptchaContainer>
                      <ReCaptchaV3 action="your-action" callback={v3Callback} />
                    </CaptchaContainer>
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
                      Icon={Cross}
                      useIcon
                    />
                    <Button
                      text={"Submit Message"}
                      action={handleSubmit}
                      loading={loading}
                      disabled={loading}
                      styles={{ marginRight: "0" }}
                      Icon={Share}
                      useIcon
                    />
                  </ButtonContainer>
                </>
              )}
            </>
          )}
        </FlagMessageContainer>
      </FlagMessageOuterContainer>
    </ReCaptchaProvider>
  );
}

export default FlagMessage;
