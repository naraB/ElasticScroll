import React from "react";
import { Text, View, Image, StyleSheet } from "react-native"
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated"
import * as constants from "./constants"
import { TItem } from "./types";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center"
  },
  container: {
    width: '100%', height: 80, flexDirection: "row", alignItems: "center"
  },
  onlineIndicator: {
    height: 12,
    width: 12,
    borderRadius: 6,
    backgroundColor: '#34c759',
    position: 'absolute',
    bottom: 0,
    right: 20
  },
  image: { height: 60, width: 60, borderRadius: 30, marginRight: 16 },
  name: { fontWeight: "600", fontSize: 17, marginBottom: 6 },
  message: {
    fontSize: 14,
  }
})

type Props = {
  item: TItem;
  index: number;
  scrollOffset: SharedValue<number>;
  maxScrollOffset: SharedValue<number>;
  numItems: number;
}

export const Item = ({ item, index, scrollOffset, maxScrollOffset, numItems }: Props) => {
  const animatedElasticStyles = useAnimatedStyle(() => ({
    transform: [{
      translateY: interpolate(
        scrollOffset.value,
        [-15, 0, maxScrollOffset.value, maxScrollOffset.value + 15],
        [index * 2, 0, 0, (index - numItems - 1) * 2],
        Extrapolation.EXTEND
      )
    }]
  }))

  return (
    <Animated.View
      key={item.name}
      style={[
        animatedElasticStyles,
        styles.wrapper,
        { height: constants.ItemHeight }
      ]}>
      <View style={styles.container}>
        <View>
          <Image source={item.image} style={styles.image} />
          {item.online ? <View style={styles.onlineIndicator} /> : null}
        </View>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text
            style={[
              styles.message,
              {
                color: item.read ? '#444' : '#222',
                fontWeight: item.read ? "400" : "600"
              }
            ]}>{item.message}</Text>
        </View>
      </View>
    </Animated.View>
  )
}