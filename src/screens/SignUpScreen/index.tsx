import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Pressable } from "react-native";
import { useTheme } from "styled-components/native";
import { useNavigation } from "@react-navigation/native";
import { PencilSimpleLine } from "phosphor-react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import Toast from "react-native-toast-message";

import { Button } from "@components/Button";
import { ScreenWrapper } from "@components/ScreenWrapper";
import { InputComponent } from "@components/InputComponent";

import Logo from "@assets/logo.svg";
import Avatar from "@assets/Avatar.png";

import { api } from "@services/api";
import { AppError } from "@utils/app-error";
import { signUpSchema } from "./signUpSchema";
import { EToasterType } from "@components/ToastWrapper";
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
          Toast.show({
            type: EToasterType.APP_INFO_ERROR,
            text1: "Foto muito grande, selecione uma foto de até 5MB",
          });

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
      Toast.show({
        type: EToasterType.APP_INFO_ERROR,
        text1: "Ocorreu um erro ao tentar selecionar a foto, tente novamente",
      });
    }
  }

  async function handleSignUp(data: SignUpFormFieldsProps) {
    try {
      setIsLoading(true);
      if (!userPhotoSelected) {
        Toast.show({
          type: EToasterType.APP_INFO_WARNING,
          text1: "Selecione uma foto de perfil",
        });
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

      Toast.show({
        type: EToasterType.APP_INFO_SUCCESS,
        text1: "Conta criada com sucesso!",
      });

      await signIn({ email: data.email, password: data.password });
    } catch (error) {
      const isAppError = error instanceof AppError;

      const message = isAppError
        ? error.message
        : "Ocorreu um erro ao tentar criar sua conta. Tente novamente mais tarde.";

      Toast.show({ type: EToasterType.APP_INFO_ERROR, text1: message });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <ScreenWrapper>
      <S.Container>
        <S.WelcomeSection>
          <Logo width={60} height={40} />
          <S.WelcomeTitle>Boas Vindas!</S.WelcomeTitle>
          <S.Subtitle>
            Crie sua conta e use o espaço para comprar itens variados e vender
            seus produtos
          </S.Subtitle>
        </S.WelcomeSection>
        <S.RegisterForm>
          <Pressable
            onPress={handleUserPhotoSelect}
            style={{ position: "relative" }}
          >
            {!!userPhotoSelected && userPhotoSelected.uri ? (
              <S.UserPhoto
                resizeMode="cover"
                source={{ uri: userPhotoSelected.uri }}
              />
            ) : (
              <S.UserPhoto style={{ borderWidth: 0 }} source={Avatar} />
            )}
            <S.EditIconWrapper>
              <PencilSimpleLine size={16} color={colors.gray_7} />
            </S.EditIconWrapper>
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
          <S.ButtonWrapper>
            <Button
              isLoading={isLoading}
              onPress={handleSubmit(handleSignUp)}
              bgColor="gray_1"
              label="Criar"
            />
          </S.ButtonWrapper>
        </S.RegisterForm>
        <S.AlreadyHaveAccount>
          <S.Subtitle>Já tem uma conta?</S.Subtitle>
          <S.ButtonWrapper>
            <Button
              bgColor="gray_5"
              label="Ir para o login"
              labelStyle={{ color: "gray_2" }}
              onPress={() => navigation.goBack()}
            />
          </S.ButtonWrapper>
        </S.AlreadyHaveAccount>
      </S.Container>
    </ScreenWrapper>
  );
}
