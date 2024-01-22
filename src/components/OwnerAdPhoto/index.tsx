import { ViewProps } from "react-native";
import * as S from "./styles";

type OwnerAdPhotoProps = ViewProps & {
  photo: string;
  size?: number;
};

export function OwnerAdPhoto({
  photo,
  size = 24,
  ...restViewProps
}: OwnerAdPhotoProps) {
  return (
    <S.Container size={size} {...restViewProps}>
      <S.Photo size={size} resizeMode="cover" source={{ uri: photo }} />
    </S.Container>
  );
}
