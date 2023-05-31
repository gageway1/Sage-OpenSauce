import React, { useEffect } from "react";
import {
  Keyboard,
  Pressable,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Logger } from "../helperFunctions/FileOperations";

const ScrollableTextView = (props: {
  isTypeWriting: boolean;
  answer: string;
  typeWriterTextChars: string;
  styles: any;
}) => {
  useEffect(() => {
    Logger.logInfo("Answer changed in scrollview");
  }, [props.answer]);

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      style={props.styles.container}
    >
      <View style={props.styles.inner}>
        {
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            style={props.styles.textAreaContainer}
            contentInset={{ bottom: 40, top: -10 }}
            scrollIndicatorInsets={{ bottom: 0, top: 0 }}
          >
            <Pressable>
              {props.isTypeWriting && (
                <Text style={props.styles.textArrayItem}>
                  {props.typeWriterTextChars + "|"}
                </Text>
              )}
              {!props.isTypeWriting && props.answer.length > 0 && (
                <View>
                  <Text style={{ ...props.styles.textInContainer }}>
                    {"\n" + props.answer + "\n"}
                  </Text>
                </View>
              )}
              {!props.isTypeWriting && props.answer.length <= 0 && (
                <Text style={props.styles.textArrayItem}>
                  Please ask a thing!
                </Text>
              )}
            </Pressable>
          </ScrollView>
        }
      </View>
    </TouchableWithoutFeedback>
  );
};

export default ScrollableTextView;
