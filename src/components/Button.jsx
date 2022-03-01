import { useContext, useState } from "react";
import styled, { css, ThemeContext } from "styled-components";
import { TailSpin } from "react-loading-icons";
import { motion } from "framer-motion";

import mq from "src/utils/mq";

const ContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //transition: transform 0.1s linear, color 0.1s linear, background 0.15s linear;
`;

const ButtonItem = styled.button`
  font-family: "Public Sans", sans-serif;
  transition: transform 0s linear, color 0.1s linear, background 0.15s linear;
  user-select: none;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  flex-shrink: 0;
  margin: 0px;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.4px;
  -webkit-app-region: no-drag;
  padding: 10px;
  border-radius: 5px;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "0")};
  height: 40px;
  font-weight: 500;
  background: transparent;
  color: #fff;
  border: 0px;
  z-index: 50;
  border-radius: 4px;

  position: relative;
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  letter-spacing: 0.01em;
  border: 1px solid #fff;
  border-radius: 5px;
  margin-right: 15px;
  :hover {
    background-color: #2d3747;
    color: #fff;
    border-color: #fff;

    transition: 400ms;
  }

  ${mq.mobile(css`
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 12px;
    margin-right: 10px;
    padding: 7.5px;
  `)};

  ${(props) =>
    props.warning &&
    css`
      border-color: #ff2c3c;
      :hover {
        background-color: #ff2c3c;
        color: #fff;
        border-color: #ff2c3c;
      }
    `}

  ${(props) =>
    props.leftSpacing &&
    css`
      margin-left: 15px;
    `}
  
  ${(props) =>
    props.primaryAction &&
    css`
      background: ${props.theme.primaryAction50};
      border: 2px solid ${(props) => props.theme.primaryAction50};
      :hover {
        background-color: ${(props) => props.theme.primaryAction20};
        border: 2px solid ${(props) => props.theme.primaryAction20};
      }
    `}

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.6;

      cursor: not-allowed;

      :hover {
        box-shadow: unset;
      }
    `}
  ${(props) =>
    props.ghost &&
    css`
      border-color: ${(props) => props.theme.surfaceLight50};
      border-style: solid;
      border-width: 2px;
      background-color: transparent;
      color: ${(props) => props.theme.text50};
      :hover {
        background-color: ${(props) => props.theme.surfaceLight50};
      }
    `}
  ${(props) =>
    props.loading &&
    css`
      opacity: 0.4;
      transition: 400ms;
      cursor: not-allowed;

      :hover {
        box-shadow: unset;
      }
    `}
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
  ${mq.mobile(css`
    margin-right: 7.5px;
  `)};
`;

const ArrowContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 8px;

  stroke: #130c1f;
  ${(props) =>
    props.disabled &&
    css`
      stroke: ${(props) => props.theme.text10};
      opacity: 0.4;
    `}
`;

const ChevronContainer = styled(motion.div)`
  margin-left: 5px;
  ${(props) =>
    props.noText &&
    css`
      margin-left: 0;
    `}
`;
const Button = ({
  text,
  action,
  styles,
  disabled,
  loading,
  skipButton,
  arrow,
  arrowStroke,
  ghost,
  chevron,
  chevronActive,
  disableAnimation,
  fill,
  preTextPlus,
  primaryAction,
  fullWidth,
  minWidth,
  noText,
  leftSpacing,
  useIcon,
  Icon,
  warning,
}) => {
  const themeContext = useContext(ThemeContext);
  const [hover, setHover] = useState(false);
  return (
    <ButtonItem
      onClick={() => action && !disabled && action()}
      style={{ width: fullWidth ? "100%" : "auto", ...styles }}
      loading={loading ? 1 : 0}
      disabled={disabled}
      skipButton={skipButton}
      ghost={ghost}
      disableAnimation={disableAnimation}
      primaryAction={primaryAction}
      minWidth={minWidth ? minWidth : "0"}
      leftSpacing={leftSpacing}
      warning={warning}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <ContentContainer>
        {useIcon && (
          <IconContainer>
            <Icon
              stroke={"#fff"}
              fill={!fill ? "transparent" : "#fff"}
              width={"20px"}
            />
          </IconContainer>
        )}
        {!noText && text}

        {loading && (
          <LoadingContainer
            initial={{ opacity: 0 }}
            animate={
              loading
                ? { opacity: 1, transition: { duration: 0.5 } }
                : { opacity: 0 }
            }
          >
            <TailSpin
              stroke="#fff"
              width={"18px"}
              height={"18px"}
              strokeWidth={4}
              style={{ overflow: "visible" }}
            />
          </LoadingContainer>
        )}
      </ContentContainer>
    </ButtonItem>
  );
};

export default Button;
