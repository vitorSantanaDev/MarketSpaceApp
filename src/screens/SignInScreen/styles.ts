import { StyleSheet } from "react-native";
import { theme } from "@theme/index";

export const SignInScreenStylesSheet = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  subtitle: {
    marginBottom: 76.76,
    color: theme.colors.gray_3,
    fontSize: theme.fonts.sizes.small,
    fontFamily: theme.fonts.weights.Regular,
  },
  loginSection: {
    flex: 1,
    paddingTop: 65,
    paddingBottom: 68,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 48,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    backgroundColor: theme.colors.gray_6,
  },
  registerSection: {
    flex: 1,
    paddingTop: 56,
    paddingBottom: 68,
    paddingHorizontal: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.gray_7,
  },
  accessAcountSectionTitle: {
    color: theme.colors.gray_2,
    fontSize: theme.fonts.sizes.small,
    fontFamily: theme.fonts.weights.Regular,
    marginBottom: 16,
  },
});
