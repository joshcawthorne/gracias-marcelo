import React from "react";
import styled, { css } from "styled-components";

import mq from "src/utils/mq";

const OuterContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.backgroundColor};
`;

const StyledContainer = styled.div`
  width: 100%;
  max-width: 1110px;
  margin-left: auto;
  margin-right: auto;
  padding: 0px 70px;
  margin-top: 60px;
  margin-bottom: 60px;
  z-index: 3;
  @media (max-width: 1200px) {
    padding: 0px 60px;
  }
  ${mq.tablet(css`
    padding: 0px 45px;
    margin-top: 60px;
    margin-bottom: 60px;
  `)};

  ${mq.mobile(css`
    padding: 0px 15px;
    margin-top: 30px;
    margin-bottom: 30px;
  `)};

  ${(props) =>
    props.relative &&
    css`
      position: relative;
    `}
`;

function Container({ styles, backgroundColor = "transparent", ...props }) {
  return (
    <OuterContainer backgroundColor={backgroundColor}>
      <StyledContainer {...props} style={{ ...styles }} />
    </OuterContainer>
  );
}

export default Container;
