import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

import Logo from "src/assets/svg/lustLogo.svg";
import Cross from "src/assets/svg/cross.svg";

const MobileMenuOuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  z-index: 200;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(17, 10, 30, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const TopLayer = styled.div`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  text-align: center;
`;

const BottomLayer = styled.div`
  width: 100%;
`;

const LogoContainer = styled.div``;

const CloseIconContainer = styled.div``;

const Title = styled.div`
  font-weight: bold;
  font-size: 38px;
  line-height: 45px;
  color: #fff;
  margin-bottom: 25px;
  span {
    color: #fde115;
  }
`;

const MenuItem = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;
  display: flex;
  align-items: center;
  letter-spacing: 0.01em;
  color: #ffffff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
`;

const FooterContainerInner = styled.div`
  display: block;
  text-align: center;
  width: 100%;
  padding: 15px;
`;

const Created = styled.div`
  color: #b8b6bc;
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  a {
    color: #baa000;
    text-decoration: none;
  }
  span {
    margin-left: 2.5px;
  }
`;

const CopyrightText = styled.div`
  color: #b8b6bc;
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

function MobileMenu({ setMenuOpen }) {
  const router = useRouter();
  function handleViewAll() {
    setMenuOpen(false);
    router.push("/");
  }

  function handleViewRandom() {
    setMenuOpen(false);
    router.push("/random");
  }

  function handleJoinTrust() {
    setMenuOpen(false);
    router.push("https://lufctrust.com/membership");
  }

  return (
    <MobileMenuOuterContainer>
      <TopLayer>
        <LogoContainer onClick={() => handleViewAll()}>
          <Logo width={"50px"} />
        </LogoContainer>
        <CloseIconContainer onClick={() => setMenuOpen(false)}>
          <Cross width={"30px"} />
        </CloseIconContainer>
      </TopLayer>
      <ContentContainer>
        <Title>
          <span>Gracias, </span>Marcelo
        </Title>
        <MenuItem onClick={() => handleViewRandom()}>
          View a random Message
        </MenuItem>
        <MenuItem onClick={() => handleViewRandom()}>
          Submit your message
        </MenuItem>
        <MenuItem onClick={() => handleJoinTrust()}>Join The Trust</MenuItem>
      </ContentContainer>
      <BottomLayer>
        <FooterContainerInner>
          <CopyrightText>
            © 2022 - Present, Leeds United Supporters' Trust
          </CopyrightText>
          <Created>
            <span> | </span> Designed and Built by{" "}
            <a
              href="https://www.joshcawthorne.com"
              target={"_blank"}
              rel="noreferrer"
            >
              Josh Cawthorne
            </a>
          </Created>
        </FooterContainerInner>
      </BottomLayer>
    </MobileMenuOuterContainer>
  );
}

export default MobileMenu;
