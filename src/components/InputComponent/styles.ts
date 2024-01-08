import { TextInput } from "react-native";
import styled from "styled-components/native";
import { css } from "styled-components/native";

export const InputContainer = styled.View`
  width: 100%;
  height: 45px;
  padding: 12px 16px;
  border-radius: 6px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.gray_7};
`;

export const Input = styled(TextInput)`
  ${({ theme }) => css`
    flex: 1;
    color: ${theme.colors.gray_2};
    font-size: ${theme.fonts.sizes.medium}px;
    font-family: ${theme.fonts.weights.Regular};
  `}
`;

export const ErrorMessage = styled.Text`
  ${({ theme }) => css`
    margin-top: 4px;
    text-align: left;
    align-self: flex-start;
    color: ${theme.colors.red_light};
    font-size: ${theme.fonts.sizes.small}px;
    font-family: ${theme.fonts.weights.Regular};
  `}
`;
