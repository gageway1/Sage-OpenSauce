import { useIsFocused } from "@react-navigation/native";
import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import AnswersView from "../components/answersView";
import { Logger } from "../helperFunctions/FileOperations";
import { Conversation } from "../interfaces";
import { styles } from "./styles";

const HistoryView = () => {
  const [answers, setAnswersArray] = useState<Conversation[]>([]);

  const saveAnswersFile = FileSystem.documentDirectory + "answers.json";
  const isFocused = useIsFocused();

  useEffect(() => {
    Logger.logInfo("Entry point of HistoryView");

    const asyncLoad = async () => {
      await loadAnswers();
    };
    asyncLoad();
  }, []);

  useEffect(() => {
    Logger.logInfo("Loading answers");
    const asyncLoad = async () => {
      await loadAnswers();
    };
    asyncLoad();
  }, [isFocused]);

  const loadAnswers = async () => {
    Logger.logInfo("Checking if answers file exists");
    const fileInfo = await FileSystem.getInfoAsync(saveAnswersFile);

    if (!fileInfo.exists) {
      Logger.logInfo("Creating answers file");
      await FileSystem.writeAsStringAsync(saveAnswersFile, "[]");
    }
    Logger.logInfo("Reading answers file");
    const answersFile = await FileSystem.readAsStringAsync(saveAnswersFile);
    const answersFileJson: Conversation[] = JSON.parse(answersFile);
    setAnswersArray(answersFileJson);
    console.log(answersFileJson);
  };

  return (
    <View style={{ width: "100%", transform: [{ scaleY: -1 }] }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={
          (styles.textAreaContainer,
          {
            width: "95%",
            height: "100%",
            alignContent: "center",
            alignSelf: "center",
            borderLeftColor: "#525464",
            borderRightColor: "#525464",
            borderBottomColor: "transparent",
            borderTopColor: "transparent",
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 0,
            borderTopWidth: 0,
            paddingLeft: 10,
            paddingRight: 10,
          })
        }
        contentInset={{ bottom: 40, top: -10 }}
        scrollIndicatorInsets={{ bottom: 0, top: 0 }}
        showsVerticalScrollIndicator={false}
      >
        <Pressable>
          <AnswersView
            conversation={answers}
            styles={{ ...styles.textInContainer, transform: [{ scaleY: -1 }] }}
          ></AnswersView>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default HistoryView;
