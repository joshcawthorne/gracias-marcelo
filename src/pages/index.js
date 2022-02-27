import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { TailSpin } from "react-loading-icons";
import Cookies from "js-cookie";

import getRandomMessage from "src/services/getRandomMessage";

const LoadingContainer = styled.div`
  color: #fff;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 150px);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  margin-left: 15px;
  font-weight: bold;
`;

function Index() {
  const router = useRouter();
  const [loadingMessageNum, setLoadingMessageNum] = useState(0);
  useEffect(() => {
    let randomNum = generateRandom();
    Cookies.set("previousMessage", randomNum, { expires: 7 });
    setLoadingMessageNum(randomNum);
    randomMessage();
  }, []);

  function generateRandom() {
    var num = Math.floor(Math.random() * (loadingMessages.length - 0 + 1)) + 0;
    return num === parseInt(Cookies.get("previousMessage"))
      ? generateRandom()
      : num;
  }

  async function randomMessage() {
    const { data } = await getRandomMessage();
    setTimeout(() => {
      router.push("/message/" + data);
    }, Math.floor(Math.random() * (3500 - 0 + 1)) - 1);
  }

  const loadingMessages = [
    "Practicing murderball",
    "Rewatching Stoke (H) 2018",
    "Banning chocolate cake from the canteen",
    "Preparing dossier",
    "Sat in Costa",
    "Popping to Morrisons",
    "Deciding which Leeds tracksuit to wear",
    "Working out how Bamford's hand was offside vs Crystal Palace",
    "Re-living Dallas's winner against Man City",
  ];

  return (
    <LoadingContainer>
      <TailSpin
        stroke="#fff"
        width={"18px"}
        height={"18px"}
        strokeWidth={4}
        style={{ overflow: "visible" }}
      />
      <TextContainer>{loadingMessages[loadingMessageNum]}...</TextContainer>
    </LoadingContainer>
  );
}

export default Index;
