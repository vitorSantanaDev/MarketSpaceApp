import { Fragment } from "react";
import {
  ActivityIndicator,
  PressableProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from "react-native";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

type ButtonProps = PressableProps & {
  label: string;
  style?: StyleProp<ViewStyle>;
  isLoading?: boolean;
  bgColor?: S.BgColorType;
  Icon?: () => React.JSX.Element;
  labelStyle?: TextStyle & { color: S.BgColorType };
};

export function Button({
  Icon,
  label,
  disabled,
  isLoading,
  labelStyle,
  style,
  bgColor = "blue_light",
  ...restButtonProps
}: ButtonProps) {
  const { colors } = useTheme();

  const labelStyleWidthColorDefaultAdded = {
    ...labelStyle,
    color: labelStyle?.color ? colors[labelStyle?.color] : colors.gray_7,
  };

  return (
    <S.ButtonComponent
      disabled={disabled || isLoading}
      children={({ pressed }) => (
        <Fragment>
          {isLoading ? (
            <ActivityIndicator color={labelStyleWidthColorDefaultAdded.color} />
          ) : (
            <Fragment>
              {Icon && <Icon />}
              <S.Label
                style={{
                  ...labelStyleWidthColorDefaultAdded,
                  ...(pressed ? { opacity: 0.7 } : {}),
                }}
              >
                {label}
              </S.Label>
            </Fragment>
          )}
        </Fragment>
      )}
      bgColor={bgColor}
      {...restButtonProps}
      style={[
        style,
        Icon && { flexDirection: "row", gap: 8, alignItems: "center" },
      ]}
    />
  );
}
