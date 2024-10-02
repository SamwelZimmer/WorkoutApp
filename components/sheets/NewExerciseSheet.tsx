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

const emptyExercise: Exercise = {
  name: "",
  type: null,
  variations: [],
};

const NewExerciseSheet = forwardRef<Ref>((props, ref) => {
  const [idx, setIdx] = useState(0);

  const [newExercise, setNewExercise] = useState<Exercise>(emptyExercise);
  const { db } = useGlobalContext();
  const { setItems } = useExercisesContext();
  const { dismiss } = useBottomSheetModal();

  // wipe data when closing the sheet
  const onChange = () => {
    setIdx(0);
    setNewExercise(emptyExercise);
  };

  const handleAddNewExercise = async () => {
    try {
      if (db) {
        // check if exercise already exists
        const alreadyExists = await exerciseExistsAsync(db, newExercise.name);

        if (alreadyExists) {
          Alert.alert("Exercise with this name already exists");
          return;
        }

        // upload to db
        await addExerciseAsync(db, newExercise);

        // get updated items and add to state
        const data = await getExercisesAsync(db);
        setItems(data ?? []);

        // close the modal
        dismiss();
      } else {
        throw new Error("Could add to the database");
      }
    } catch (err) {
      console.error(err);
      Alert.alert(JSON.stringify(err));
    }
  };

  return (
    <SheetWrapper ref={ref} title="Create New Exercise" onChange={onChange}>
      {idx === 0 && (
        <NamePage
          name={newExercise.name}
          setName={(_name) => setNewExercise({ ...newExercise, name: _name })}
          onPress={() => setIdx(1)}
        />
      )}
      {idx === 1 && (
        <TypePage
          onPress={() => setIdx(2)}
          selectedType={newExercise.type}
          setSelectedType={(_selectedType) =>
            setNewExercise({ ...newExercise, type: _selectedType })
          }
        />
      )}
      {idx === 2 && (
        <VariationsPage
          onPress={handleAddNewExercise}
          variations={newExercise.variations ?? []}
          setVariations={(_variation) =>
            setNewExercise({
              ...newExercise,
              variations: newExercise.variations
                ? [...newExercise.variations, _variation]
                : [_variation],
            })
          }
        />
      )}
    </SheetWrapper>
  );
});

const VariationsPage = ({
  variations,
  setVariations,
  onPress,
}: {
  variations: string[];
  setVariations: (_variations: string) => void;
  onPress: () => void;
}) => {
  const [newVariation, setNewVariation] = useState("");

  const handleAddVariation = () => {
    setVariations(newVariation);
    // setVariations([...variations, newVariation]);
    setNewVariation("");
  };

  return (
    <View className="pt-4 gap-2">
      <View className="flex-row flex-wrap gap-4 pt-2">
        <UnderlineInput
          value={newVariation}
          handleChange={setNewVariation}
          placeholder="Add new variation..."
          actionNode={
            newVariation && (
              <TouchableOpacity onPress={handleAddVariation} className="pr-6">
                <View className="border h-10 w-10 items-center justify-center rounded-full">
                  <Icon name={"add"} size={20} />
                </View>
              </TouchableOpacity>
            )
          }
        />

        {variations.length > 0 ? (
          <FlatList
            data={variations}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View className="mr-2 h-10 border items-center justify-center px-6 rounded-full bg-zinc-100 border-zinc-200">
                <Text className="text-zinc-600">{item}</Text>
              </View>
            )}
            contentOffset={{ x: 0, y: 0 }}
            showsHorizontalScrollIndicator={false}
            horizontal
          />
        ) : (
          <View className="h-10" />
        )}
      </View>

      <RoundedButton
        onPress={onPress}
        text="Done"
        buttonClasses={`mt-6 bg-zinc-800`}
        textClasses={`text-white`}
      />

      <Text className="mt-12 text-zinc-400">
        {
          "Variations on an exercise are slight changed which don't warrant separate exercises - things like rep ranges or different pieces of equipment."
        }
      </Text>
    </View>
  );
};

const NamePage = ({
  name,
  setName,
  onPress,
}: {
  name: string;
  setName: (_name: string) => void;
  onPress: () => void;
}) => {
  return (
    <View className="pt-4 gap-2">
      <Text className={` text-4xl font-bold text-zinc-800 min-h-10`}>
        {name}
      </Text>
      <UnderlineInput
        value={name}
        handleChange={(e) => setName(e)}
        placeholder="Enter exercise name..."
      />
      <RoundedButton
        onPress={onPress}
        text="Next"
        buttonClasses={`mt-6 ${name.length > 0 && "bg-zinc-800"}`}
        textClasses={`${name.length > 0 && "text-white"}`}
        disabled={name.length <= 0}
      />
    </View>
  );
};

const TypePage = ({
  onPress,
  selectedType,
  setSelectedType,
}: {
  onPress: () => void;
  selectedType: ExerciseType | null;
  setSelectedType: (_selectedType: ExerciseType) => void;
}) => {
  return (
    <View className="pt-4 gap-2">
      <Text className="text-lg text-zinc-600">Choose Exercise Type</Text>

      <View className="flex-row flex-wrap gap-4 pt-2">
        {Object.keys(EXERCISE_TYPE_MAP).map((exerciseType, i) => (
          <TypeSquare
            key={i}
            handleSelect={() => setSelectedType(exerciseType as ExerciseType)}
            type={exerciseType as ExerciseType}
            active={selectedType === exerciseType}
          />
        ))}
      </View>

      <RoundedButton
        onPress={onPress}
        text="Next"
        buttonClasses={`mt-6 ${selectedType && "bg-zinc-800"}`}
        textClasses={`${selectedType && "text-white"}`}
        disabled={!selectedType}
      />
    </View>
  );
};

const TypeSquare = ({
  type,
  active,
  handleSelect,
}: {
  type: ExerciseType;
  active: boolean;
  handleSelect: () => void;
}) => {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={handleSelect}>
      <View
        style={{
          borderColor: active
            ? "rgb(39, 39, 42)"
            : EXERCISE_TYPE_MAP[type].color.border,
          shadowColor: EXERCISE_TYPE_MAP[type].color.shadow,
          backgroundColor: EXERCISE_TYPE_MAP[type].color.bg,
        }}
        className="border-2 w-max pr-24 rounded-xl p-4 gap-4"
      >
        <Icon
          color={EXERCISE_TYPE_MAP[type].color.text}
          name={EXERCISE_TYPE_MAP[type].icon}
          size={24}
        />
        <Text
          className="text-xl font-semibold"
          style={{ color: EXERCISE_TYPE_MAP[type].color.text }}
        >
          {EXERCISE_TYPE_MAP[type].name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default NewExerciseSheet;
