import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";

import { useRouter } from "next/router";
import Container from "../Container";

import mq from "src/utils/mq";
import Search from "src/components/Search";
import AllSubmissionListAsc from "./AllSubmissionListAsc";
import AllSubmissionListDesc from "./AllSubmissionListDesc";

import SortIcon from "src/assets/svg/sort.svg";
import SearchIcon from "src/assets/svg/search.svg";

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const FullMessage = styled.div`
  font-size: 14px;
`;

const MessagePoster = styled.div`
  font-weight: bold;
  color: #fde116;
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
  cursor: pointer;
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

const TopLayer = styled.div`
  margin-bottom: 16px;
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
`;

const TopLayerSecondary = styled.div`
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  ${mq.mobile(css`
    flex-wrap: wrap;
    flex-direction: column-reverse;
    align-items: flex-start;
  `)};
`;

const Title = styled.div`
  font-weight: 500;
  font-size: 28px;
  line-height: 33px;
  color: #ffffff;
  ${mq.mobile(css`
    font-size: 22px;
    line-height: 26px;
  `)};
`;

const SearchbarContainer = styled.div`
  width: calc(100% - 155px);
  height: 45px;
  background-color: transparent;
  border: 1px solid #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 0px 11px;
  ${(props) =>
    props.isSearching &&
    css`
      width: 100%;
    `}
  ${mq.mobile(css`
    margin-top: 15px;
    width: 100%;
  `)}
`;

const SearchbarIconContainer = styled.div`
  width: 17px;
  height: 17px;
  margin-right: 10px;
`;

const Searchbar = styled.input`
  font-size: 14px;
  width: 100%;
  height: 100%;
  outline: none;
  line-height: 14px;
  background-color: transparent;
  border: 0px;
  letter-spacing: 0.01em;
  position: relative;
  color: #fff;
  ::placeholder {
    color: #b7a7a7;
  }
`;

const SortButton = styled.div`
  border: 1px solid #ffffff;
  box-sizing: border-box;
  border-radius: 5px;
  height: 45px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  width: 140px;
  user-select: none;
  cursor: pointer;
  ${mq.mobile(css`
    width: 100%;
  `)}
`;

const SortText = styled.div`
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  margin-right: 10px;
`;

const SortIconContainer = styled.div``;

const ContainerAnim = {
  hidden: { opacity: 0, y: 80 },
  show: {
    opacity: [0, 0.5, 1],
    y: 0,
    transition: {
      duration: 0.6,
      delay: 3,
      ease: "easeOut",
      type: "spring",
      velocity: 100,
      stiffness: 700,
      damping: 100,
    },
  },
};

function AllSubmissions({ setRemoveZIndex }) {
  const [loadPosition, setLoadPosition] = useState("-1");
  const [messageData, setMessageData] = useState([]);
  const [endPosition, setEndPosition] = useState(false);
  const [totalLength, setTotalLength] = useState(6000);
  const [firstLoad, setFirstLoad] = useState(true);
  const [ascending, setAscending] = useState(true);
  const [loadedTotalLength, setLoadedTotalLength] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [reset, setReset] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchInput !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  }, [searchInput]);

  useEffect(() => {}, [ascending]);

  return (
    <Container
      styles={{ display: "flex", justifyContent: "center", overflow: "hidden" }}
    >
      <ContentContainer
        variants={ContainerAnim}
        initial="hidden"
        animate="show"
      >
        <TopLayer>
          <Title>All Submissions</Title>
          <TopLayerSecondary>
            <SearchbarContainer isSearching={isSearching}>
              <SearchbarIconContainer>
                <SearchIcon width={"17px"} />
              </SearchbarIconContainer>
              <Searchbar
                placeholder={"Search Submitters"}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </SearchbarContainer>
            {!isSearching && (
              <SortButton onClick={() => setAscending(!ascending)}>
                <SortText>{ascending ? "Ascending" : "Decending"}</SortText>
                <SortIconContainer>
                  <SortIcon />
                </SortIconContainer>
              </SortButton>
            )}
          </TopLayerSecondary>
        </TopLayer>
        <OuterContainer>
          {isSearching ? (
            <Search
              searchTerm={searchInput}
              setRemoveZIndex={setRemoveZIndex}
            />
          ) : (
            <>
              {ascending ? (
                <AllSubmissionListAsc
                  ascending={ascending}
                  key={ascending}
                  setRemoveZIndex={setRemoveZIndex}
                />
              ) : (
                <AllSubmissionListDesc
                  ascending={ascending}
                  key={ascending}
                  setRemoveZIndex={setRemoveZIndex}
                />
              )}
            </>
          )}
        </OuterContainer>
      </ContentContainer>
    </Container>
  );
}

export default AllSubmissions;
