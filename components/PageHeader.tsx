import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/assets/IconMap";
import { router } from "expo-router";

interface PageHeaderProps {
  text: string;
  children?: React.ReactNode;
  backButton?: boolean;
  backAction?: () => void;
  className?: string;
}

export default function PageHeader({
  text,
  children,
  backAction,
  backButton = false,
  className,
}: PageHeaderProps) {
  const handleBackPress = () => {
    if (backAction) {
      backAction();
    } else {
      router.back();
    }
  };

  return (
    <View
      className={cn(
        `${
          backButton ? "pl-4" : "pl-6"
        } w-full pr-6 pt-6 flex-row justify-between items-center`,
        className
      )}
    >
      <View className="flex-row items-center gap-2">
        {backButton && (
          <TouchableOpacity onPress={handleBackPress}>
            <Icon name="chevron-left" color="rgb(82, 82, 91)" size={32} />
          </TouchableOpacity>
        )}
        <Text className="text-4xl font-bold text-zinc-600">{text}</Text>
      </View>

      {children}
    </View>
  );
}
