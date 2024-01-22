import { Image, Pressable } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled(Pressable)`
  ${() => css`
    gap: 4px;
  `}
`;

export const ProductDescription = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.small}px;
    font-family: ${theme.fonts.weights.Regular};
    color: ${theme.colors.gray_2};
    line-height: 16px;
  `}
`;

export const ProductPrice = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.medium}px;
    font-family: ${theme.fonts.weights.Bold};
    color: ${theme.colors.gray_1};
    line-height: 16px;
  `}
`;
export const Currency = styled(ProductPrice)`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xsmall - 2}px;
    margin-right: 2px;
  `}
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const PhotoContainer = styled.View`
  max-width: 153.5px;
  position: relative;
`;

export const PhotoContainerHeader = styled.View`
  width: 100%;
  padding: 4px 4px;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  z-index: 1;
`;

export const AdPhoto = styled(Image).attrs(() => ({
  maxWidth: 153.5,
  minHeight: 100,
  borderRadius: 6,
}))``;
