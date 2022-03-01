import styled from "styled-components";
import { useRouter } from "next/router";

import Container from "src/components/Container";
import Button from "src/components/Button";

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
`;

const Title = styled.div`
  font-weight: 700;
  line-height: 34px;
  font-size: 32px;
  color: #fff;
  margin-bottom: 6px;
  z-index: 5;
  margin-bottom: 20px;
`;

function Custom404() {
  const router = useRouter();
  function goHome() {
    router.push("/");
  }
  return (
    <Container>
      <InnerContainer>
        <Title>Nobody panic, but we can't find this page.</Title>
        <Button text={"Go Home"} action={goHome} />
      </InnerContainer>
    </Container>
  );
}

export default Custom404;
