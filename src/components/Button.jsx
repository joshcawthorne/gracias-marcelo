import { useContext } from "react";
import styled, { css, ThemeContext } from "styled-components";
import { TailSpin } from "react-loading-icons";
import { motion } from "framer-motion";

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
  padding: 25px;
  border-radius: 5px;
  min-width: ${(props) => (props.minWidth ? props.minWidth : "auto")};
  height: 40px;
  font-weight: 500;
  background: #1c2128;
  color: #fff;
  border: 0px;
  z-index: 50;
  border-radius: 4px;
  box-sizing: border-box;
  position: relative;
  font-weight: 800;
  text-transform: uppercase;
  ${(props) =>
    props.leftSpacing &&
    css`
      margin-left: 15px;
    `}
  :hover {
    background-color: #0f3c58;

    transition: 400ms;
  }
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
    !props.disableAnimation &&
    css`
      :hover {
        /*transform: translate3d(-2px, -2px, 0);
        transition: 400ms;
        box-shadow: rgba(17, 17, 26, 0.1) 0px 8px 24px,
          rgba(17, 17, 26, 0.1) 0px 16px 56px,
          rgba(17, 17, 26, 0.1) 0px 24px 80px;*/
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
  ${(props) =>
    props.skipButton &&
    css`
      width: 155px;
      background-color: #636bfd;
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
  margin-right: 15px;
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
}) => {
  const themeContext = useContext(ThemeContext);
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
      minWidth={minWidth ? minWidth : "140px"}
      leftSpacing={leftSpacing}
    >
      <ContentContainer>
        {useIcon && (
          <IconContainer>
            <Icon stroke={"#fff"} fill={!fill ? "transparent" : "#fff"} />
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
