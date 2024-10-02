import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Exercise } from "@/lib/types";
import { Icon } from "@/assets/IconMap";
import ExerciseTypeChip from "@/components/exercise/ExerciseTypeChip";
import { EXERCISE_TYPE_MAP } from "@/lib/constants";
import { useExercisesContext } from "@/context/ExercisesWrapper";

interface ExerciseCardProps {
  exercise: Exercise;
}

export const LabelStrip = () => {
  const { filteredItems } = useExercisesContext();

  if (!filteredItems || filteredItems.length === 0) return;

  return (
    <View className="pt-4 pb-2 pl-4 flex-row gap-2">
      <Text className="w-32 pl-2 text-sm text-zinc-600">Name</Text>
      <Text className="text-sm w-28 text-zinc-600 text-center">Type</Text>
      <Text className="text-sm text-zinc-600 text-center pl-4">Variations</Text>
    </View>
  );
};

const ExerciseCard = ({ exercise }: ExerciseCardProps) => {
  const { handleEditExercise } = useExercisesContext();

  return (
    <View className="border border-border h-16 px-4 mx-6 rounded-lg mb-2 flex-row items-center gap-2 justify-between max-w-full">
      <View className="flex-row items-center">
        <Text
          className="font-semibold text-zinc-600 w-32 text-lg"
          numberOfLines={1}
        >
          {exercise.name}
        </Text>

        <View className="w-28">
          <ExerciseTypeChip type={exercise.type ?? "misc"} />
        </View>

        <Text className="items-center justify-center pl-12 text-zinc-600 text-center">
          x{(exercise.variations?.length ?? 0) + 1}
        </Text>
      </View>

      <TouchableOpacity onPress={handleEditExercise}>
        <Icon name="pencil" size={20} />
      </TouchableOpacity>
    </View>
  );
};

export default ExerciseCard;
