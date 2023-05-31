import { useHeaderHeight } from "@react-navigation/elements";
import { Audio } from "expo-av";
import * as FileSystem from "expo-file-system";
import * as Speech from "expo-speech";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  View,
} from "react-native";
import "react-native-url-polyfill/auto";
import uuid from "react-native-uuid";
import ButtonView from "../components/ButtonView";
import OverlayView from "../components/OverlayView";
import ScrollableTextView from "../components/ScrollableTextView";
import { FileWriter, Logger } from "../helperFunctions/FileOperations";
import GptAgent from "../helperFunctions/gptCaller";
import { Conversation } from "../interfaces";
import { styles } from "./styles";

const App = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState<Audio.Recording>();
  const [sound, setSound] = useState<Audio.Sound>();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setCurrentAnswer] = useState("");
  const [isWaitingOnAnswer, setIsWaitingOnAnswer] = useState(false);
  const [textToSpeech, setTextToSpeech] = useState("");
  const [isTypeWriting, setIsTypeWriting] = useState(false);
  const [typeWriterTextChars, setTypeWriterTextChars] = useState("");
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timer>();
  const [answers, setAnswersArray] = useState<any[]>([]);
  const saveConversationFile = FileSystem.documentDirectory + "answers.json";
  const saveLogFile = FileSystem.documentDirectory + "log.txt";

  useEffect(() => {
    Logger.logInfo("Entry point of App");
    const asyncLoad = async () => {
      Logger.logInfo("Checking if answers file exists");
      const fileInfo = await FileSystem.getInfoAsync(saveConversationFile);

      if (!fileInfo.exists) {
        Logger.logInfo("Creating answers file");
        await FileSystem.writeAsStringAsync(saveConversationFile, "[]");
      }
      Logger.logInfo("Reading answers file");
      const conversationFile = await FileSystem.readAsStringAsync(
        saveConversationFile
      );
      const conversationFileJson: Conversation[] = JSON.parse(conversationFile);
      setAnswersArray(conversationFileJson);
    };
    asyncLoad();
  }, []);

  const appendAnswerToFile = async (answer: string) => {
    Logger.logInfo("Appending answer to file");
    const answersFile = await FileSystem.readAsStringAsync(
      saveConversationFile
    );
    const answersFileJson: any[] = JSON.parse(answersFile);
    const answerObj: Conversation = {
      id: uuid.v4(),
      question: question,
      answer: answer,
      time: new Date().toISOString(),
    };
    answersFileJson.unshift(answerObj);
    await FileWriter.saveConversation(JSON.stringify(answersFileJson));
  };

  const height = useHeaderHeight();

  let interval: NodeJS.Timer;

  const askQuestion = async () => {
    Logger.logInfo("Asking question: " + question);
    clearInterval(interval);
    Keyboard.dismiss();
    if (question == "") {
      Alert.alert("Oops!", "Please input text!", [
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);

      return;
    }

    setIsWaitingOnAnswer(true);

    const gptAgent = new GptAgent();

    await gptAgent
      .getChatCompletion(question)
      .then(async (res) => {
        stopAnswerAndTypeWriter();
        setIsWaitingOnAnswer(false);
        const newAnswers: string[] = [...answers, res];
        setAnswersArray(newAnswers);
        await appendAnswerToFile(res);
        setTextToSpeech(res);
        setQuestion("");
        setCurrentAnswer(res);
      })
      .catch((err) => {
        setIsWaitingOnAnswer(false);
        Logger.logError(err);
      });
  };

  const stopAnswerAndTypeWriter = () => {
    clearInterval(interval);
    clearTimeout(timeoutId);
    setCurrentAnswer("");
    setIsTypeWriting(false);
    setTypeWriterTextChars("");
    stopSpeaking();
    setIsSpeaking(false);
    clearCurrentTypingActions();
  };

  const speak = () => {
    setIsSpeaking(true);
    Speech.speak(textToSpeech, {
      language: "en-US",
      voice: "com.apple.voice.compact.en-US.Samantha", // default apple voice
      rate: 1.075, // number pulled out of my ass to match typewriter speed close enough
    });
  };

  const stopSpeaking = async () => {
    clearCurrentTypingActions();
    if (isSpeaking) {
      Speech.stop();
    } else {
      return;
    }
  };

  const clearCurrentTypingActions = () => {
    clearInterval(timeoutId);
    setIsTypeWriting(false);
    setTypeWriterTextChars("");
  };

  function typeWriterText(text: string) {
    const min = 30; // numbers pulled out of my ass
    const max = 40;
    const random = Math.floor(Math.random() * (max - min + 1) + min);

    let i = 0;

    setIsTypeWriting(true);
    interval = setInterval(
      function test() {
        setTimeoutId(interval);
        setTypeWriterTextChars((prev) => prev + text.charAt(i));
        i++;
        if (i > text.length) {
          clearInterval(interval);
          setIsTypeWriting(false);
          setTypeWriterTextChars("");
        }
      },
      random
    );
  }

  const clearFiles = () => {
    FileSystem.writeAsStringAsync(saveConversationFile, "[]");
    FileSystem.writeAsStringAsync(saveLogFile, "");
    Logger.logInfo("Files cleared");
  };

  const resetState = async () => {
    Logger.logInfo("Resetting state");
    setIsRecording(false);
    setRecording(undefined);
    setSound(undefined);
    setIsPlaying(false);
    setIsSpeaking(false);
    setQuestion("");
    setCurrentAnswer("");
    setIsWaitingOnAnswer(false);
    setTextToSpeech("");
    setIsTypeWriting(false);
    setTypeWriterTextChars("");
    clearInterval(interval);
    clearTimeout(timeoutId);
    setAnswersArray([]);
    if (await Speech.isSpeakingAsync()) Speech.stop();
    clearFiles();
  };

  const readLogFile = async () => {
    stopSpeaking();
    console.log("Reading log file");
    const logFile = await FileSystem.readAsStringAsync(saveLogFile);
    console.log(logFile);
  };

  /**
  // const startRecording = async () => {
  //   try {
  //     setIsRecording(true);
  //     await Audio.requestPermissionsAsync();
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: true,
  //       playsInSilentModeIOS: true,
  //       staysActiveInBackground: true,
  //     });

  //     const recording = new Audio.Recording();
  //     await recording.prepareToRecordAsync(
  //       Audio.RecordingOptionsPresets.HighQuality
  //     );
  //     await recording.startAsync();
  //     setRecording(recording);
  //   } catch (err) {
  //     console.error(err);
  //     console.error("Failed to start recording", err);
  //     setIsRecording(false);
  //   }
  // };

  // const stopRecording = async () => {
  //   setIsRecording(false);
  //   setRecording(undefined);
  //   if (!recording) {
  //     return;
  //   }
  //   await recording.stopAndUnloadAsync();
  //   const { sound } = await recording.createNewLoadedSoundAsync();
  //   setSound(sound);
  // };

  // const playRecording = async () => {
  //   if (sound) {
  //     await Audio.setAudioModeAsync({
  //       allowsRecordingIOS: false,
  //     });
  //     await sound.setVolumeAsync(1).then(async () => {
  //       await sound.playAsync();
  //       setIsPlaying(true);
  //       sound.setOnPlaybackStatusUpdate((status: any) => {
  //         if (status.didJustFinish) {
  //           stopPlaying();
  //         }
  //       });
  //     });
  //   } else {
  //     console.log("No sound to play");
  //   }
  // };

  // const stopPlaying = async () => {
  //   if (sound) {
  //     await sound.stopAsync();
  //     setIsPlaying(false);
  //   }
  // };
   */

  useEffect(() => {}, [question]);

  useEffect(() => {
    Logger.logInfo("New answer: \n" + answer);
    typeWriterText(answer);
  }, [answer]);

  useEffect(() => {
    speak();
  }, [textToSpeech]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={height}
      enabled
    >
      <OverlayView styles={styles} isWaitingOnAnswer={isWaitingOnAnswer} />
      <ScrollableTextView
        styles={styles}
        isTypeWriting={isTypeWriting}
        answer={answer}
        typeWriterTextChars={typeWriterTextChars}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.textArea}
          multiline={true}
          numberOfLines={4}
          onChangeText={setQuestion}
          value={question}
          placeholder="Enter prompt"
          placeholderTextColor="rgba(232, 232, 232, 0.22)"
        />
        <ButtonView
          styles={styles}
          askQuestion={askQuestion}
          stopSpeaking={readLogFile}
          resetState={resetState}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default App;
