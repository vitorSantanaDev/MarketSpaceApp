import { ActivityIndicator, View } from "react-native";
import { useTheme } from "styled-components/native";

export function Loading() {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.gray_6,
      }}
    >
      <ActivityIndicator size="large" color={colors.blue} />
    </View>
  );
}
