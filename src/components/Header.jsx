import { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

import Logo from "src/assets/svg/lustLogo.svg";
import Button from "./Button";
import mq from "src/utils/mq";
import MobileMenu from "src/components/MobileMenu";
import SubmitMessage from "src/components/SubmitMessage";

import Plus from "src/assets/svg/plus.svg";
import RandomIcon from "src/assets/svg/randomIcon.svg";
import MenuIcon from "src/assets/svg/menuIcon.svg";

const HeaderContainerOuter = styled.div`
  width: 100%;
  padding: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #130c1f78;
  backdrop-filter: blur(20px);
  color: #fff;
  -webkit-backdrop-filter: blur(20px);
  z-index: 10;
  ${mq.mobile(css`
    padding: 15px 0px;
  `)};
  ${(props) => props.removeZIndex && "z-index: 0;"}
`;

const HeaderContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 40px;
  box-sizing: border-box;
  ${mq.mobile(css`
    padding: 0 15px;
  `)}
`;

const RightContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  ${mq.mobile(css`
    display: none;
  `)};
`;

const MenuIconContainer = styled.div`
  display: none;
  ${mq.mobile(css`
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  `)};
`;

const LogoAnim = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 3, duration: 0.5 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0, duration: 0 },
  },
};

const ButtonOneAnim = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 3.1, duration: 0.5 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0, duration: 0 },
  },
};

const ButtonTwoAnim = {
  hidden: { opacity: 0, y: -40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { delay: 3.2, duration: 0.5 },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { delay: 0, duration: 0 },
  },
};

function Header({ removeZIndex }) {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);
  const [isHome, setIsHome] = useState(false);
  const [anim, setAnim] = useState(false);
  const [loadedLocation, setLoadedLocation] = useState(false);
  function handleViewRandom() {
    setMenuOpen(false);
    router.push("/random");
  }

  function handleSubmit() {
    setSubmitMessage(true);
  }

  useEffect(() => {
    setLoadedLocation(false);
    if (router.pathname === "/") {
      setIsHome(true);
      setLoadedLocation(true);
    } else {
      setIsHome(false);
      setLoadedLocation(true);
    }
  }, [router]);

  useEffect(() => {
    if (isHome) {
      setAnim(true);
      console.log("yes");
    } else {
      setAnim(false);
      console.log("no");
    }
  }, [isHome]);

  if (!loadedLocation) {
    return null;
  }

  return (
    <>
      {menuOpen && (
        <MobileMenu
          setMenuOpen={setMenuOpen}
          menuOpen={menuOpen}
          setSubmitMessage={setSubmitMessage}
        />
      )}
      {submitMessage && (
        <SubmitMessage
          submitMessage={submitMessage}
          setSubmitMessage={setSubmitMessage}
        />
      )}

      <HeaderContainerOuter removeZIndex={removeZIndex}>
        <HeaderContainer>
          <motion.div
            initial={isHome ? "hidden" : "visible"}
            animate={anim ? "show" : isHome ? "hidden" : "visible"}
            variants={LogoAnim}
          >
            <Logo
              height={"50px"}
              onClick={() => router.push("/")}
              style={{ cursor: "pointer" }}
            />
          </motion.div>
          <RightContent>
            <ButtonContainer>
              <motion.div
                initial={isHome ? "hidden" : "visible"}
                animate={anim ? "show" : isHome ? "hidden" : "visible"}
                variants={ButtonOneAnim}
              >
                <Button
                  text={"View a random Submission"}
                  useIcon
                  action={handleViewRandom}
                  Icon={RandomIcon}
                />
              </motion.div>
              <motion.div
                initial={isHome ? "hidden" : "visible"}
                animate={anim ? "show" : isHome ? "hidden" : "visible"}
                variants={ButtonTwoAnim}
              >
                <Button
                  text={"Submit your message"}
                  useIcon
                  Icon={Plus}
                  action={handleSubmit}
                />
              </motion.div>
            </ButtonContainer>
            <motion.div
              initial={isHome ? "hidden" : "visible"}
              animate={anim ? "show" : isHome ? "hidden" : "visible"}
              variants={ButtonOneAnim}
            >
              <MenuIconContainer onClick={() => setMenuOpen(true)}>
                <MenuIcon />
              </MenuIconContainer>
            </motion.div>
          </RightContent>
        </HeaderContainer>
      </HeaderContainerOuter>
    </>
  );
}

export default Header;
