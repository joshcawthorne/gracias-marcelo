import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import useInView from "react-cool-inview";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Button from "../Button";
import FlagMessage from "src/components/FlagMessage";
import ShareSubmission from "src/components/ShareSubmission";
import mq from "src/utils/mq";

import Chevron from "src/assets/svg/chevron.svg";
import Share from "src/assets/svg/share.svg";
import View from "src/assets/svg/view.svg";
import Warning from "src/assets/svg/warning.svg";

const SubmissionObjectContainer = styled(motion.div)`
  background: #110a1e;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  color: #fff;
  cursor: pointer;
  opacity: 0;
`;

const LeftContent = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NumberItem = styled.div`
  background-color: #292335;
  width: 42px;
  height: 42px;
  min-width: 29px;
  min-height: 29px;
  font-weight: bold;
  font-size: 10.5px;
  line-height: 11px;
  text-align: center;
  border-radius: 5px;
  color: #fde115;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
`;

const Submitter = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  text-transform: capitalize;
  ${mq.mobile(css`
    font-size: 14px;
  `)};
`;

const ChevronContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 7px;
  height: 100%;
`;

const RightContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UpperLayer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
`;

const InnerContainer = styled.div`
  width: 100%;
  padding: 0 15px;
`;

const MessageContentContainer = styled(motion.div)`
  height: 0px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const MessageContentContainerInner = styled.div`
  margin-bottom: 5px;
  height: fit-content;
  display: flex;
  padding-bottom: 15px;
  margin-top: 5px;
`;

const Message = styled.div`
  color: #fff;
  position: relative;
  padding-left: 35px;
  margin-left: 20px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 0px;
  margin-bottom: -5px;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.01em;
  color: #ffffff;
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
  p {
    margin-bottom: 15px;
  }
  ${mq.mobile(css`
    padding-left: 15px;
    padding-right: 10px;
  `)};
`;

const ButtonContainer = styled.div`
  margin-bottom: 20px;
  margin-left: 50px;
  ${mq.mobile(css`
    margin-left: 10px;
  `)};
`;

function SubmissionObject({
  id,
  submitter,
  messageContent,
  flagged,
  setRemoveZIndex,
  ascending,
  is_video,
}) {
  const [display, setDisplay] = useState(false);
  const [open, setOpen] = useState(false);
  const [flagMessage, setFlagMessage] = useState(false);
  const [shareSubmission, setShareSubmission] = useState(false);
  const [submitterNamePretty, setSubmitterNamePretty] = useState(submitter);
  const { observe, unobserve, inView, scrollDirection, entry } = useInView({
    threshold: 0.1,
  });
  const router = useRouter();

  function toTitleCase(str) {
    return str?.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  useEffect(() => {
    if (inView) {
      setDisplay(true);
    }
    setSubmitterNamePretty(toTitleCase(submitter));
  }, [inView]);

  useEffect(() => {
    if (flagMessage || shareSubmission) {
      setRemoveZIndex(true);
    } else {
      setRemoveZIndex(false);
    }
  }, [flagMessage, shareSubmission]);

  function NewlineText(props) {
    const text = props.text;
    if (text) {
      return text.split("\n").map((str, i) => <p key={i}>{str}</p>);
    } else {
      return null;
    }
  }

  function viewSubmission() {
    router.push(`/s/${id}`);
  }

  function handleFlagClick() {
    setFlagMessage(true);
  }

  function handleShareClick() {
    setShareSubmission(true);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <SubmissionObjectContainer
      initial={{ opacity: 0 }}
      animate={inView && { opacity: 1 }}
      ref={observe}
    >
      {flagMessage && (
        <FlagMessage
          id={id}
          quote={messageContent}
          setFlagMessage={setFlagMessage}
        />
      )}
      {shareSubmission && (
        <ShareSubmission
          id={id}
          quote={messageContent}
          setShareSubmission={setShareSubmission}
          submitter={submitterNamePretty}
        />
      )}
      <InnerContainer>
        <UpperLayer onClick={() => setOpen(!open)}>
          <LeftContent>
            <NumberItem>{!ascending ? id - 43 : id}</NumberItem>
            <Submitter>{submitterNamePretty}</Submitter>
          </LeftContent>
          <RightContent>
            <ChevronContainer
              animate={open ? { rotate: "180deg" } : { rotate: 0 }}
            >
              <Chevron width={"16px"} />
            </ChevronContainer>
          </RightContent>
        </UpperLayer>
        <MessageContentContainer
          animate={open ? { height: "fit-content" } : { height: "0px" }}
        >
          <MessageContentContainerInner>
            <Message>
              {is_video ? (
                "Click 'View Full Submission' to view this video."
              ) : (
                <NewlineText text={messageContent} />
              )}
            </Message>
          </MessageContentContainerInner>
          <ButtonContainer>
            <Button
              text={"View Full Submission"}
              Icon={View}
              useIcon
              action={viewSubmission}
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
        </MessageContentContainer>
      </InnerContainer>
    </SubmissionObjectContainer>
  );
}

export default SubmissionObject;
