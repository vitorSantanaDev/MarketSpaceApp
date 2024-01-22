import { Image, View } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(View)<{ size: number }>`
  ${({ theme, size }) => css`
    border-width: 1px;
    border-radius: ${size / 2}px;
    border-color: ${theme.colors.gray_7};
  `}
`;

export const Photo = styled(Image)<{ size: number }>`
  ${({ size }) => css`
    width: ${size}px;
    height: ${size}px;
    border-radius: ${size / 2}px;
  `}
`;
