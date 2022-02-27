import { useState, useEffect } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

import getAllMessages from "src/services/getAllMessages";
import getTotalMessageLength from "src/services/getTotalMessageLength";
import gradients from "src/utils/gradients";
import { useRouter } from "next/router";

const OuterContentContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #05010d;
  padding-top: 100px;
`;

const BackgroundContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 40vh;
  max-height: 800px;

  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
  background-image: url("/background.png");
  :after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    display: inline-block;
    background: linear-gradient(
      to bottom,
      rgba(0, 47, 75, 0.5) 0%,
      #06010f
    ); /* W3C */
  }
`;

const ContentContainer = styled.div`
  padding-bottom: 100px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  max-width: 1400px;
  padding: 40px;
  margin-bottom: 100px;
  z-index: 2;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: fixed;
    bottom: -800px;
    z-index: 0;
    right: -600px;
    height: 1500px;
    width: 1500px;
    background-image: url("/backgroundGlowOne.png");
    background-size: cover;
    background-size: 100% 100%;
  }
  &:after {
    content: "";
    position: fixed;
    bottom: 0px;
    z-index: 0;
    right: 30%;
    height: 1000px;
    width: 400px;
    background-image: url("/backgroundGlowOne.png");
    background-size: cover;
    background-size: 100% 100%;
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`;

const MessageObject = styled.div`
  color: #fff;
  padding: 20px;
  width: 100%;
  height: 225px;
  max-width: 1000px;
  background: #19122994;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 2;
  cusor: pointer;
  :after {
    content: "“";
    font-size: 500px;
    opacity: 0.075;
    position: absolute;
    top: -150px;
    right: 0;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0;
  }
`;

const MessagePoster = styled.div`
  font-weight: bold;
  color: #fde116;
`;

const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`;

const InnerContainer = styled.div`
  display: grid;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  grid-gap: 30px;
  row-gap: 30px;
  position: relative;
  overflow: hidden;
  &:before {
    content: "";
    position: fixed;
    bottom: -800px;
    z-index: 0;
    left: -600px;
    height: 1500px;
    width: 1500px;
    background-image: url("/backgroundGlowTwo.png");
    background-size: cover;
    background-size: 100% 100%;
    opacity: 0.6;
  }
`;

const MessageContent = styled.div`
  height: 100px;
  font-size: 16px;
  letter-spacing: 0.2px;
  line-height: 24px;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  font-weight: bold;
  margin-top: 20px;
`;

const MessageNumber = styled.div`
  background: #0f1230;
  border: 1px solid #2e2640;
  width: fit-content;
  border-radius: 5px;
  padding: 10px 20px;
  span {
    font-weight: bold;
  }
`;

const IntroBlock = styled.div`
  width: 100%;
  background: #19122994;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 40px;
  margin-bottom: 50px;
`;

const Title = styled.div`
  font-weight: 700;
  line-height: 32px;
  font-size: 42px;
  color: #fff;
  margin-bottom: 16px;
  z-index: 5;
`;

const Desc = styled.div`
  font-weight: 400;
  line-height: 22px;
  font-size: 18px;
  color: #fff;
  margin-bottom: 6px;
  z-index: 5;
`;

const BottomRowContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FullMessage = styled.div`
  font-size: 14px;
`;

function AllMessages() {
  const [loadPosition, setLoadPosition] = useState("0");
  const [messageData, setMessageData] = useState([]);
  const [endPosition, setendPosition] = useState(false);
  const [totalLength, setTotalLength] = useState(0);
  const [loadedTotalLength, setLoadedTotalLength] = useState(false);
  const router = useRouter();
  useEffect(() => {
    loadTotalMessageLength();
  }, []);

  async function loadTotalMessageLength() {
    console.log("Loading");
    const totalMessageLength = await getTotalMessageLength().data;
    console.log("Loaded");
    setLoadedTotalLength(totalMessageLength);
    setLoadedTotalLength(true);
    loadMoreMessages();
  }

  async function loadMoreMessages() {
    console.log("Loading Messages");
    const { data, endPosition, error, errorMessage } = await getAllMessages({
      startPosition: parseInt(loadPosition),
    });
    console.log("Loaded messages");
    if (error) {
      console.log(errorMessage);
    }
    if (data) {
      setLoadPosition(parseInt(endPosition));
      if (endPosition <= totalLength) {
        setEndPosition(true);
      }

      console.log(data);
      setMessageData((messageData) => [...messageData, ...data]);

      console.log(messageData);
    }
  }

  function handleClick(id) {
    router.push(`/message/${id}`);
  }

  return (
    <OuterContentContainer>
      <ContentContainer>
        <IntroBlock>
          <Title>All Messages</Title>
          <Desc>Below is the full list of every message sent for Marcelo.</Desc>
        </IntroBlock>
        <StyledInfiniteScroll
          dataLength={messageData.length} //This is important field to render the next data
          next={loadMoreMessages}
          hasMore={!endPosition}
          loader={<h4 style={{ color: "white" }}>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
          // below props only if you need pull down functionality
        >
          <InnerContainer>
            {messageData.map((d, i) => {
              if (!d.flagged) {
                return (
                  <MessageObject
                    onClick={() => handleClick(d.id)}
                    key={i}
                    background={
                      gradients[Math.floor(Math.random() * gradients.length)]
                        .data
                    }
                  >
                    <MessageNumber>
                      <span>#{i}</span>
                    </MessageNumber>
                    <MessageContent>{d.message_content}</MessageContent>
                    <BottomRowContainer>
                      <MessagePoster>{d.submitter}</MessagePoster>
                      <FullMessage>View Full Message</FullMessage>
                    </BottomRowContainer>
                  </MessageObject>
                );
              } else {
                return null;
              }
            })}
          </InnerContainer>
        </StyledInfiniteScroll>
      </ContentContainer>
      <BackgroundContainer />
    </OuterContentContainer>
  );
}

export default AllMessages;
