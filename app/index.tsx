import { Icon } from "@/assets/IconMap";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function Page() {
  const { session, user } = useGlobalContext();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    if (!session && !user) {
      router.replace("/enter");
      return;
    }

    // // update when welcome page is ready
    // if (user && !user.username) {
    //   router.replace("/welcome");
    //   return;
    // }

    router.replace("/profile");
  }, [session, user, isMounted]);

  return (
    <View className="bg-zinc-900 h-full relative justify-end">
      <View className="bg-zinc-900 h-full">
        <View className="h-full items-center justify-center gap-8">
          <Text className="text-4xl">Page one</Text>

          <TouchableOpacity onPress={() => router.push("/create")}>
            <Text className="underline">Go to tabs</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/enter")}>
            <Text className="underline">Go to enter</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/welcome")}>
            <Text className="underline">Go to welcome</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
