import { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import Div100vh from "react-div-100vh";

import Logo from "src/assets/svg/lustLogo.svg";
import Cross from "src/assets/svg/cross.svg";

const MobileMenuOuterContainer = styled(motion.div)`
  height: 100%;
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

const TopLayer = styled(motion.div)`
  padding: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentContainer = styled(motion.div)`
  width: 100%;
  text-align: center;
`;

const BottomLayer = styled(motion.div)`
  width: 100%;
`;

const LogoContainer = styled.div``;

const CloseIconContainer = styled.div`
  cursor: pointer;
`;

const Title = styled(motion.div)`
  font-weight: bold;
  font-size: 38px;
  line-height: 45px;
  color: #fff;
  margin-bottom: 25px;
  span {
    color: #fde115;
  }
`;

const MenuItem = styled(motion.div)`
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
    @media (max-width: 525px) {
      display: none;
    }
  }
`;

const CopyrightText = styled.div`
  color: #b8b6bc;
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

function MobileMenu({ setMenuOpen, setSubmitMessage, menuOpen }) {
  const [runAnim, setRunAnim] = useState(false);
  const router = useRouter();

  function handleClose() {
    setRunAnim(false);
    setTimeout(() => {
      setMenuOpen(false);
    }, 500);
  }

  function handleViewAll() {
    handleClose();
    router.push("/");
  }

  function handleViewRandom() {
    handleClose();
    router.push("/random");
  }

  function handleJoinTrust() {
    handleClose();
    router.push("https://lufctrust.com/membership");
  }

  function handleSubmit() {
    handleClose();
    setSubmitMessage(true);
  }

  useEffect(() => {
    if (menuOpen) {
      setRunAnim(true);
    } else {
      setRunAnim(false);
    }
  }, [menuOpen]);

  const BackgroundAnim = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { delay: 0, duration: 0.5 },
    },
  };

  const TopLayerAnim = {
    hidden: { opacity: 0, y: -40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.5 },
    },
  };

  const ContentAnim = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        delayChildren: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const ItemAnim = {
    hidden: { opacity: 0, y: 80 },
    show: {
      opacity: [0, 0.5, 1],
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        type: "spring",
        velocity: 100,
        stiffness: 700,
        damping: 100,
      },
    },
  };

  const BottomAnim = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 0.5 },
    },
  };

  return (
    <Div100vh>
      <MobileMenuOuterContainer
        initial="hidden"
        animate={runAnim ? "show" : "hidden"}
        variants={BackgroundAnim}
      >
        <TopLayer
          initial="hidden"
          animate={runAnim ? "show" : "hidden"}
          variants={TopLayerAnim}
        >
          <LogoContainer onClick={() => handleViewAll()}>
            <Logo width={"50px"} />
          </LogoContainer>
          <CloseIconContainer onClick={() => handleClose()}>
            <Cross width={"30px"} />
          </CloseIconContainer>
        </TopLayer>
        <ContentContainer
          initial="hidden"
          animate={runAnim ? "show" : "hidden"}
          variants={ContentAnim}
        >
          <Title key={0} variants={ItemAnim}>
            <span>Gracias, </span>Marcelo
          </Title>
          <MenuItem
            onClick={() => handleViewRandom()}
            key={1}
            variants={ItemAnim}
          >
            View a random Message
          </MenuItem>

          <MenuItem
            onClick={() => handleJoinTrust()}
            key={3}
            variants={ItemAnim}
          >
            Join The Trust
          </MenuItem>
        </ContentContainer>
        <BottomLayer
          initial="hidden"
          animate={runAnim ? "show" : "hidden"}
          variants={BottomAnim}
        >
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
    </Div100vh>
  );
}

export default MobileMenu;
