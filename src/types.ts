import { ImageSourcePropType } from "react-native";

export type TItem = {
  image: ImageSourcePropType;
  message: string;
  online: boolean;
  name: string;
  read: boolean;
};
