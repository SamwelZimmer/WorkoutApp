import { Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";
import PageHeader from "@/components/PageHeader";

type RootStackParamList = {
  Journal: undefined;
  Exercises: undefined;
};

type JournalScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Journal"
>;

type JournalScreenRouteProp = RouteProp<RootStackParamList, "Journal">;

type Props = {
  navigation: JournalScreenNavigationProp;
  route: JournalScreenRouteProp;
};

const Journal = ({ navigation }: Props) => {
  return (
    <SafeAreaView>
      <PageHeader text="Journal" />
      <View className="h-full items-center justify-center">
        <TouchableOpacity onPress={() => navigation.navigate("Exercises")}>
          <Text className="underline">Exercises</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Journal;
