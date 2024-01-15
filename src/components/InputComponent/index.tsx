import { View, Pressable, ViewStyle, TextInputProps } from "react-native";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

type InputComponentProps = TextInputProps & {
  style?: ViewStyle;
  secureTextEntry?: boolean;
  errorMessage?: string;
};

export function InputComponent({
  style,
  errorMessage,
  secureTextEntry,
  ...restTextInputProps
}: InputComponentProps) {
  const { colors } = useTheme();
  const [isPasswordVisible, setIsPasswordVisible] = useState(!!secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);

  function handleFocus() {
    setIsFocused(true);
  }

  function handleBlur() {
    setIsFocused(false);
  }

  function handleTogglePasswordVisibility() {
    setIsPasswordVisible((prevState) => !prevState);
  }

  const inputFocusedStyle =
    isFocused || errorMessage
      ? {
          borderColor: errorMessage ? colors.red_light : colors.blue_light,
          borderWidth: 1,
        }
      : {};

  return (
    <View>
      <S.InputContainer style={[style, inputFocusedStyle]}>
        <S.Input
          onBlur={handleBlur}
          onFocus={handleFocus}
          secureTextEntry={isPasswordVisible}
          placeholderTextColor={colors.gray_4}
          {...restTextInputProps}
        />
        {secureTextEntry && (
          <Pressable
            hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}
            onPress={handleTogglePasswordVisibility}
          >
            {isPasswordVisible ? (
              <Eye size={20} color={colors.gray_3} />
            ) : (
              <EyeSlash size={20} color={colors.gray_3} />
            )}
          </Pressable>
        )}
      </S.InputContainer>
      {!!errorMessage && <S.ErrorMessage>{errorMessage}</S.ErrorMessage>}
    </View>
  );
}
