import { Switch, SwitchProps } from "react-native";
import { useTheme } from "styled-components/native";

type SwitchComponentProps = SwitchProps;

export function SwitchComponent({ ...restSwitchProps }: SwitchComponentProps) {
  const { colors } = useTheme();
  return (
    <Switch
      thumbColor={colors.gray_7}
      trackColor={{ false: colors.gray_5, true: colors.blue_light }}
      {...restSwitchProps}
    />
  );
}
