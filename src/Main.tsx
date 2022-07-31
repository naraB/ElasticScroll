import React, { useCallback, useRef } from "react";
import { ListRenderItem, Text, View, FlatList } from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ItemHeight, ScreenHeight } from "./constants";
import { data } from "./data";
import { Item } from "./Item";
import { TItem } from "./types";

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList<TItem>);

const keyExtractor = (item: TItem) => item.name;
const getItemLayout = (_: any, index: number) => (
  { length: ItemHeight, offset: ItemHeight * index, index }
)
const renderHeader = () => {
  return (
    <View style={{ height: 60 }}>
      <Text style={{ fontSize: 32, fontWeight: "bold", letterSpacing: -0.3 }}>Messages</Text>
    </View>
  )
};

export const Main = () => {
  const ref = useRef<FlatList>(null);
  const insets = useSafeAreaInsets();
  const scrollOffset = useSharedValue(0);
  const maxScrollOffset = useDerivedValue(() =>
    (((insets.top + insets.bottom + data.length * (ItemHeight) + 100) - ScreenHeight)),
    [insets.top, insets.bottom]);

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollOffset.value = event.contentOffset.y;
    },
  });

  const renderItem: ListRenderItem<TItem> = useCallback(({ item, index }) => {
    return (
      <Item
        numItems={data.length}
        maxScrollOffset={maxScrollOffset}
        scrollOffset={scrollOffset}
        item={item}
        index={index}
      />
    );
  }, []);

  return (
    <AnimatedFlatlist
      onScroll={onScroll}
      scrollEventThrottle={16}
      contentContainerStyle={[
        {
          paddingBottom: insets.bottom,
          paddingTop: insets.top + 20,
          paddingHorizontal: 16,
        }
      ]}
      ref={ref}
      ListHeaderComponent={renderHeader}
      initialNumToRender={Math.round(ScreenHeight / 40)}
      getItemLayout={getItemLayout}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  )
};