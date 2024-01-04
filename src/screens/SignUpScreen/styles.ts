import { theme } from "@theme/index";
import { StyleSheet } from "react-native";
import styled, { css } from "styled-components/native";

export const SignUpScreenStylesSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 20,
    paddingBottom: 48,
    paddingHorizontal: 48,
    backgroundColor: theme.colors.gray_6,
  },
  welcomeSection: {
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeTitle: {
    fontSize: 20,
    textAlign: "center",
    color: theme.colors.gray_1,
    fontFamily: theme.fonts.weights.Bold,
    marginBottom: 8,
    marginTop: 12,
  },
  registerForm: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  alreadyHaveAccount: {
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  userPhoto: {
    width: 88,
    height: 88,
    borderWidth: 2,
    borderRadius: 88 / 2,
    resizeMode: "cover",
    borderColor: theme.colors.blue_light,
  },
  editIconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    backgroundColor: theme.colors.blue_light,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
});

export const TextStyled = styled.Text`
  ${({ theme }) => css`
    text-align: center;
    max-width: 279px;
    font-size: ${theme.fonts.sizes.small}px;
    color: ${theme.colors.gray_2};
    font-family: ${theme.fonts.weights.Regular};
  `}
`;
