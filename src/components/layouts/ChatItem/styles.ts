/*---------- External ----------*/
import styled from "styled-components";

export const ItemContainer = styled.button`
  position: relative;
  padding: 1rem 1.25rem;
  cursor: pointer;
  display: flex;
  gap: 0.75rem;
  border: none;
  outline: none;
  align-items: stretch;
  background: transparent;

  &::before {
    content: "";
    inset: 0;
    background-color: black;
    opacity: 0;
    position: absolute;
    transition: opacity 200ms;
  }

  &:hover,
  &:focus-visible {
    &::before {
      opacity: 0.1;
    }
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
`;

export const InfoSectionTopRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const InfoSectionBottomRow = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-end;
  justify-content: space-between;
  gap: 0.5rem;
`;

export const TitleLabel = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ContentLabel = styled.span<{ bold: boolean }>`
  font-size: 0.85rem;
  color: #3d3d3d;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: ${({ bold }) => (bold ? "bold" : "normal")};
`;

export const TimeLabel = styled.span`
  font-size: 0.65rem;
  color: #3d3d3d;
`;

export const MessageCountDotContainer = styled.div`
  height: 100%;
  aspect-ratio: 1;
`;

export const MessageCountDot = styled.div`
  height: 100%;
  width: 100%;
  background-color: #14a83a;
  border-radius: 50%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
  font-size: 0.7rem;
  color: white;
  font-weight: bold;
`;
