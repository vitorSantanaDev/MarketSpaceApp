import {
  View,
  TextInput,
  Pressable,
  ViewStyle,
  StyleProp,
  TextInputProps,
  Text,
} from "react-native";
import { useState } from "react";
import { Eye, EyeSlash } from "phosphor-react-native";
import { useTheme } from "styled-components/native";

import { InputComponentStylesSheet } from "./styles";

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
    <View style={style}>
      <View
        style={[InputComponentStylesSheet.inputContainer, inputFocusedStyle]}
      >
        <TextInput
          onBlur={handleBlur}
          onFocus={handleFocus}
          secureTextEntry={isPasswordVisible}
          style={InputComponentStylesSheet.input}
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
      </View>
      {!!errorMessage && (
        <Text style={InputComponentStylesSheet.errorMessage}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
}
