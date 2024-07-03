import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from "react-native-reanimated";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface CarouselIndicatorsProps {
  currentIdx: number;
  setCurrentIdx: (_currentIdx: number) => void;
  count: number;
  permissibleButtons?: boolean[];
}

const CarouselIndicators = ({
  currentIdx,
  setCurrentIdx,
  count,
  permissibleButtons,
}: CarouselIndicatorsProps) => {
  const widthValues = Array.from({ length: count }).map((_, index) =>
    useSharedValue(index === currentIdx ? 32 : 16)
  );
  const backgroundColorValues = Array.from({ length: count }).map((_, index) =>
    useSharedValue(
      index === currentIdx ? "rgb(113, 113, 122)" : "rgb(228, 228, 231)"
    )
  );

  useEffect(() => {
    widthValues.forEach((width, index) => {
      width.value = withTiming(index === currentIdx ? 32 : 16, {
        duration: 300,
        easing: Easing.out(Easing.exp),
      });
    });
    backgroundColorValues.forEach((backgroundColor, index) => {
      backgroundColor.value = withTiming(
        index === currentIdx ? "rgb(113, 113, 122)" : "rgb(228, 228, 231)",
        {
          duration: 300,
          easing: Easing.out(Easing.exp),
        }
      );
    });
  }, [currentIdx]);

  const handlePress = (index: number) => {
    if (permissibleButtons && !permissibleButtons[index]) {
      return;
    }
    setCurrentIdx(index);
  };

  return (
    <View style={{ flexDirection: "row", gap: 8, justifyContent: "center" }}>
      {Array.from({ length: count }).map((_, index) => {
        const animatedStyle = useAnimatedStyle(() => {
          return {
            width: widthValues[index].value,
            backgroundColor: backgroundColorValues[index].value,
          };
        });

        return (
          <AnimatedTouchable
            key={index}
            style={[
              { height: 8, borderRadius: 8, marginHorizontal: 4 },
              animatedStyle,
            ]}
            onPress={() => handlePress(index)}
          />
        );
      })}
    </View>
  );
};

export default CarouselIndicators;
