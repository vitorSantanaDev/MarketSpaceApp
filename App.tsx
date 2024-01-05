import { StatusBar } from "react-native";
import { ThemeProvider } from "styled-components/native";

import {
  useFonts,
  Karla_700Bold,
  Karla_400Regular,
} from "@expo-google-fonts/karla";

import { Loading } from "@components/Loading";

import { theme } from "@theme/index";
import { Routes } from "@routes/index";
import { AuthContextProvider } from "@contexts/Auth/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </ThemeProvider>
  );
}
