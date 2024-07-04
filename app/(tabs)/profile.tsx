import { Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RoundedButton } from "@/components/Buttons";
import { supabase } from "@/lib/supabase";
import { useGlobalContext } from "@/context/GlobalProvider";
import PageHeader from "@/components/PageHeader";

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
      <PageHeader text="Profile" />
      <View className="h-full items-center justify-center px-6">
        <RoundedButton text="Logout" onPress={handleLogOut} />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
