import React, { Ref, useCallback } from "react";
import {
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollViewProps,
} from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

import { theme } from "@theme/index";

import * as S from "./styles";

export type ScreenWrapperBgColorType = keyof typeof theme.colors;

type IScreenWrapperProps = {
  children: React.ReactNode;
  backgroundColor?: ScreenWrapperBgColorType;
  disableScrollView?: boolean;
  scrollViewProps?: ScrollViewProps;
  safeAreaViewProps?: SafeAreaViewProps;
};

const ScreenWrapper = React.forwardRef(function ScreenWrapperComponent(
  {
    children,
    backgroundColor = "gray_7",
    disableScrollView,
    safeAreaViewProps,
    scrollViewProps,
  }: IScreenWrapperProps,
  ref: Ref<ScrollView>
) {
  const handleCloseKeyboard = useCallback(() => {
    Keyboard.dismiss();
  }, []);

  if (disableScrollView)
    return (
      <S.SafeArea backgroundColor={backgroundColor} {...safeAreaViewProps}>
        {children}
      </S.SafeArea>
    );

  return (
    <S.SafeArea backgroundColor={backgroundColor} {...safeAreaViewProps}>
      <S.ScrollView
        ref={ref}
        backgroundColor={backgroundColor}
        showsVerticalScrollIndicator={false}
        {...scrollViewProps}
      >
        <TouchableWithoutFeedback
          onPressOut={handleCloseKeyboard}
          style={{ flex: 1 }}
        >
          <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
            {children}
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </S.ScrollView>
    </S.SafeArea>
  );
});

export { ScreenWrapper };
