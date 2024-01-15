import { Pressable } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(Pressable)<{ $isSelected: boolean }>`
  ${({ theme, $isSelected }) => css`
    padding: 6px 16px;
    border-radius: 44px;
    background-color: ${theme.colors.gray_5};

    ${$isSelected &&
    css`
      gap: 6px;
      padding: 6px 6px 6px 12px;
      flex-direction: row;
      align-items: center;
      background-color: ${theme.colors.blue_light};
    `}
  `}
`;

export const Label = styled.Text<{ $isSelected: boolean }>`
  ${({ theme, $isSelected }) => css`
    text-transform: uppercase;
    font-family: ${theme.fonts.weights.Bold};
    font-size: ${theme.fonts.sizes.xsmall}px;
    color: ${$isSelected ? theme.colors.gray_7 : theme.colors.gray_3};
  `}
`;
