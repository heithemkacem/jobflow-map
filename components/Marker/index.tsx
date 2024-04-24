import React from "react";
import { Image, Text, View } from "react-native";

import styles from "./styles";

interface Props {
  companyLogo: string | null;
}

export const Marker = ({ companyLogo }: Props) => {
  return (
    <View
      style={[
        styles.container,
        {
          overflow: "hidden",
          zIndex: 3,
        },
      ]}
    >
      {companyLogo ? (
        <Image
          style={[styles.logo]}
          resizeMode="contain"
          source={{ uri: companyLogo }}
        />
      ) : (
        <Image
          style={[styles.logo]}
          source={require("@/assets/images/company-placeholder-128.jpg")}
        ></Image>
      )}
    </View>
  );
};
