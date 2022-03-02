import { useEffect, useState } from "react";
import styled from "styled-components";
import { TailSpin } from "react-loading-icons";
import Cookies from "js-cookie";

const LoadingContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled.div`
  margin-left: 15px;
  font-weight: bold;
`;

function Loader() {
  const [loadingMessageNum, setLoadingMessageNum] = useState(0);
  useEffect(() => {
    let randomNum = generateRandom();
    Cookies.set("previousMessage", randomNum, { expires: 7 });
    setLoadingMessageNum(randomNum);
  }, []);

  function generateRandom() {
    var num = Math.floor(Math.random() * (loadingMessages.length - 0)) + 0;
    return num === parseInt(Cookies.get("previousMessage"))
      ? generateRandom()
      : num;
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
    "Are jokes about the bucket still funny? No, I didn't think so",
    "Straightening out my glasses (Thanks, Bamford)",
    "Giving away a literal car in the Christmas Raffle",
    "Something something Frank Lampard",
    "Mi traductor se retrasa",
    "Making players pick litter",
    "Bueno.",
    "Very good Davies",
    "Learning how to pronounce Ipswich",
    "Preparing powerpoints on Frank Lampard",
    "Polishing the FIFA fair play award",
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

export default Loader;
