import CustomBottomSheetModal from "@/components/sheets/Generic";
import { getProfile } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import { Exercise, UserData } from "@/lib/types";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  useBottomSheetModal,
} from "@gorhom/bottom-sheet";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NewExerciseSheet from "@/components/sheets/NewExerciseSheet";
import { useGlobalContext } from "./GlobalProvider";
import { getExercisesAsync } from "@/lib/db";
import EditExerciseSheet from "@/components/sheets/EditExerciseSheet";

// define the shape of the context value
interface ExercisesContextType {
  items: Exercise[];
  setItems: React.Dispatch<React.SetStateAction<Exercise[]>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  filteredItems: Exercise[];
  handleNewExercise: () => void;
  handleEditExercise: () => void;
}

// initial states for the context
const initialExercisesState: ExercisesContextType = {
  items: [],
  setItems: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  filteredItems: [],
  handleNewExercise: () => {},
  handleEditExercise: () => {},
};

// create the context with a default value of undefined
const ExercisesContext = createContext<ExercisesContextType>(
  initialExercisesState
);

// custom hook to use the ExercisesContext
export const useExercisesContext = () => {
  const context = useContext(ExercisesContext);
  if (context === undefined) {
    throw new Error(
      "useExercisesContext must be used within a ExercisesProvider"
    );
  }
  return context;
};

// define the props for the ExercisesProvider component
interface ExercisesProviderProps {
  children: React.ReactNode;
}

// ExercisesProvider component
const ExercisesProvider = ({ children }: ExercisesProviderProps) => {
  // state
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<Exercise[]>([]);

  // context
  const { db } = useGlobalContext();

  // refs
  const newExerciseSheetRef = useRef<BottomSheetModal>(null);
  const editExerciseSheetRef = useRef<BottomSheetModal>(null);

  // get exercises from db
  useEffect(() => {
    if (db) {
      getExercisesAsync(db).then((res) => setItems(res ?? []));
    }
  }, [db]);

  // filter the cards by name
  let filteredItems = items;
  if (searchQuery) {
    filteredItems = items.filter((item) => item.name.includes(searchQuery));
  }

  const handleNewExercise = () => {
    newExerciseSheetRef.current?.present();
  };

  const handleEditExercise = () => {
    editExerciseSheetRef.current?.present();
  };

  const valueObj = {
    items: items,
    setItems: setItems,
    searchQuery: searchQuery,
    setSearchQuery: setSearchQuery,
    filteredItems: filteredItems,
    handleNewExercise: handleNewExercise,
    handleEditExercise: handleEditExercise,
  };

  return (
    <ExercisesContext.Provider value={valueObj}>
      <NewExerciseSheet ref={newExerciseSheetRef} />
      <EditExerciseSheet ref={editExerciseSheetRef} />

      {children}
    </ExercisesContext.Provider>
  );
};

export default ExercisesProvider;
