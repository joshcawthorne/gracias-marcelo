import styled from "styled-components";

const FooterContainer = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: #130c1f78;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  z-index: 10;
`;

const FooterContainerInner = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0px 40px;
  box-sizing: border-box;
`;

const Created = styled.div`
  color: #b8b6bc;
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
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
`;

function Footer() {
  return (
    <FooterContainer>
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
    </FooterContainer>
  );
}

export default Footer;
