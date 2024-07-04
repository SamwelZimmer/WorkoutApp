import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "@/components/PageHeader";

const Create = () => {
  return (
    <SafeAreaView className="items-center justify-center h-full">
      <PageHeader text="Create" />
      <Text>Create Page</Text>
    </SafeAreaView>
  );
};

export default Create;
