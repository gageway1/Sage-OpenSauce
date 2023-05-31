import React, { useState, useEffect } from "react";
import { Text, ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingIndicator = (props: {
  color: string;
  size: string;
  style: {};
}) => {
  const [dots, setDots] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDots((prevDots) => (prevDots + 1) % 4);
    }, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const sizes = {
    small: 1,
    medium: 1,
    large: 3,
    xl: 6,
  };
  // @ts-ignore this is fucking fine shut the FUCK UP REACT it's LITERALLY HOW JAVASCRIPT WORKS
  let scale = sizes[props.size] ?? 1;

  const scaleMargin = scale * 10;

  const dotsText = ".".repeat(dots);

  const styles = StyleSheet.create({
    textContainer: {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "row",
    },
    text: {
      marginTop: scaleMargin,
      color: "white",
      fontFamily: "Arial",
      fontSize: 20 + (scale > 1 ? scaleMargin : 1),
    },
  });

  return (
    <View style={{ ...props.style }}>
      <ActivityIndicator
        color={props.color}
        style={[{ transform: [{ scale: scale }] }]}
      />
      <View style={styles.textContainer}>
        <Text style={styles.text}>Loading</Text>
        <Text style={styles.text}>{dotsText}</Text>
      </View>
    </View>
  );
};

export default LoadingIndicator;
