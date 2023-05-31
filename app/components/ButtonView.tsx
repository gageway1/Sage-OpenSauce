import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ButtonView = (props: {
  askQuestion: () => Promise<void>;
  stopSpeaking: () => Promise<void>;
  resetState: () => Promise<void>;
  styles: any;
}) => {
  return (
    <View style={props.styles.buttonContainer}>
      <TouchableOpacity style={props.styles.button} onPress={props.askQuestion}>
        <Text style={{ color: "#aaaaaa" }}>Ask the Sage</Text>
      </TouchableOpacity>
      <TouchableOpacity style={props.styles.button} onPress={props.stopSpeaking}>
        <Text style={{ color: "#aaaaaa" }}>Force Stop Speaking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={props.styles.button} onPress={props.resetState}>
        <Text style={{ color: "#aaaaaa" }}>Reset App State</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ButtonView;
