/*---------- External ----------*/
import styled, { css } from "styled-components";

const LeftSideBubbleStyle = css`
  color: black;
  background-color: white;
`;

const RightSideBubbleStyle = css`
  color: white;
  background-color: #327560;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 75%;
  min-height: 2.25rem;
  padding-bottom: 0.25rem;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 0.35rem;
`;

export const TimeLabel = styled.span`
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0 0 0 0.5rem;
  color: #555;
`;

export const MessageBubble = styled.div`
  padding: 0.75rem 1rem;
  border-radius: 1.5rem;
  min-width: 5rem;
  font-size: 1rem;
  box-shadow: 0 1px 2px 1.5px #00000016;
  word-wrap: break-word;
  word-break: break-word;
  overflow: hidden;
`;

export const ProfilePictureContainer = styled.div`
  width: 38px;
`;

export const MessageContainer = styled.li<{ alignment: "left" | "right" }>`
  display: flex;
  padding: 0.2rem 1.25rem;
  gap: 0.6rem;
  justify-content: flex-start;

  & > div > ${MessageBubble} {
    ${({ alignment }) =>
      alignment === "left" ? LeftSideBubbleStyle : RightSideBubbleStyle}
  }

  flex-direction: ${({ alignment }) =>
    alignment === "left" ? "row" : "row-reverse"};
`;
