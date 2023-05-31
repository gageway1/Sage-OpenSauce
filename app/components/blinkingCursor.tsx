import React, { useEffect, useState } from "react";
import { Animated, StyleSheet } from "react-native";

// tried to make this work but it wont stay in the right position
const BlinkingCursor = (props: { style: {} }) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [fadeAnim]);

  return (
    <Animated.ScrollView
      style={{
        ...props.style,
        ...style.blinkingCursor,
        opacity: fadeAnim,
      }}
    />
  );
};

const style = StyleSheet.create({
  blinkingCursor: {},
});

export default BlinkingCursor;
