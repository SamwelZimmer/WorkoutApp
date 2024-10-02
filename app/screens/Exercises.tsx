import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import React from "react";

import PageHeader from "@/components/PageHeader";
import { Icon } from "@/assets/IconMap";
import { Exercise } from "@/lib/types";
import RecentList from "@/components/exercise/RecentExerciseList";
import ExerciseCard, { LabelStrip } from "@/components/exercise/Card";
import { RoundedSearchBar } from "@/components/Inputs";
import { LinearGradient } from "expo-linear-gradient";
import ExercisesProvider, {
  useExercisesContext,
} from "@/context/ExercisesWrapper";
import { RoundedButton, UnderlineButton } from "@/components/Buttons";

// TODO: Edit functionality
// TODO: Filtering
// TODO: Shift the cards a bit

const AddExerciseButton = () => {
  const { handleNewExercise } = useExercisesContext();

  return (
    <TouchableOpacity onPress={handleNewExercise}>
      <Icon name="add-square" size={32} />
    </TouchableOpacity>
  );
};

const Exercises = () => {
  return (
    <ExercisesProvider>
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

          <CardList />
        </View>
      </SafeAreaView>
    </ExercisesProvider>
  );
};

const CardList = () => {
  const { filteredItems } = useExercisesContext();

  return (
    <FlatList
      data={filteredItems}
      keyExtractor={(item) => item.name}
      renderItem={({ item }) => <ExerciseCard exercise={item} />}
      contentOffset={{ x: 0, y: 0 }}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={() => <EmptyListState />}
    />
  );
};

const EmptyListState = () => {
  const { handleNewExercise, setSearchQuery } = useExercisesContext();

  return (
    <View className="px-6 w-full items-center justify-center h-2/3 flex-col gap-4">
      <Text className="text-zinc-400 pb-4">No Exercises</Text>

      <RoundedButton
        onPress={handleNewExercise}
        text="New Exercise"
        icon="add"
        iconColor="#FFFFFF"
        textClasses="text-white"
        buttonClasses="bg-zinc-800"
      />

      <UnderlineButton
        text="Clear search"
        onPress={() => setSearchQuery("")}
        textClasses="text-zinc-600"
      />
    </View>
  );
};

const ListHeader = () => {
  const { searchQuery, setSearchQuery } = useExercisesContext();

  const { items } = useExercisesContext();

  const orderedItems = items
    .sort(
      (a, b) =>
        new Date(b.updated_at ?? "").getTime() -
        new Date(a.updated_at ?? "").getTime()
    )
    .slice(0, 5);

  const updateSearchQuery = (e: string) => {
    setSearchQuery(e);
  };

  return (
    <View className="w-full pt-4">
      <View className="pb-8 pt-4">
        <Text className="text-2xl font-semibold text-zinc-400 px-6 pb-2">
          Most Recent
        </Text>
        <RecentList data={orderedItems} />
      </View>

      <View className="px-4 w-full">
        <View className="flex-row items-center justify-between pb-2 px-4 w-full">
          <Text className="text-2xl font-semibold text-zinc-400">All</Text>
          <TouchableOpacity>
            <Icon size={24} name={"toggles"} />
          </TouchableOpacity>
        </View>
        <RoundedSearchBar
          value={searchQuery}
          handleChange={updateSearchQuery}
          placeholder="Search exercises..."
        />
        <LabelStrip />
      </View>
    </View>
  );
};

export default Exercises;
