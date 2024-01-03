import React, { Ref, useCallback } from "react";
import {
  Keyboard,
  ScrollView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

import { IScreenWrapperProps } from "./types";

import * as S from "./styles";

import { theme } from "@theme/index";
import { ReactNode } from "react";
import { ScrollViewProps } from "react-native";
import { SafeAreaViewProps } from "react-native-safe-area-context";

export type ScreenWrapperBgColorType = keyof typeof theme.colors;

export interface IScreenWrapperProps {
  children: ReactNode;
  backgroundColor?: ScreenWrapperBgColorType;
  disableScrollView?: boolean;
  scrollViewProps?: ScrollViewProps;
  safeAreaViewProps?: SafeAreaViewProps;
}

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
