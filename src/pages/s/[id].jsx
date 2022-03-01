/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import Button from "src/components/Button";
import FlagMessage from "src/components/FlagMessage";
import getMessageData from "src/services/getMessageData";
import ShareSubmission from "src/components/ShareSubmission";
import mq from "src/utils/mq";
import Container from "src/components/Container";

import Share from "src/assets/svg/share.svg";
import View from "src/assets/svg/view.svg";
import Warning from "src/assets/svg/warning.svg";
import RandomIcon from "src/assets/svg/randomIcon.svg";
import ViewAll from "src/assets/svg/viewAll.svg";

const QuoteContainerOuter = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const QuoteContainer = styled.div`
  width: 100%;

  box-sizing: border-box;
`;

const QuoteMessage = styled(motion.div)`
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
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
  letter-spacing: 0.01em;
  padding-top: 20px;
  padding-bottom: 15px;
  ${mq.mobile(css`
    max-height: unset;
  `)};
  :before {
    content: "";
    width: 4px;
    height: calc(100% - 5px);
    border-radius: 2px;
    background-color: #fde115;
    position: absolute;
    top: 0;
    left: 0;
  }
  :after {
    content: "”";
    position: fixed;
    bottom: -250px;
    right: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1500px;
    opacity: 0.05;
    z-index: 1;
  }
  p {
    margin-bottom: 15px;
  }
  @media (max-width: 1400px) {
    :after {
      bottom: -400px;
      right: 0px;
    }
  }
  @media (max-width: 1250px) {
    :after {
      bottom: -300px;
      right: -50px;
    }
  }
  ${mq.mobile(css`
    font-size: 18px;
    line-height: 22px;
    padding-right: 0px;
    :after {
      top: -0px;
      right: 0px;
      font-size: 800px;
    }
  `)};
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

const MessageAttirbution = styled(motion.div)`
  font-weight: 300;
  font-size: 22px;
  line-height: 24px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #fff;

  padding: 0px 20px;
  margin-bottom: 15px;
  display: block;
  span {
    font-weight: 500;
    color: #fde115;
    margin-left: 3px;
    display: inline-block;
  }
`;

const ButtonContainer = styled(motion.div)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 50px;
  padding: 0px 20px;
  flex-wrap: wrap;
`;

const ContributorAnimtion = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.2, duration: 0.5 },
  },
};

const ContributorAnimtionSecond = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    transition: { delay: 0.7, duration: 0.5 },
  },
};

const TextAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 1.2,
      duration: 1,
    },
  },
};

const LineAnim = {
  hidden: { opacity: 0, y: 0 },
  show: {
    opacity: 1,
    y: 0,
  },
};

const ButtonAnim = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delay: 1.5,
      duration: 1,
    },
  },
};

function MessageView({ setRemoveZIndex }) {
  const [flagMessage, setFlagMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [messageData, setMessageData] = useState({});
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [submitterNamePretty, setSubmitterNamePretty] = useState("");
  const [shareSubmission, setShareSubmission] = useState(false);

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (flagMessage || shareSubmission) {
      setRemoveZIndex(true);
    } else {
      setRemoveZIndex(false);
    }
  }, [flagMessage, shareSubmission]);

  useEffect(() => {
    if (id) {
      loadMessageData();
    }
  }, [id]);

  function handleViewAnother() {
    router.push("/random");
  }

  function toTitleCase(str) {
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
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
      setSubmitterNamePretty(toTitleCase(data[0].submitter));
      console.log("DATA", data[0]);
      setLoading(false);
    }
  }

  function handleFlagMessage() {
    setFlagMessage(true);
  }

  function handleFlagClick() {
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

  function handleShareClick() {
    setShareSubmission(true);
  }

  function handleViewAll() {
    router.push("/");
  }

  return (
    <Container>
      <QuoteContainerOuter>
        {flagMessage && (
          <FlagMessage
            id={messageData.id}
            quote={messageData.message_content}
            setFlagMessage={setFlagMessage}
          />
        )}
        {shareSubmission && (
          <ShareSubmission
            id={messageData.id}
            quote={messageData.message_content}
            setShareSubmission={setShareSubmission}
            submitter={submitterNamePretty}
          />
        )}
        <QuoteContainer>
          <MessageAttirbution>
            <motion.p
              style={{ display: "inline-block", marginRight: "5px" }}
              initial="hidden"
              animate={"show"}
              variants={ContributorAnimtion}
            >
              Message <span>#{messageData.id - 43}</span>
            </motion.p>

            <motion.p
              style={{ marginTop: "10px" }}
              initial="hidden"
              animate={"show"}
              variants={ContributorAnimtionSecond}
            >
              Contributed by <span>{submitterNamePretty}</span>
            </motion.p>
          </MessageAttirbution>
          <QuoteMessage variants={TextAnim} initial="hidden" animate={"show"}>
            <NewlineText text={messageData.message_content} />
          </QuoteMessage>

          <ButtonContainer
            variants={ButtonAnim}
            initial="hidden"
            animate={"show"}
          >
            <Button
              text={"View Another"}
              Icon={RandomIcon}
              action={handleViewAnother}
              useIcon
            />
            <Button
              text={"View All"}
              Icon={ViewAll}
              useIcon
              action={handleViewAll}
            />
            <Button
              text={"Share Submission"}
              Icon={Share}
              useIcon
              action={handleShareClick}
            />
            <Button
              text={"Flag as inappropriate"}
              Icon={Warning}
              useIcon
              warning
              action={handleFlagClick}
            />
          </ButtonContainer>
        </QuoteContainer>
      </QuoteContainerOuter>
    </Container>
  );
}

export default MessageView;
