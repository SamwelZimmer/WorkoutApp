import { View, Text } from "react-native";

import { Icon } from "@/assets/IconMap";
import { EXERCISE_TYPE_MAP } from "@/lib/constants";
import { ExerciseType } from "@/lib/types";

const ExerciseTypeChip = ({ type }: { type: ExerciseType }) => {
  return (
    <View
      className={`h-8 px-4 flex-row rounded-full items-center justify-center gap-2 ${EXERCISE_TYPE_MAP[type].color.container}`}
    >
      <Icon
        color={EXERCISE_TYPE_MAP[type].color.rgb}
        name={EXERCISE_TYPE_MAP[type].icon}
      />
      <Text style={{ color: EXERCISE_TYPE_MAP[type].color.rgb }}>
        {EXERCISE_TYPE_MAP[type].name}
      </Text>
    </View>
  );
};

export default ExerciseTypeChip;
