import React from "react";
import { Text, View } from "react-native";
import "react-native-url-polyfill/auto";
import { Conversation } from "../interfaces";

const AnswersView = (props: { conversation: Conversation[]; styles: any }) => {
  console.log(props.conversation);
  return (
    <>
      {props.conversation
        .map((conversationInstance, i) => (
          <View key={i}>
            <Text style={{ ...props.styles }}>
              {"\n" + conversationInstance.answer + "\n"}
            </Text>
            <Text
              style={{
                ...props.styles,
                fontSize: 16,
                marginBottom: 15,
                marginTop: -10,
                color: "#525464",
                fontStyle: "italic",
              }}
            >
              {conversationInstance.question}
            </Text>
            <Text
              style={{
                ...props.styles,
                fontSize: 16,
                marginBottom: 10,
                marginTop: -10,
                color: "#525464",
              }}
            >
              {conversationInstance.time}
            </Text>
            <View
              style={{
                borderBottomColor: "#525464",
                borderBottomWidth: 1,
              }}
            />
          </View>
        ))}
      <Text style={{ ...props.styles, marginTop: 40 }}>
        End of chat history
      </Text>
    </>
  );
};

export default AnswersView;
