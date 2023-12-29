import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from "@expo-google-fonts/karla";

import { theme } from "@theme/index";
import { Loading } from "@components/Loading";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {fontsLoaded ? <></> : <Loading />}
    </ThemeProvider>
  );
}
