import { View } from "react-native";
import { useTheme } from "styled-components/native";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import { Loading } from "@components/Loading";

import { AuthRoutes } from "./auth.routes";
import { useAuthContext } from "@contexts/Auth/AuthContext";

export function Routes() {
  const { colors } = useTheme();
  const { loadingUserData } = useAuthContext();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray_7;

  if (loadingUserData) {
    return <Loading />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.gray_7 }}>
      <NavigationContainer theme={theme}>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  );
}
