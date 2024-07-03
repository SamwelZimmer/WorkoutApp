import { useCallback, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";

import { Icon } from "@/assets/IconMap";
import { cn } from "@/lib/utils";

interface RoundedButtonProps {
  text: string;
  onPress?: () => void;
  buttonClasses?: string;
  textClasses?: string;
  icon?: string;
  iconPosition?: "left" | "right" | "far-left" | "far-right";
  iconColor?: string;
  disabled?: boolean;
}

export const RoundedButton = ({
  text,
  onPress,
  buttonClasses,
  textClasses,
  icon,
  iconColor,
  iconPosition = "left",
  disabled = false,
}: RoundedButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = useCallback(() => {
    if (!onPress) return;

    setIsPressed(true);
  }, []);

  const handlePressOut = useCallback(() => {
    if (!onPress) return;

    setIsPressed(false);
    onPress();
  }, [onPress]);

  return (
    <TouchableOpacity
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}
      className={cn(
        `h-16 w-full relative flex-row  border border-border rounded-full items-center justify-center gap-2 disabled:opacity-50 ${
          iconPosition === "right" && "flex-row-reverse"
        }`,
        buttonClasses
      )}
    >
      {icon && (
        <View
          className={`${iconPosition === "far-left" && "absolute left-4"} ${
            iconPosition === "far-right" && "absolute right-4"
          }`}
        >
          <Icon name={icon} size={24} color={iconColor} />
        </View>
      )}

      <Text className={cn("font-semibold", textClasses)}>{text}</Text>
    </TouchableOpacity>
  );
};

interface UnderlineButtonProps {
  text: string;
  onPress?: () => void;
  buttonClasses?: string;
  textClasses?: string;
}

export const UnderlineButton = ({
  text,
  onPress,
  buttonClasses,
  textClasses,
}: UnderlineButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      className={cn(
        `w-full relative flex-row rounded-full items-center justify-center gap-2`,
        buttonClasses
      )}
    >
      <Text className={cn("font-semibold underline", textClasses)}>{text}</Text>
    </TouchableOpacity>
  );
};
