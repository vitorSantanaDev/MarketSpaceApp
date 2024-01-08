import styled from "styled-components/native";

export const Toast = styled.View`
  width: 60%;
  border-radius: 3px;
  padding: 8px;
`;

export const ToastInfoSuccessWrapper = styled(Toast)`
  background-color: ${({ theme }) => theme.colors.green};
`;

export const ToastInfoWarningWrapper = styled(Toast)`
  background-color: ${({ theme }) => theme.colors.yellow};
`;

export const ToastInfoErrorWrapper = styled(Toast)`
  background-color: ${({ theme }) => theme.colors.red_light};
`;

export const Text = styled.Text`
  font-size: 12px;
  font-family: ${({ theme }) => theme.fonts.weights.Bold};
  text-transform: capitalize;
  text-align: center;
  color: ${({ theme }) => theme.colors.gray_7};
`;

export const WarningText = styled(Text)`
  color: ${({ theme }) => theme.colors.gray_2};
`;
