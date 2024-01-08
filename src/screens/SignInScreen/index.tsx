import { useState } from "react";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Toast from "react-native-toast-message";

import { Button } from "@components/Button";
import { ScreenWrapper } from "@components/ScreenWrapper";
import { InputComponent } from "@components/InputComponent";

import { AppError } from "@utils/app-error";
import { signInSchema } from "./signInSchema";
import { EToasterType } from "@components/ToastWrapper";
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
        : "Ocorreu um erro ao tentar fazer login.";

      Toast.show({ type: EToasterType.APP_INFO_ERROR, text1: message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScreenWrapper scrollViewProps={{ scrollEnabled: false }}>
      <S.Container>
        <S.LoginSection>
          <Logo style={{ alignSelf: "center" }} />
          <S.Subtitle>Seu espaço de compra e venda</S.Subtitle>
          <S.AccessAcountSectionTitle>
            Acesse sua conta
          </S.AccessAcountSectionTitle>
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
            isLoading={isLoading}
            onPress={handleSubmit(handleSignIn)}
            style={{ marginTop: 32 }}
            label="Entrar"
            labelStyle={{ color: "gray_7" }}
          />
        </S.LoginSection>
        <S.RegisterSection>
          <S.Subtitle style={{ marginBottom: 16, textAlign: "center" }}>
            Ainda não tem conta?
          </S.Subtitle>
          <Button
            bgColor="gray_5"
            label="Cadastre-se"
            labelStyle={{ color: "gray_2" }}
            onPress={() => navigation.navigate("SIGN_UP")}
          />
        </S.RegisterSection>
      </S.Container>
    </ScreenWrapper>
  );
}
