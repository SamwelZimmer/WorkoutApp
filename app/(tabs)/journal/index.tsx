import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";

const Journal = () => {
  return (
    <SafeAreaView>
      <View className="h-full items-center justify-center">
        <Text>Journal Hey</Text>

        <TouchableOpacity onPress={() => router.push("/exercises")}>
          <Text className="underline">Exercises</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Journal;
