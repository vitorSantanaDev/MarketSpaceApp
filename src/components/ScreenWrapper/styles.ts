import { SafeAreaView, StatusBar } from "react-native";
import styled from "styled-components/native";
import { ScreenWrapperBgColorType } from "./types";

interface IProps {
  backgroundColor: ScreenWrapperBgColorType;
}

const statusBarHeight = StatusBar.currentHeight || 0;

export const SafeArea = styled(SafeAreaView)<IProps>`
  flex: 1;
  padding-top: ${statusBarHeight}px;
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
`;

export const ScrollView = styled.ScrollView.attrs<IProps>({
  contentContainerStyle: {
    minHeight: "100%",
  },
})`
  background-color: ${({ theme, backgroundColor }) =>
    theme.colors[backgroundColor]};
`;
