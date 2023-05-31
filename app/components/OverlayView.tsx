import { Overlay } from "@rneui/themed";
import React from "react";
import { View } from "react-native";
import LoadingIndicator from "./loadingIndicator";

const OverlayView = (props: { isWaitingOnAnswer: boolean, styles: any }) => {
  return (
    <View>
      <Overlay
        isVisible={props.isWaitingOnAnswer}
        overlayStyle={{
          backgroundColor: "rgba(52, 52, 52, 0.3)",
          height: "100%",
          width: "100%",
        }}
      >
        <LoadingIndicator
          color="white"
          size="small"
          style={props.styles.loadingIndicator}
        ></LoadingIndicator>
      </Overlay>
    </View>
  );
};

export default OverlayView;
