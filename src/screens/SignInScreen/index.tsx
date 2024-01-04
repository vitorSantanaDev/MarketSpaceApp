import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Button } from "@components/Button";
import { ScreenWrapper } from "@components/ScreenWrapper";
import { InputComponent } from "@components/InputComponent";

import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import Logo from "@assets/logo_with_name.svg";

import * as S from "./styles";

export function SignInScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  return (
    <ScreenWrapper scrollViewProps={{ bounces: false }}>
      <View style={S.SignInScreenStylesSheet.container}>
        <View style={S.SignInScreenStylesSheet.loginSection}>
          <Logo />
          <Text style={S.SignInScreenStylesSheet.subtitle}>
            Seu espaço de compra e venda
          </Text>
          <Text style={S.SignInScreenStylesSheet.accessAcountSectionTitle}>
            Acesse sua conta
          </Text>
          <InputComponent style={{ marginBottom: 16 }} placeholder="E-mail" />
          <InputComponent secureTextEntry placeholder="Senha" />

          <Button
            style={{ marginTop: 32 }}
            label="Entrar"
            labelStyle={{ color: "gray_7" }}
          />
        </View>
        <View style={S.SignInScreenStylesSheet.registerSection}>
          <Text
            style={[S.SignInScreenStylesSheet.subtitle, { marginBottom: 16 }]}
          >
            Ainda não tem conta?
          </Text>
          <Button
            bgColor="gray_5"
            label="Cadastre-se"
            labelStyle={{ color: "gray_2" }}
            onPress={() => navigation.navigate("SIGN_UP")}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
