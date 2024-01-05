import { useState } from "react";
import { Alert, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller, set } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button } from "@components/Button";
import { ScreenWrapper } from "@components/ScreenWrapper";
import { InputComponent } from "@components/InputComponent";

import { AppError } from "@utils/app-error";
import { signInSchema } from "./signInSchema";
import { useAuthContext } from "@contexts/Auth/AuthContext";
import { AuthNavigatorRoutesProps } from "@routes/auth.routes";

import Logo from "@assets/logo_with_name.svg";

import * as S from "./styles";

type SignInFormFieldsProps = {
  email: string;
  password: string;
};

export function SignInScreen() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuthContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormFieldsProps>({ resolver: yupResolver(signInSchema) });

  async function handleSignIn(payload: SignInFormFieldsProps) {
    try {
      setIsLoading(true);
      await signIn({ ...payload });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const message = isAppError
        ? error.message
        : "Ocorreu um erro ao tentar criar sua conta. Tente novamente mais tarde.";

      Alert.alert(message);
    } finally {
      setIsLoading(false);
    }
  }

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
          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                style={{ marginBottom: 16 }}
                autoCapitalize="none"
                placeholder="E-mail"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.email?.message}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                secureTextEntry
                placeholder="Senha"
                autoCapitalize="none"
                onChangeText={onChange}
                value={value}
                errorMessage={errors.password?.message}
              />
            )}
          />
          <Button
            onPress={handleSubmit(handleSignIn)}
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
