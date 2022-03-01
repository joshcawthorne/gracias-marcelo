import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";
import { motion } from "framer-motion";
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

function AllSubmissionListDesc({ ascending, setRemoveZIndex }) {
  const [loadPosition, setLoadPosition] = useState("-1");
  const [messageData, setMessageData] = useState([]);
  const [endPosition, setEndPosition] = useState(false);
  const [totalLength, setTotalLength] = useState(6000);
  const [firstLoad, setFirstLoad] = useState(true);
  const [loadedTotalLength, setLoadedTotalLength] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [reset, setReset] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMessageData([]);
    loadTotalMessageLength();
  }, []);

  async function loadTotalMessageLength() {
    const totalMessageLength = await getTotalMessageLength();

    setTotalLength(totalMessageLength.data);
    setLoadedTotalLength(true);
    loadMoreMessages();
  }

  async function loadMoreMessages(reset) {
    const { data, endPosition, error, errorMessage } = await getAllMessages({
      startPosition: reset ? 0 : parseInt(loadPosition) + 1,
      ascending: false,
    });
    if (error) {
      console.log(errorMessage);
    }
    if (data) {
      setLoadPosition(parseInt(endPosition));
      if (endPosition >= totalLength) {
        setEndPosition(true);
      }
      setTimeout(() => {
        setMessageData((messageData) => [...messageData, ...data]);
      }, Math.floor(Math.random() * (2000 - 0 + 1)) - 1);
    }
  }

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
      next={loadMoreMessages}
      hasMore={!endPosition}
      loader={<LoaderObject />}
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
      // below props only if you need pull down functionality
    >
      <InnerContainer>
        {messageData.map((d, i) => {
          if (!d.flagged) {
            return (
              <SubmissionObject
                key={i}
                id={d.id}
                submitter={d.submitter}
                messageContent={d.message_content}
                flagged={d.flagged}
                setRemoveZIndex={setRemoveZIndex}
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
