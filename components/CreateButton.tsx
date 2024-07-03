import { View, Text } from "react-native";
import React from "react";
import { Icon } from "@/assets/IconMap";

export default function CreateButton() {
  return (
    <View className="fixed bottom-0 right-0 bg-zinc-900 w-16 h-16 rounded-full items-center justify-center">
      <Icon name="add" color="#FFFFFF" size={24} />
    </View>
  );
}
