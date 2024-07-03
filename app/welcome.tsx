import { RoundedButton } from "@/components/Buttons";
import { RoundedInput } from "@/components/Inputs";
import { useGlobalContext } from "@/context/GlobalProvider";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  KeyboardAvoidingView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CarouselIndicators from "@/components/CarouselIndicators";
import { ACTIVITIES } from "@/lib/constants";
import { Activity } from "@/lib/types";

const { width } = Dimensions.get("window");

export default function Welcome() {
  const { user, setUser } = useGlobalContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [disabledArray, setDisabledArray] = useState([true, true, true]);
  const [seenArray, setSeenArray] = useState([true, false, false]);
  const [username, setUsername] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<Activity[]>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const scrollViewRef = useRef<ScrollView>(null);

  const items = [
    {
      title: "There's just a couple more things.",
      subtitle: "Let's start with the pleasantries...",
      component: (
        <ActivitySelector
          selectedActivities={selectedActivities}
          setSelectedActivities={setSelectedActivities}
        />
      ),
    },
    {
      title: "Why not tell me a little about yourself?",
      subtitle: "What are you fitness goals? Why do you train?",
      component: <About name={username} setName={setUsername} />,
    },
    {
      title: "And some more personal information.",
      subtitle: "You don't have to share - it just helps me help you.",
      component: <Text>Item 3</Text>,
    },
  ];

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = Math.floor(event.nativeEvent.contentOffset.x / slideSize);
    setCurrentIndex(Math.max(0, index));
  };

  const handlePress = () => {
    if (disabledArray[currentIndex]) return;

    // check when moving to next step and when finally submitting
    if (currentIndex === 0 || currentIndex === items.length - 1) {
      if (selectedActivities.length <= 0 || selectedActivities.length > 10) {
        setErrorMessage("Select between 1 and 10 activities");
        return;
      }
    }

    if (currentIndex === items.length - 1) {
      // final submit
    } else {
      // move to next step
      const updatedArray = [...seenArray];
      updatedArray[currentIndex + 1] = true;

      setSeenArray(updatedArray);

      // scroll to the next item
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({
          x: width * (currentIndex + 1),
          animated: true,
        });
      }, 500);
    }

    setErrorMessage("");
  };

  useEffect(() => {
    let disable = true;
    if (selectedActivities.length > 0 && selectedActivities.length <= 10) {
      disable = false;
    }

    const updatedArray = [disable, ...disabledArray.slice(1)];
    setDisabledArray(updatedArray);
  }, [selectedActivities]);

  // only allow here if user exists but they're missing certain data
  useEffect(() => {
    if (user && user.username) {
      router.replace("/home");
    }
  }, [user]);

  return (
    <SafeAreaView className="bg-background">
      <View className="h-full bg-background justify-between">
        <View className="absolute -top-20 left-0 w-full h-40 z-0 bg-zinc-900" />

        <View className="gap-6 my-auto">
          <View className="flex-col gap-1 p-6 w-full bg-zinc-900 border-b-2 border-border">
            <Text className="text-4xl font-bold text-zinc-100">
              {items[currentIndex].title}
            </Text>
            <Text className="text-lg text-zinc-400 font-semibold w-3/4 h-14">
              {items[currentIndex].subtitle}
            </Text>
          </View>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={onScroll}
            scrollEventThrottle={16}
            snapToInterval={width}
            decelerationRate="fast"
            className="mb-4"
          >
            {items.map((item, index) => {
              if (!seenArray[index]) return;

              return (
                <View
                  key={index}
                  className="items-center justify-center"
                  style={[{ width }]}
                >
                  {/* Replace this with your carousel item */}
                  <View className="w-full px-6 max-h-[400px]">
                    <View className="h-full w-full items-center justify-center">
                      {item.component}
                    </View>
                  </View>
                </View>
              );
            })}
          </ScrollView>

          <CarouselIndicators
            currentIdx={currentIndex}
            setCurrentIdx={setCurrentIndex}
            count={items.length}
            permissibleButtons={seenArray}
          />
        </View>

        <View className="flex-col gap-1 p-6 relative">
          {errorMessage && (
            <Text className="absolute -top-2 left-0 w-full text-center text-red-600">
              {errorMessage}
            </Text>
          )}

          <RoundedButton
            text={currentIndex >= items.length - 1 ? "Continue" : "Next"}
            buttonClasses={true && "bg-zinc-800"}
            textClasses="text-white"
            disabled={disabledArray[currentIndex]}
            onPress={handlePress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const ActivitySelector = ({
  selectedActivities,
  setSelectedActivities,
}: {
  selectedActivities: Activity[];
  setSelectedActivities: (_selectedActivities: Activity[]) => void;
}) => {
  const handleActivityPress = (activity: Activity, toRemove: boolean) => {
    if (toRemove) {
      // deselect activity
      setSelectedActivities(
        selectedActivities.filter(
          (selectedActivity) => selectedActivity.name !== activity.name
        )
      );
    } else {
      // select activity
      setSelectedActivities([...selectedActivities, activity]);
    }
  };

  return (
    <View className="relative">
      <View className="h-6 top-0 z-20 w-full absolute left-0 pointer-events-none">
        <LinearGradient
          colors={["#FFFFFF", "#FFFFFF00"]}
          style={{ height: "100%" }}
        />
      </View>

      <View className="h-12 bottom-0 z-30 w-full absolute left-0 pointer-events-none">
        <LinearGradient
          colors={["#FFFFFF00", "#FFFFFF"]}
          style={{ height: "100%" }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row flex-wrap gap-2 items-center justify-center relative py-6 pb-12 h-full">
          {ACTIVITIES.map((activity, i) => {
            const isSelected = selectedActivities.some(
              (selectedActivity) => selectedActivity.name === activity.name
            );

            return (
              <RoundedButton
                key={i}
                buttonClasses={`${
                  isSelected && "bg-zinc-200 border-zinc-300"
                } w-max px-4 h-8`}
                textClasses={`${
                  isSelected ? "text-zinc-800" : "text-zinc-600"
                } text-sm`}
                text={activity.name}
                onPress={() => handleActivityPress(activity, isSelected)}
              />
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const About = ({
  name,
  setName,
}: {
  name: string;
  setName: (_name: string) => void;
}) => {
  return (
    <KeyboardAvoidingView className="w-full gap-6">
      {/* <RoundedInput
        value={name}
        handleChange={setName}
        placeholder="Enter username"
      />

      <RoundedInput
        value={name}
        handleChange={setName}
        placeholder="Your age?"
      />

      <RoundedInput
        value={name}
        handleChange={setName}
        placeholder="How tall are you?"
      />

      <View className="items-center justify-between flex-row w-full">
        <RoundedInput
          value={name}
          handleChange={setName}
          placeholder="How much do you weight?"
          containerClasses="w-full"
        />
      </View> */}
      <Text>Fcuk</Text>
    </KeyboardAvoidingView>
  );
};
