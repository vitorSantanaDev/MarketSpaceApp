import { useState } from "react";
import { Pressable } from "react-native";
import { useTheme } from "styled-components/native";
import { Square, CheckSquare } from "phosphor-react-native";

type CheckboxProps = {
  isChecked: boolean;
  onCheck: (checked: boolean) => void;
};

export function Checkbox({ onCheck, isChecked }: CheckboxProps) {
  const { colors } = useTheme();

  const [checked, setChecked] = useState(isChecked);

  function handleToggleChecked() {
    setChecked((prev) => {
      onCheck(!prev);
      return !prev;
    });
  }

  return (
    <Pressable
      onPress={handleToggleChecked}
      children={({ pressed }) => (
        <>
          {checked ? (
            <CheckSquare
              weight="fill"
              style={pressed && { opacity: 0.5 }}
              color={colors.blue_light}
              size={24}
            />
          ) : (
            <Square
              weight="bold"
              style={pressed && { opacity: 0.5 }}
              color={colors.gray_4}
              size={24}
            />
          )}
        </>
      )}
    />
  );
}
