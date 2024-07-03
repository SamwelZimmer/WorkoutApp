import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { RoundedButton } from "@/components/Buttons";
import { supabase } from "@/lib/supabase";
import { useGlobalContext } from "@/context/GlobalProvider";

const Profile = () => {
  const { setUser, setSession } = useGlobalContext();

  const handleLogOut = () => {
    supabase.auth.signOut();
    setUser(null);
    setSession(null);

    try {
    } catch (err) {
      console.error(err);
      const error = err as Error;
      throw new Error(error.message);
    }
  };

  return (
    <SafeAreaView>
      <View className="h-full items-center justify-center">
        <Text>Profile Yo</Text>
        <RoundedButton text="Logout" onPress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
