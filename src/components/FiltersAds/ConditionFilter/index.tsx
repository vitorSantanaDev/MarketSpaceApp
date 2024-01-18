import { PressableProps } from "react-native";
import { useTheme } from "styled-components/native";
import { XCircle } from "phosphor-react-native";

import * as S from "./styles";

type ConditionFilterProps = PressableProps & {
  label: string;
  isSelected: boolean;
};

export function ConditionFilter({
  label,
  isSelected,
  ...restPressableProps
}: ConditionFilterProps) {
  const { colors } = useTheme();

  return (
    <S.Container
      children={({ pressed }) => (
        <>
          <S.Label style={pressed && { opacity: 0.7 }} $isSelected={isSelected}>
            {label}
          </S.Label>
          {isSelected && (
            <XCircle
              style={pressed && { opacity: 0.7 }}
              color={colors.gray_6}
              size={16}
              weight="bold"
            />
          )}
        </>
      )}
      $isSelected={isSelected}
      {...restPressableProps}
    />
  );
}
