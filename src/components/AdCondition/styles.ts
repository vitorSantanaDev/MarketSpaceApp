import { theme } from "@theme/index";
import styled, { css } from "styled-components/native";

export type Colors = keyof typeof theme.colors;

type ContainerProps = {
  bgColor: Colors;
};

export const Container = styled.View<ContainerProps>`
  padding: 2px 8px;
  max-height: 17px;
  justify-content: center;
  align-items: center;
  border-radius: 44px;
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor]};
`;

type LabelProps = {
  color: Colors;
};

export const Label = styled.Text<LabelProps>`
  ${({ theme, color }) => css`
    font-size: ${theme.fonts.sizes.xsmall - 2}px;
    font-family: ${theme.fonts.weights.Bold};
    color: ${theme.colors[color]};
    text-transform: uppercase;
  `}
`;
