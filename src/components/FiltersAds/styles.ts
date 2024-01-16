import styled, { css } from "styled-components/native";

export const SearchInputContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding-right: 16px;
  background-color: ${({ theme }) => theme.colors.gray_7};
`;

export const FilterActionsContainer = styled.View`
  gap: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Divider = styled.View`
  width: 1px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.gray_4};
`;

export const ModalContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.6);
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  height: 75%;
  min-height: 75%;
  padding: 32px 24px 64px 24px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: ${({ theme }) => theme.colors.gray_6};
`;

export const ModalDivider = styled.View`
  height: 4px;
  width: 56px;
  border-radius: 2px;
  align-self: center;
  margin-bottom: 32px;
  background-color: ${({ theme }) => theme.colors.gray_4};
`;

export const ModalHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ModalTitle = styled.Text`
  ${({ theme }) => css`
    text-align: left;
    color: ${theme.colors.gray_1};
    font-size: ${theme.fonts.sizes.large}px;
    font-family: ${theme.fonts.weights.Bold};
  `}
`;

export const SectionTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray_2};
    font-family: ${theme.fonts.weights.Bold};
    font-size: ${theme.fonts.sizes.small}px;
  `}
`;

export const ConditionTagsContainer = styled.View`
  gap: 8px;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 12px;
  margin-bottom: 24px;
`;

export const AcceptedPaymentMethodsContainer = styled.View`
  gap: 12px;
  margin-top: 13px;
  margin-bottom: 25px;
`;

export const AcceptedPaymentMethodsLabel = styled.Text`
  ${({ theme }) => css`
    color: ${theme.colors.gray_2};
    font-family: ${theme.fonts.weights.Regular};
    font-size: ${theme.fonts.sizes.medium}px;
  `}
`;

export const AcceptedPaymentMethodsRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 11px;
`;

export const ButtonActionsContainer = styled.View`
  gap: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  justify-self: flex-end;
  background-color: ${({ theme }) => theme.colors.gray_6};
  padding: 24px;
`;
