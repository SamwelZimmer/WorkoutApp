import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateButton from "@/components/CreateButton";
import { ScrollView } from "react-native-gesture-handler";
import { router } from "expo-router";

const Home = () => {
  return (
    <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ height: "100%" }}
      >
        <View className="h-full items-center justify-center gap-8">
          <Text className="">Home</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Home;
