import { useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { PencilSimpleLine } from "phosphor-react-native";

import { Button } from "@components/Button";
import { ScreenWrapper } from "@components/ScreenWrapper";
import { InputComponent } from "@components/InputComponent";

import Logo from "@assets/logo.svg";
import Avatar from "@assets/Avatar.png";

import * as S from "./styles";

export function SignUpScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const [userPhoto] = useState<string>(
    "https://github.com/vitorSantanaDev.png"
  );

  return (
    <ScreenWrapper scrollViewProps={{ bounces: false }}>
      <View style={S.SignUpScreenStylesSheet.container}>
        <View style={S.SignUpScreenStylesSheet.welcomeSection}>
          <Logo width={60} height={40} />
          <Text style={S.SignUpScreenStylesSheet.welcomeTitle}>
            Boas Vindas!
          </Text>
          <S.TextStyled>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </S.TextStyled>
        </View>
        <View style={S.SignUpScreenStylesSheet.registerForm}>
          <Pressable style={{ position: "relative" }}>
            {!!userPhoto ? (
              <Image
                style={S.SignUpScreenStylesSheet.userPhoto}
                source={{ uri: userPhoto }}
              />
            ) : (
              <Image
                style={[
                  S.SignUpScreenStylesSheet.userPhoto,
                  { borderWidth: 0 },
                ]}
                source={Avatar}
              />
            )}
            <View style={S.SignUpScreenStylesSheet.editIconWrapper}>
              <PencilSimpleLine size={16} color={colors.gray_7} />
            </View>
          </Pressable>
          <InputComponent placeholder="Nome" />
          <InputComponent placeholder="E-mail" />
          <InputComponent placeholder="Telefone" />
          <InputComponent secureTextEntry placeholder="Senha" />
          <InputComponent secureTextEntry placeholder="Confirmar senha" />
          <Button bgColor="gray_1" label="Criar" />
        </View>
        <View style={S.SignUpScreenStylesSheet.alreadyHaveAccount}>
          <S.TextStyled>Já tem uma conta?</S.TextStyled>
          <Button
            bgColor="gray_5"
            label="Ir para o login"
            labelStyle={{ color: "gray_2" }}
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </ScreenWrapper>
  );
}
