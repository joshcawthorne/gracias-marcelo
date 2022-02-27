import styled from "styled-components";

import Logo from "src/assets/svg/lustLogo.svg";

const HeaderContainerOuter = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #130c1f78;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 10;
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
`;

function Header() {
  return (
    <HeaderContainerOuter>
      <HeaderContainer>
        <Logo height={"50px"} />
      </HeaderContainer>
    </HeaderContainerOuter>
  );
}

export default Header;
