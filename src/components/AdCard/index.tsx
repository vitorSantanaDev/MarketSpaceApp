import { PressableProps, View } from "react-native";

import { EConditions } from "@enums/ad.enums";

import { AdCondition } from "@components/AdCondition";
import { OwnerAdPhoto } from "@components/OwnerAdPhoto";

import * as S from "./styles";

export type AdCardProps = PressableProps & {
  title: string;
  image: string;
  price: number;
  condition: EConditions;
  adOwner: {
    ownerPhoto: string;
  };
};

export function AdCard({
  title,
  image,
  price,
  condition,
  adOwner: { ownerPhoto },
  ...restPressableProps
}: AdCardProps) {
  return (
    <S.Container
      children={({ pressed }) => (
        <View style={pressed && { opacity: 0.5 }}>
          <S.PhotoContainer>
            <S.PhotoContainerHeader>
              <OwnerAdPhoto photo={ownerPhoto} />
              <AdCondition
                bgColor={condition === EConditions.USED ? "gray_2" : "blue"}
                type={condition}
              />
            </S.PhotoContainerHeader>
            <S.AdPhoto resizeMode="cover" source={{ uri: image }} />
          </S.PhotoContainer>

          <S.ProductDescription>{title}</S.ProductDescription>
          <S.PriceContainer>
            <S.Currency>R$</S.Currency>
            <S.ProductPrice>{price}</S.ProductPrice>
          </S.PriceContainer>
        </View>
      )}
      {...restPressableProps}
    />
  );
}
