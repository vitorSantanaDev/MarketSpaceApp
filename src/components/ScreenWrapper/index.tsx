import React, { Ref } from "react";
import {
  ScrollView,
  ScrollViewProps,
  KeyboardAvoidingView,
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
    scrollViewProps,
    disableScrollView,
    safeAreaViewProps,
    backgroundColor = "gray_7",
  }: IScreenWrapperProps,
  ref: Ref<ScrollView>
) {
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
        <KeyboardAvoidingView style={{ flex: 1 }}>
          {children}
        </KeyboardAvoidingView>
      </S.ScrollView>
    </S.SafeArea>
  );
});

export { ScreenWrapper };
