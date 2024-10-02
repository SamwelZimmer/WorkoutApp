import { View, Text, FlatList, Alert } from "react-native";
import React, { forwardRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@/assets/IconMap";
import SheetWrapper from "@/components/sheets/SheetWrapper";
import { UnderlineInput } from "@/components/Inputs";
import { RoundedButton } from "../Buttons";
import { Exercise, ExerciseType } from "@/lib/types";
import { EXERCISE_TYPE_MAP } from "@/lib/constants";
import { useGlobalContext } from "@/context/GlobalProvider";
import {
  addExerciseAsync,
  exerciseExistsAsync,
  getExercisesAsync,
} from "@/lib/db";
import { useExercisesContext } from "@/context/ExercisesWrapper";

export type Ref = BottomSheetModal;

const EditExerciseSheet = forwardRef<Ref>((props, ref) => {
  return (
    <SheetWrapper ref={ref} title="Edit Exercise">
      <Text></Text>
    </SheetWrapper>
  );
});

export default EditExerciseSheet;
