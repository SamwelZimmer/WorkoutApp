import { getProfile } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import { Exercise, UserData } from "@/lib/types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { Session } from "@supabase/supabase-js";
import React, { createContext, useState, useEffect, useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import openDatabaseAsync, {
  addExerciseAsync,
  createTableAsync,
  getExercisesAsync,
} from "@/lib/db";
import { SQLiteDatabase } from "expo-sqlite";

// define the shape of the context value
interface GlobalContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
  db: null | SQLiteDatabase;
}

// initial states for the context
const initialGlobalState: GlobalContextType = {
  session: null,
  setSession: () => {},
  user: null,
  setUser: () => {},
  db: null,
};

// create the context with a default value of undefined
const GlobalContext = createContext<GlobalContextType>(initialGlobalState);

// custom hook to use the GlobalContext
export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (context === undefined) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
};

// define the props for the GlobalProvider component
interface GlobalProviderProps {
  children: React.ReactNode;
}

// globalProvider component
const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<UserData | null>(null);
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database = await openDatabaseAsync("db.db");
        setDb(database);
        await createTableAsync(database);
      } catch (error) {
        console.error("Error initializing database:", error);
      }
    };

    initializeDatabase();
  }, []);

  // useEffect(() => {
  //   const fetchItems = async () => {
  //     const placeholderExersize: Exercise = { name: "New Poop", type: "misc" };
  //     if (db) {
  //       // await addExerciseAsync(db, placeholderExersize);
  //       const data = await getExercisesAsync(db);
  //       console.log(data);
  //     }
  //   };

  //   fetchItems();
  // }, [db]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  useEffect(() => {
    // if (!session) {
    //   router.replace("/enter");
    //   return;
    // }

    if (!session) return;

    // get user data
    getProfile(session).then((res) => setUser(res ?? null));
  }, [session]);

  // useEffect(() => {
  //   if (session && user && !user.username) {
  //     router.replace("/welcome");
  //   }
  // }, [user]);

  const valueObj = {
    session,
    setSession,
    user,
    setUser,
    db,
  };

  return (
    <GlobalContext.Provider value={valueObj}>
      <GestureHandlerRootView>
        <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
      </GestureHandlerRootView>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
