import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { PencilSimpleLine } from "phosphor-react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { Button } from "@components/Button";
import { ScreenWrapper } from "@components/ScreenWrapper";
import { InputComponent } from "@components/InputComponent";

import Logo from "@assets/logo.svg";
import Avatar from "@assets/Avatar.png";

import { api } from "@services/api";
import { AppError } from "@utils/app-error";
import { signUpSchema } from "./signUpSchema";
import { useAuthContext } from "@contexts/Auth/AuthContext";

import * as S from "./styles";

type SignUpFormFieldsProps = {
  email: string;
  name: string;
  phone: string;
  password: string;
  password_confirmation: string;
};

export function SignUpScreen() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFieldsProps>({ resolver: yupResolver(signUpSchema) });

  const [userPhotoSelected, setUserPhotoSelected] = useState<
    | {
        uri: string;
        type: string;
        fileExtension: string;
      }
    | undefined
  >(undefined);

  const { signIn } = useAuthContext();

  const [isLoading, setIsLoading] = useState(false);

  async function handleUserPhotoSelect() {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) return;

      const file = photoSelected.assets[0];

      if (file.uri) {
        const photoInfo = await FileSystem.getInfoAsync(file.uri);

        if (photoInfo.exists && photoInfo.size / 1024 / 1024 > 5) {
          Alert.alert("Foto muito grande, selecione uma foto menor que 5MB");
          return;
        }

        const fileExtension = file.uri.split(".").pop();

        if (fileExtension) {
          setUserPhotoSelected({
            fileExtension,
            uri: file.uri,
            type: `${file.type}/${fileExtension}`,
          });
        }
      }
    } catch (error) {
      console.log({ error });
    }
  }

  async function handleSignUp(data: SignUpFormFieldsProps) {
    try {
      setIsLoading(true);
      if (!userPhotoSelected) {
        Alert.alert("Selecione uma foto de perfil");
        return;
      }

      const userData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (key === "password_confirmation") return;

        if (key === "phone") {
          userData.append("tel", value);
          return;
        }

        userData.append(key, value);
      });

      const userPhotoFile = {
        name: `${data.name}.${userPhotoSelected.fileExtension}`
          .toLowerCase()
          .replace(" ", "_"),
        type: userPhotoSelected.type,
        uri: userPhotoSelected.uri,
      } as any;

      userData.append("avatar", userPhotoFile);

      await api.post("/users", userData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      await signIn({ email: data.email, password: data.password });
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
          <Pressable
            onPress={handleUserPhotoSelect}
            style={{ position: "relative" }}
          >
            {!!userPhotoSelected && userPhotoSelected.uri ? (
              <Image
                style={S.SignUpScreenStylesSheet.userPhoto}
                source={{ uri: userPhotoSelected.uri }}
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
          <Controller
            name="name"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                value={value}
                placeholder="Nome"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                value={value}
                autoCapitalize="none"
                placeholder="E-mail"
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                value={value}
                autoCapitalize="none"
                placeholder="Telefone"
                keyboardType="phone-pad"
                onChangeText={onChange}
                errorMessage={errors.phone?.message}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                value={value}
                placeholder="Senha"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Controller
            name="password_confirmation"
            control={control}
            render={({ field: { value, onChange } }) => (
              <InputComponent
                value={value}
                secureTextEntry
                placeholder="Confirmar senha"
                autoCapitalize="none"
                onChangeText={onChange}
                errorMessage={errors.password_confirmation?.message}
              />
            )}
          />

          <Button
            isLoading={isLoading}
            onPress={handleSubmit(handleSignUp)}
            bgColor="gray_1"
            label="Criar"
          />
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
