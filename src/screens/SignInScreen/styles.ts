import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: space-between;
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    margin-bottom: 76.76px;
    color: ${theme.colors.gray_3};
    font-size: ${theme.fonts.sizes.small}px;
    font-family: ${theme.fonts.weights.Regular};
  `}
`;

export const LoginSection = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding-top: 65px;
    padding-bottom: 68px;
    padding-right: 48px;
    padding-left: 48px;
    border-bottom-left-radius: 24px;
    border-bottom-right-radius: 24px;
    background-color: ${theme.colors.gray_6};
  `}
`;

export const RegisterSection = styled.View`
  ${({ theme }) => css`
    width: 100%;
    padding-top: 56px;
    padding-bottom: 68px;
    padding-right: 48px;
    padding-left: 48px;
    background-color: ${theme.colors.gray_7};
  `}
`;

export const AccessAcountSectionTitle = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    color: ${theme.colors.gray_2};
    font-size: ${theme.fonts.sizes.small}px;
    font-family: ${theme.fonts.weights.Regular};
    margin-bottom: 16px;
  `}
`;
