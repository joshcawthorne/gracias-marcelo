import styled, { css } from "styled-components";

import mq from "src/utils/mq";
import { useRouter } from "next/router";

const FooterContainerOuter = styled.div`
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
  ${(props) =>
    !props.removeZindex &&
    css`
      z-index: 10;
    `}
  ${mq.mobile(css`
    display: none;
  `)};
`;

const FooterContainer = styled.div`
  height: 100%;
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
  box-sizing: border-box;
`;

const FooterContainerInner = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
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

const TopLayer = styled.div``;

const BottomLayer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Divider = styled.div`
  height: 10px;
  width: 1px;
  background-color: #fff;
  opacity: 0.6;
  display: inline-block;
  margin: 0 5px;
`;

const PolicyContainer = styled.div`
  color: #b8b6bc;
  display: inline-block;
  font-weight: 500;
  font-size: 12px;
  line-height: 14px;
  cursor: pointer;
  color: #baa000;
`;

function Footer({ removeZindex }) {
  const router = useRouter();
  return (
    <FooterContainerOuter removeZindex={removeZindex}>
      <FooterContainer>
        <FooterContainerInner>
          <TopLayer>
            <CopyrightText>
              © 2022 - Present, Leeds United Supporters' Trust
            </CopyrightText>
            <Divider />
            <PolicyContainer onClick={() => router.push("/privacy-policy")}>
              Privacy Policy
            </PolicyContainer>
          </TopLayer>
          <BottomLayer>
            <Created>
              Designed and Built by{" "}
              <a
                href="https://www.joshcawthorne.com"
                target={"_blank"}
                rel="noreferrer"
              >
                Josh Cawthorne
              </a>
            </Created>
          </BottomLayer>
        </FooterContainerInner>
      </FooterContainer>
    </FooterContainerOuter>
  );
}

export default Footer;
