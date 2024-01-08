import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  padding-bottom: 48px;
  padding-left: 48px;
  padding-right: 48px;
  background-color: ${({ theme }) => theme.colors.gray_6};
`;

export const WelcomeSection = styled.View`
  align-items: center;
  justify-content: center;
`;

export const WelcomeTitle = styled.Text`
  ${({ theme }) => css`
    font-size: 20px;
    text-align: center;
    color: ${theme.colors.gray_1};
    font-family: ${theme.fonts.weights.Bold};
    margin-bottom: 8px;
    margin-top: 12px;
  `}
`;

export const RegisterForm = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
  margin-top: 32px;
`;

export const AlreadyHaveAccount = styled.View`
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const UserPhoto = styled.Image`
  width: 88px;
  height: 88px;
  border-width: 2px;
  border-radius: ${88 / 2}px;
  border-color: ${({ theme }) => theme.colors.blue_light};
`;

export const EditIconWrapper = styled.View`
  width: 40px;
  height: 40px;
  border-radius: ${40 / 2}px;
  background-color: ${({ theme }) => theme.colors.blue_light};
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
`;

export const Subtitle = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    max-width: 279px;
    font-size: ${theme.fonts.sizes.small}px;
    color: ${theme.colors.gray_2};
    font-family: ${theme.fonts.weights.Regular};
  `}
`;

export const ButtonWrapper = styled.View`
  flex-direction: row;
`;
