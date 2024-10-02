import { View, Text } from "react-native";

import { Icon } from "@/assets/IconMap";
import { EXERCISE_TYPE_MAP } from "@/lib/constants";
import { ExerciseType } from "@/lib/types";

const ExerciseTypeChip = ({ type }: { type: ExerciseType }) => {
  return (
    <View
      style={{
        borderColor: EXERCISE_TYPE_MAP[type].color.border,
        shadowColor: EXERCISE_TYPE_MAP[type].color.shadow,
        backgroundColor: EXERCISE_TYPE_MAP[type].color.bg,
      }}
      className={`h-8 px-4 flex-row rounded-full items-center justify-center gap-2 border shadow==`}
    >
      <Icon
        color={EXERCISE_TYPE_MAP[type].color.text}
        name={EXERCISE_TYPE_MAP[type].icon}
      />
      <Text style={{ color: EXERCISE_TYPE_MAP[type].color.text }}>
        {EXERCISE_TYPE_MAP[type].name}
      </Text>
    </View>
  );
};

export default ExerciseTypeChip;
