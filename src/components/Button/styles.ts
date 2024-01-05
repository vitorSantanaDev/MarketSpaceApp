import { theme } from "@theme/index";
import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";

export type BgColorType = keyof typeof theme.colors;

export const ButtonComponent = styled(Pressable)<{ bgColor: BgColorType }>`
  ${({ theme, bgColor, disabled }) => css`
    max-width: 100%;
    min-width: 100%;
    align-items: center;
    justify-content: center;
    padding-top: 12px;
    padding-bottom: 12px;
    border-radius: 6px;
    flex-direction: row;
    gap: 10px;
    background-color: ${theme.colors[bgColor]};
    ${disabled &&
    css`
      opacity: 0.7;
    `}
  `}
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.small}px;
    font-family: ${theme.fonts.weights.Bold};
  `}
`;
