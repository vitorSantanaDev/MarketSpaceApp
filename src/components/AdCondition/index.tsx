import { EConditions, EConditionsValues } from "@enums/ad.enums";

import * as S from "./styles";

type AdConditionProps = {
  type: EConditions;
  bgColor?: S.Colors;
  labelColor?: S.Colors;
};

export function AdCondition({
  type,
  bgColor = "blue",
  labelColor = "gray_7",
}: AdConditionProps) {
  return (
    <S.Container bgColor={bgColor}>
      <S.Label color={labelColor}>{EConditionsValues[type]}</S.Label>
    </S.Container>
  );
}
