import { useState, useEffect } from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRouter } from "next/router";

import getAllMessages from "src/services/getAllMessages";
import getTotalMessageLength from "src/services/getTotalMessageLength";
import SubmissionObject from "./SubmissionObject";
import Loader from "../Loader";

const StyledInfiniteScroll = styled(InfiniteScroll)`
  width: 100%;
`;

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
`;

const LoaderContainer = styled.div`
  margin-top: 50px;
  margin-bottom: 100px;
`;

function AllSubmissionListDesc({ setRemoveZIndex, setTotalLengthObj }) {
  const [messageData, setMessageData] = useState([]);
  const [totalMessageLength, setTotalMessageLength] = useState(0);
  const router = useRouter();

  useEffect(() => {
    setMessageData([]);
    loadTotalMessageLength();
  }, []);

  async function loadTotalMessageLength() {
    const totalLegnthData = await getTotalMessageLength();
    setTotalMessageLength(totalLegnthData.data);
  }

  const fetchMoreData = async () => {
    const { data, endPosition, error, errorMessage } = await getAllMessages({
      startPosition: messageData.length,
      ascending: false,
    });
    if (error) {
      console.log(errorMessage);
    }
    if (data) {
      setTimeout(() => {
        setMessageData([...messageData, ...data]);
      }, Math.floor(Math.random() * (2000 - 0 + 1)) - 1);
    }
  };

  function handleClick(id) {
    router.push(`/message/${id}`);
  }

  const LoaderObject = () => {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  };

  return (
    <StyledInfiniteScroll
      dataLength={messageData.length}
      next={fetchMoreData}
      hasMore={messageData.length >= totalMessageLength ? false : true}
      loader={<LoaderObject />}
      scrollThreshold={0.2}
      endMessage={
        <p
          style={{
            textAlign: "center",
            color: "#fff",
            margin: "50px",
          }}
        >
          <b>{"You've reached the end of the road"}</b>
        </p>
      }
    >
      <InnerContainer>
        {messageData.map((d, i) => {
          if (!d.flagged) {
            return (
              <SubmissionObject
                key={i}
                first={i === 0}
                id={d.id}
                submitter={d.submitter}
                messageContent={d.message_content}
                flagged={d.flagged}
                setRemoveZIndex={setRemoveZIndex}
                ascending={false}
                setTotalLengthObj={setTotalLengthObj}
              />
            );
          } else {
            return null;
          }
        })}
      </InnerContainer>
    </StyledInfiniteScroll>
  );
}

export default AllSubmissionListDesc;
