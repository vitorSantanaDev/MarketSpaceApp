import { theme } from "@theme/index";
import { StyleSheet } from "react-native";

export const InputComponentStylesSheet = StyleSheet.create({
  inputContainer: {
    width: "100%",
    height: 45,
    backgroundColor: theme.colors.gray_7,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    color: theme.colors.gray_2,
    fontSize: theme.fonts.sizes.medium,
    fontFamily: theme.fonts.weights.Regular,
  },
  errorMessage: {
    marginTop: 4,
    textAlign: "left",
    alignSelf: "flex-start",
    color: theme.colors.red_light,
    fontSize: theme.fonts.sizes.small,
    fontFamily: theme.fonts.weights.Regular,
  },
});
