import React from "react";

import Toast, {
  ToastConfig,
  ToastConfigParams,
} from "react-native-toast-message";

import * as S from "./styles";

export type IToastOption<Props> = ToastConfigParams<Props>;

export enum EToasterType {
  SUCCESS = "success",
  ERROR = "error",
  APP_INFO_SUCCESS = "appInfoSuccess",
  APP_INFO_ERROR = "appInfoError",
  APP_INFO_WARNING = "appInfoWarning",
}

const toastConfig: ToastConfig = {
  appInfoSuccess: (options: IToastOption<object>) => {
    const { text1 } = options;
    return (
      <S.ToastInfoSuccessWrapper>
        <S.Text>{text1}</S.Text>
      </S.ToastInfoSuccessWrapper>
    );
  },
  appInfoError: (options: IToastOption<object>) => {
    const { text1 } = options;
    return (
      <S.ToastInfoErrorWrapper>
        <S.Text>{text1}</S.Text>
      </S.ToastInfoErrorWrapper>
    );
  },
  appInfoWarning: (options: IToastOption<object>) => {
    const { text1 } = options;
    return (
      <S.ToastInfoWarningWrapper>
        <S.WarningText>{text1}</S.WarningText>
      </S.ToastInfoWarningWrapper>
    );
  },
};

const ToasterWrapper = () => {
  return <Toast config={toastConfig} />;
};

export default ToasterWrapper;
