import { useRouter } from "next/router";
import styled from "styled-components";

import BackArrow from "src/assets/svg/backArrow.svg";

const BackButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: fit-content;
  user-select: none;
  cursor: pointer;
`;

const BackButtonText = styled.div`
  font-size: 12px;
  font-family: "Public Sans", sans-serif;
  color: #fff;
  font-weight: 500;
  line-height: 14px;
  margin-left: 5px;
`;

function BackButton({ link, text, action }) {
  const router = useRouter();
  function handleBack() {
    if (action) {
      action();
    } else {
      router.push(link);
    }
  }
  return (
    <BackButtonContainer onClick={() => handleBack()}>
      <BackArrow width={"16px"} stroke={"#b2b6f4"} />
      <BackButtonText>{text ? text : "Back"}</BackButtonText>
    </BackButtonContainer>
  );
}

export default BackButton;
