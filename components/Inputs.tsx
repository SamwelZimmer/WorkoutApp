import { useCallback, useState } from "react";
import { TouchableOpacity, View, Text, TextInput } from "react-native";

import { Icon } from "@/assets/IconMap";
import { cn } from "@/lib/utils";

// interface RoundedInputProps {
//   text: string;
//   onPress?: () => void;
//   buttonClasses?: string;
//   textClasses?: string;
//   icon?: string;
//   iconPosition?: "left" | "right" | "far-left" | "far-right";
//   iconColor?: string;
// }

// export const RoundedInput = ({
//   text,
//   onPress,
//   buttonClasses,
//   textClasses,
// }: RoundedInputProps) => {
//   const [isPressed, setIsPressed] = useState(false);

//   const handlePressIn = useCallback(() => {
//     if (!onPress) return;

//     setIsPressed(true);
//   }, []);

//   const handlePressOut = useCallback(() => {
//     if (!onPress) return;

//     setIsPressed(false);
//     onPress();
//   }, [onPress]);

//   return (
//     <TextInput
//       className={cn(
//         `h-16 w-full relative flex-row  border border-border rounded-full items-center justify-center gap-2 `,
//         buttonClasses
//       )}
//     >
//       <Text className={cn("font-semibold", textClasses)}>{text}</Text>
//     </TextInput>
//   );
// };

interface RoundedInputProps {
  name?: string;
  value: string;
  handleChange: (text: string) => void;
  placeholder?: string;
  containerClasses?: string;
  inputClasses?: string;
  type?: string;
}

export const RoundedInput = ({
  name,
  value,
  handleChange,
  placeholder,
  containerClasses,
  inputClasses,
  type,
}: RoundedInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={cn(`flex-col gap-2`, containerClasses)}>
      {name && <Text className="text-base text-slate-600 pl-6">{name}</Text>}

      <View
        className={cn(
          "flex-row w-full h-16 pl-6 rounded-full border border-border focus:border-secondary items-center",
          inputClasses
        )}
      >
        <TextInput
          numberOfLines={1}
          autoCorrect={false}
          value={value}
          onChangeText={handleChange}
          placeholder={placeholder}
          placeholderTextColor="rgb(161 161 170)"
          className="flex-1 w-full text-base  h-full"
          secureTextEntry={type === "password" && !showPassword}
        />

        {type === "password" && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="pr-4"
          >
            <Icon name={!showPassword ? "eye" : "eye-closed"} size={24} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
