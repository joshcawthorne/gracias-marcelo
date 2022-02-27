/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import Button from "src/components/Button";
import FlagMessage from "src/components/FlagMessage";
import getMessageData from "src/services/getMessageData";

import ShieldIcon from "src/assets/svg/shieldIcon.svg";
import RandomIcon from "src/assets/svg/randomIcon.svg";
import BookIcon from "src/assets/svg/bookIcon.svg";

const QuoteContainerOuter = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const QuoteContainer = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 0px 40px;
  box-sizing: border-box;
`;

const QuoteMessage = styled.div`
  font-weight: 500;
  font-size: 25px;
  line-height: 29px;
  letter-spacing: 0.01em;
  color: #ffffff;
  position: relative;
  padding: 0px 20px;
  max-height: 600px;
  height: 100%;
  overflow-y: auto;
  :before {
    content: "“";
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1500px;
    opacity: 0.05;
    z-index: 1;
  }
  :after {
    content: "”";
    position: fixed;
    bottom: -500px;
    right: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1500px;
    opacity: 0.05;
    z-index: 1;
  }
  p {
    margin-bottom: 40px;
  }
`;

const QuoteBackground = styled.div`
  position: absolute;
  bottom: -290px;
  right: -300px;
  z-index: 0;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1800px;
  opacity: 0.05;
  line-height: 0;
  user-select: none;
`;

const Divider = styled.div`
  width: 100%;
  height: 2px;
  background-color: #5a5562;
  margin: 30px 0 15px 0;
`;

const MessageAttirbution = styled.div`
  font-weight: 300;
  font-size: 16px;
  line-height: 19px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #fff;
  text-transform: uppercase;
  padding: 0px 20px;
  span {
    font-weight: 500;
    color: #fde115;
    margin-left: 3px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  padding: 0px 20px;
`;

function MessageView() {
  const [flagMessage, setFlagMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      loadMessageData();
    }
  }, [id]);

  function handleViewAnother() {
    router.push("/");
  }

  async function loadMessageData() {
    const { data, error, errorMessage } = await getMessageData({ id: id });
    console.log(error);
    console.log(errorMessage);
    if (error) {
      if (errorMessage === "flagged") {
        setError(true);
        setErrorMessage(
          "Sorry, this message has been flagged as inappropriate. Please contact us if you think this is a mistake."
        );
        setLoading(false);
      } else {
        router.push("/");
      }
    } else {
      setMessageData(data[0]);
      console.log("DATA", data[0]);
      setLoading(false);
    }
  }

  function handleFlagMessage() {
    setFlagMessage(true);
  }

  if (loading) {
    return null;
  }

  if (error) {
    return (
      <QuoteContainerOuter>
        <QuoteContainer>
          <QuoteMessage>{errorMessage}</QuoteMessage>
        </QuoteContainer>
      </QuoteContainerOuter>
    );
  }

  function NewlineText(props) {
    const text = props.text;
    return text.split("\n").map((str, i) => <p key={i}>{str}</p>);
  }

  return (
    <QuoteContainerOuter>
      {flagMessage && (
        <FlagMessage
          id={messageData.id}
          quote={messageData.message_content}
          setFlagMessage={setFlagMessage}
        />
      )}
      <QuoteContainer>
        <QuoteMessage>
          <NewlineText text={messageData.message_content} />
        </QuoteMessage>
        <Divider />
        <MessageAttirbution>
          Message <span>{messageData.id}</span>, contributed by{" "}
          <span>{messageData.submitter}</span>
        </MessageAttirbution>
        <ButtonContainer>
          <Button
            text={"View Another"}
            Icon={RandomIcon}
            action={handleViewAnother}
            useIcon
          />
          <Button text={"View All"} leftSpacing Icon={BookIcon} useIcon />
          <Button
            text={"Flag Inappropriate"}
            leftSpacing
            Icon={ShieldIcon}
            useIcon
            fill
            action={handleFlagMessage}
          />
        </ButtonContainer>
      </QuoteContainer>
    </QuoteContainerOuter>
  );
}

export default MessageView;
