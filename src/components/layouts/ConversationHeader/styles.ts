/*---------- External ----------*/
import styled from "styled-components";

export const Container = styled.header`
  padding: 1rem 1.25rem;
  box-shadow: 0 0 0.75rem 0.125rem #00000016;
  display: flex;
  z-index: 1;
  flex-direction: row;
  gap: 0.75rem;
  align-items: center;
  background: white;
`;

export const InfoSection = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  overflow: hidden;
`;

export const TitleLabel = styled.h3`
  font-size: 1rem;
  font-weight: normal;
  color: #000000;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const SubtitleLabel = styled.span`
  font-size: 0.85rem;
  color: #3d3d3d;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const OptionsSection = styled.div`
  display: flex;
  gap: 1rem;
`;
