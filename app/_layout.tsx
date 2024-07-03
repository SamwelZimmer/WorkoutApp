import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Stack } from "expo-router";

import "../global.css";
import GlobalProvider from "@/context/GlobalProvider";
import CreateButton from "@/components/CreateButton";

export default function RootLayout() {
  return (
    <GlobalProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="enter" options={{ headerShown: false }} />
        <Stack.Screen name="welcome" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)/journal/exercises/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </GlobalProvider>
  );
}
