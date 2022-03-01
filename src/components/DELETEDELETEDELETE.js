import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import {
  EReCaptchaV2Size,
  EReCaptchaV2Theme,
  ReCaptchaProvider,
  ReCaptchaV2,
} from "react-recaptcha-x";
import Cookies from "js-cookie";

import { supabase } from "src/utils/supabaseClient";
import mq from "src/utils/mq";

import { validateFullName, validateEmail } from "src/utils/validators";
import errorKeys from "src/utils/errorKeys";
import Button from "src/components/Button";
import ErrorIcon from "src/assets/svg/error.svg";
import Logo from "src/assets/svg/lustLogo.svg";
import BackButton from "src/components/BackButton";
import { useRouter } from "next/router";

const MessageFormContainerOuter = styled.div`
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

const LogoContainer = styled.div`
  width: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MessageFormContainer = styled(motion.div)`
  width: 600px;
  background-color: #0a0514;
  flex-direction: column;
  display: flex;
  margin-left: 20px;
  z-index: 2;
  color: #fefefe;
  backdrop-filter: blur(20px);
  overflow-y: auto;
  -webkit-backdrop-filter: blur(20px);
  border-radius: 8px;
  @media (max-width: 1140px) {
    margin-left: 0px;
    width: 100%;
    max-width: 800px;
  }
  ${mq.mobile(css`
    min-height: 100vh;
  `)};
`;

const ContentContainer = styled.div`
  padding: 40px;
  @media (max-width: 760px) {
    padding: 20px;
    width: 100%;
  }
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

const InputItem = styled.div`
  margin: 10px 0;
  width: 100%;
`;

const Label = styled.div`
  margin-bottom: 10px;
  margin-top: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  padding-bottom: 20px;
  padding-right: 20px;

  @media (max-width: 760px) {
    flex-wrap: wrap;
  }
`;

const ErrorContainer = styled(motion.div)`
  padding: 12px 18px;
  border-radius: 10px;
  width: 100%;
  z-index: 5;
  background-color: #e02f3c;
  margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  background: #f30313a7;
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
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
`;

const CaptchaContainer = styled.div`
  @media (max-width: 560px) {
    margin-bottom: 20px;
  }
`;

function MessageForm() {
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [nameInput, setNameInput] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [cookieSubmitted, setCookieSubmitted] = useState(false);
  const [runAnimation, setRunAnimation] = useState(true);

  const router = useRouter();

  useEffect(() => {
    if (Cookies.get("submitted")) {
      setSubmitted(true);
      setCookieSubmitted(true);
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

      console.log(messageData);

      let { error, data } = await supabase.from("messages").insert(messageData);

      if (error) {
        console.log(error);
        console.log(error.message);
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
          console.log(data);
          Cookies.set("submitted", true, { expires: 31 });
          setLoading(false);
          setSubmitted(true);
        }, 2000);
      }
    } catch (error) {
      alert(error.message);
    } finally {
    }
  }

  function backAction() {
    router.push("/");
  }

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

  const ContainerAnim = {
    hidden: { opacity: 0 },
    show: {
      opacity: [0, 1],

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

  return (
    <>
      <ReCaptchaProvider
        siteKeyV2="6LfWaKIeAAAAADk4mEmTIcCe5p-pOYaXjHjUOOks"
        langCode="en"
        hideV3Badge={false}
      >
        <MessageFormContainerOuter>
          <MessageFormContainer
            variants={ContainerAnim}
            initial="hidden"
            animate={"show"}
          >
            {submitted ? (
              <div>sifduh</div>
            ) : (
              <div>
                <ContentContainer>
                  {error && (
                    <ErrorContainer
                      initial={{ opacity: 0 }}
                      animate={error ? { opacity: 1 } : { opacity: 0 }}
                    >
                      <ModalIconContainer>
                        <ErrorIcon stroke={"#fff"} width={"35px"} />
                      </ModalIconContainer>
                      <ModalMessageContainer>
                        {errorMessage}
                      </ModalMessageContainer>
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
                    <Title>Submit a Message</Title>
                  </TitleContainer>
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
                    <ReCaptchaV2
                      callback={v2Callback}
                      theme={EReCaptchaV2Theme.Dark}
                      size={EReCaptchaV2Size.Normal}
                      id="my-id"
                      data-test-id="my-test-id"
                      tabindex={0}
                    />
                  </CaptchaContainer>
                </ContentContainer>

                <ButtonContainer>
                  <Button
                    text={"Submit Message"}
                    action={handleSubmit}
                    loading={loading}
                    disabled={!notRobot}
                  />
                </ButtonContainer>
              </div>
            )}
          </MessageFormContainer>
        </MessageFormContainerOuter>
      </ReCaptchaProvider>
    </>
  );
}

export default MessageForm;
