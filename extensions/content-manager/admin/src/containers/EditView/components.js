import styled, { css } from "styled-components";
import { Flex, Text } from "@buffetjs/core";

const SubWrapper = styled.div`
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 4px #e3e9f3;
`;

const TabWrapper = styled.button`
  background: transparent;
  // margin: 0 1em;
  // padding: 0.25em 1em;
  outline: none;
  cursor: pointer;
  font-size: 16px;
  line-height: 24px;
  padding: 8px 16px;
  color: #492796;
  background-color: #fff;
  border: 1px solid #f1f1f1;
  box-shadow: 0 2px 16px 0 rgb(0 0 0 / 10%);
  margin-right: 2px;
  transition: color 0.16s ease-in-out, background-color 0.16s ease-in-out,
    border-color 0.16s ease-in-out;
  ${(props) => {
    return (
      props.isActive &&
      css`
        // border-bottom: 2px solid #007bff;
        // color: #fff;
        // background: #007bff;
        background-color: #3596f5;
        border-color: #3596f5;
        color: #fff;
        cursor: default;
      `
    );
  }}
`;

const TapProgress = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  top: 52px;
  height: 4px;
  z-index: 0;
  background-color: #f0f0f0;
  transform-origin: 0;
`;

const CardWrapper = styled.div`
  padding: 10px 5px 5px 5px;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
`;

const MainWrapper = styled(SubWrapper)`
  > div {
    margin-right: 0;
    margin-left: 0;
  }
  padding: 22px 10px;
`;

const LinkWrapper = styled(SubWrapper)`
  background: #ffffff;
  border-radius: 2px;
  box-shadow: 0 2px 4px #e3e9f3;
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    padding: 7px 20px;
    border-top: 1px solid #f6f6f6;
    &:first-of-type {
      border-color: transparent;
    }
    &:not(:first-of-type) {
      margin-top: 0;
    }
  }
`;

const DeleteButton = styled(Flex)`
  color: ${({ theme }) => theme.main.colors.lightOrange};
  align-items: center;
  cursor: pointer;
  margin-left: 0.2rem;
  svg {
    width: 1.1rem !important;
    margin-right: 1rem;
  }
`;

const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
  border-radius: 2px;

  height: 36px;
  padding: 0 15px;
  ${({ theme, isGreen }) =>
    isGreen
      ? `
      ${Text} {
        color: ${theme.main.colors.green};
      }
      background-color: #E6F8D4;
      border: 1px solid #AAD67C;
    `
      : `
      ${Text} {
        color: ${theme.main.colors.mediumBlue};
      }
      background-color: ${theme.main.colors.lightBlue};
      border: 1px solid #a5d5ff;
  `}
`;

export {
  LinkWrapper,
  MainWrapper,
  SubWrapper,
  DeleteButton,
  StatusWrapper,
  TabWrapper,
  TapProgress,
  CardWrapper,
};
