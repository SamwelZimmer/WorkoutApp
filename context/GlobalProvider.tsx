import { getProfile } from "@/lib/queries";
import { supabase } from "@/lib/supabase";
import { UserData } from "@/lib/types";
import { Session } from "@supabase/supabase-js";
import { router } from "expo-router";
import React, { createContext, useState, useEffect, useContext } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// define the shape of the context value
interface GlobalContextType {
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

// initial states for the context
const initialGlobalState: GlobalContextType = {
  session: null,
  setSession: () => {},
  user: null,
  setUser: () => {},
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
  };

  return (
    <GlobalContext.Provider value={valueObj}>
      <GestureHandlerRootView>{children}</GestureHandlerRootView>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
