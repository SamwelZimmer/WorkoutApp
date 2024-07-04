import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Exercise } from "@/lib/types";

import ExerciseTypeChip from "@/components/exercise/ExerciseTypeChip";
import { Icon } from "@/assets/IconMap";

interface SquareCardProps {
  exercise: Exercise;
}

export default function SquareCard({ exercise }: SquareCardProps) {
  return (
    <View className="w-48 h-36 border border-border rounded-xl mr-6 p-4 bg-background justify-between">
      <Text numberOfLines={1} className="text-lg font-semibold">
        {exercise.name}
      </Text>

      <ExerciseTypeChip type={exercise.type} />

      <View className="flex-row items-center justify-between">
        <Text className="text-zinc-600">x10</Text>

        <TouchableOpacity>
          <Icon name="pencil" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
