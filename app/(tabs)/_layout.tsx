import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useColorScheme, Image } from "react-native";

import Colors from "../../constants/Colors";

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#202123",
        },
        tabBarStyle: {
          backgroundColor: "#202123",
        },
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sage",
          tabBarIcon: ({ size }) => {
            return (
              <Image
                style={{ width: 28, height: 28 }}
                source={require("../../assets/images/ChatGPT_logo.svg.png")}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "History",
          tabBarIcon: ({ size }) => {
            return (
              <Image
                style={{ width: 30, height: 26 }}
                source={require("../../assets/images/SeekPng.com_history-icon-png_7815113.png")}
              />
            );
          },
        }}
      />
    </Tabs>
  );
}
