import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";

import PageHeader from "@/components/PageHeader";
import { Icon } from "@/assets/IconMap";
import { Exercise } from "@/lib/types";
import RecentList from "@/components/exercise/RecentExerciseList";
import ExerciseCard, { LabelStrip } from "@/components/exercise/Card";
import { RoundedInput, RoundedSearchBar } from "@/components/Inputs";
import { LinearGradient } from "expo-linear-gradient";

const fake_exercise_data: Exercise[] = [
  { name: "Bench Press", type: "sets" },
  { name: "Hill Sprints", type: "interval" },
  { name: "Long Run", type: "duration" },
  { name: "Pull Ups", type: "sets" },
  { name: "Bench Press 2", type: "sets" },
  { name: "Hill Sprints2", type: "interval" },
  { name: "Long Run2", type: "duration" },
  { name: "Pull Ups2", type: "sets" },
  { name: "Bench Press3", type: "sets" },
  { name: "Hill Sprints3", type: "interval" },
  { name: "Long Run3", type: "duration" },
  { name: "Pull Ups3", type: "sets" },
];

const AddExerciseButton = () => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Icon name="add-square" size={32} />
    </TouchableOpacity>
  );
};

const Exercises = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <SafeAreaView className="bg-background">
      <PageHeader
        text="Exercises"
        backButton
        children={<AddExerciseButton />}
      />
      <View className="h-full items-center justify-center bg-background w-full pb-32 relative">
        <View className="absolute left-0 top-0 w-full h-8  z-20">
          <LinearGradient
            colors={["#FFFFFF", "#FFFFFF00"]}
            style={{ height: "100%" }}
          />
        </View>

        <FlatList
          data={fake_exercise_data}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <ExerciseCard exercise={item} />}
          contentOffset={{ x: 0, y: 0 }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View className="w-full pt-4">
              <View className="pb-8 pt-4">
                <Text className="text-2xl font-semibold text-zinc-400 px-6 pb-2">
                  Most Recent
                </Text>
                <RecentList data={fake_exercise_data} />
              </View>

              <View className="px-4 w-full">
                <View className="flex-row items-center justify-between pb-2 px-4 w-full">
                  <Text className="text-2xl font-semibold text-zinc-400">
                    All
                  </Text>
                  <TouchableOpacity>
                    <Icon size={24} name={"toggles"} />
                  </TouchableOpacity>
                </View>
                <RoundedSearchBar
                  value={searchValue}
                  handleChange={(e) => setSearchValue(e)}
                  placeholder="Search exercises..."
                />

                <LabelStrip />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default Exercises;
