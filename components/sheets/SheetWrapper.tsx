import { View, Text, StyleSheet, Animated } from "react-native";
import React, { forwardRef, useMemo, useRef, useState } from "react";
import { BottomSheetModal, useBottomSheetModal } from "@gorhom/bottom-sheet";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Icon } from "@/assets/IconMap";

export type Ref = BottomSheetModal;

interface SheetWrapperProps {
  title?: string;
  onChange?: () => void;
  children: React.ReactNode;
}

const SheetWrapper = forwardRef<Ref, SheetWrapperProps>(
  ({ title, children, onChange }, ref) => {
    const snapPoints = useMemo(() => ["75%"], []);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const { dismiss } = useBottomSheetModal();

    const handleSheetChange = (index: number) => {
      if (onChange) {
        onChange();
      }

      const isOpen = index >= 0;
      setIsOverlayVisible(isOpen);

      Animated.timing(overlayOpacity, {
        toValue: isOpen ? 1 : 0,
        duration: 50,
        useNativeDriver: true,
      }).start();
    };

    return (
      <>
        {isOverlayVisible && (
          <Animated.View
            style={[styles.overlay, { opacity: overlayOpacity }]}
          ></Animated.View>
        )}

        <BottomSheetModal
          backgroundStyle={{
            backgroundColor: "hsl(0 0% 98%)",
          }}
          ref={ref}
          index={0}
          snapPoints={snapPoints}
          onChange={handleSheetChange}
        >
          <View className="pt-4 px-6 gap-4">
            <View className="flex-row items-center justify-between w-full">
              {title && <Text className="font-semibold text-2xl">{title}</Text>}

              <TouchableOpacity onPress={() => dismiss()}>
                <Icon name="close" size={24} />
              </TouchableOpacity>
            </View>

            {children}
          </View>
        </BottomSheetModal>
      </>
    );
  }
);

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: This can be removed if you want pure red background
    zIndex: 30, // Ensure it is above other content
  },
  touchable: {
    flex: 1,
    backgroundColor: "rgba(255, 0, 0, 0.5)", // red with 50% opacity
    zIndex: 30,
    width: "100%",
    height: "100%",
  },
});

export default SheetWrapper;
