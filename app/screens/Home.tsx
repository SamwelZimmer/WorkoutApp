import { KeyboardAvoidingView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import PageHeader from "@/components/PageHeader";

const Home = () => {
  return (
    <SafeAreaView className="items-center justify-center h-full">
      <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={110}>
        <PageHeader text="Home" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ height: "100%" }}
        >
          <View className="h-full items-center justify-center gap-8">
            <Text className="">Home</Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Home;
