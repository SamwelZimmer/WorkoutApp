import { Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import PageHeader from "@/components/PageHeader";

const Stats = () => {
  return (
    <SafeAreaView className="h-full items-center justify-center">
      <PageHeader text="Stats" />
    </SafeAreaView>
  );
};

export default Stats;
