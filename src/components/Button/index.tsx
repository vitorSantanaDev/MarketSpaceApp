import { PressableProps, TextStyle } from "react-native";
import { useTheme } from "styled-components/native";

import * as S from "./styles";

type ButtonProps = PressableProps & {
  label: string;
  bgColor?: S.BgColorType;
  Icon?: () => React.JSX.Element;
  labelStyle?: TextStyle & { color: S.BgColorType };
};

export function Button({
  Icon,
  label,
  labelStyle,
  bgColor = "blue_light",
  ...restButtonProps
}: ButtonProps) {
  const { colors } = useTheme();

  const labelStyleWidthColorDefaultAdded = {
    ...labelStyle,
    color: labelStyle ? colors[labelStyle?.color] : colors.gray_7,
  };

  return (
    <S.ButtonComponent
      children={({ pressed }) => (
        <>
          {Icon && <Icon />}
          <S.Label
            style={{
              ...labelStyleWidthColorDefaultAdded,
              ...(pressed ? { opacity: 0.7 } : {}),
            }}
          >
            {label}
          </S.Label>
        </>
      )}
      bgColor={bgColor}
      {...restButtonProps}
    />
  );
}
