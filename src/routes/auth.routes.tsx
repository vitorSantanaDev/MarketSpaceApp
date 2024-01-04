import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";

import { SignInScreen } from "@screens/SignInScreen";
import { SignUpScreen } from "@screens/SignUpScreen";

type AuthRoutes = {
  SIGN_IN: undefined;
  SIGN_UP: undefined;
};

export type AuthNavigatorRoutesProps = NativeStackNavigationProp<AuthRoutes>;

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>();

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="SIGN_IN" component={SignInScreen} />
      <Screen name="SIGN_UP" component={SignUpScreen} />
    </Navigator>
  );
}
