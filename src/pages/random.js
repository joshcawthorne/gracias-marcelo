import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import getRandomMessage from "src/services/getRandomMessage";
import Loader from "src/components/Loader";

const LoaderContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
`;

function Index() {
  const router = useRouter();
  useEffect(() => {
    randomMessage();
  }, []);

  async function randomMessage() {
    const { data } = await getRandomMessage();
    setTimeout(() => {
      router.push("/s/" + data);
    }, Math.floor(Math.random() * (3500 - 0 + 1)) - 1);
  }

  return (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  );
}

export default Index;
