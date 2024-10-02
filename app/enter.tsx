import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
  AppState,
} from "react-native";

import React, { useEffect, useState } from "react";
import Animated, {
  useSharedValue,
  FadeIn,
  FadeOut,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { router } from "expo-router";

import { Icon } from "@/assets/IconMap";
import { UnderlineButton, RoundedButton } from "@/components/Buttons";
import { RoundedInput } from "@/components/Inputs";
import { supabase } from "@/lib/supabase";
import { useGlobalContext } from "@/context/GlobalProvider";

// TODO: user has to sign up / in with an internet connection, but once signed should be added to async stoage

// Tells Supabase Auth to continuously refresh the session automatically if
// the app is in the foreground. When this is added, you will continue to receive
// `onAuthStateChange` events with the `TOKEN_REFRESHED` or `SIGNED_OUT` event
// if the user's session is terminated. This should only be registered once.
AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

type FormData = {
  email: string;
  password: string;
  repeatPassword: string;
};

const Enter = () => {
  const [loading, setLoading] = useState(false);
  const [formType, setFormType] = useState<null | "login" | "signup">(null);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { session, setSession, user } = useGlobalContext();

  const height = useSharedValue(340);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      height: withTiming(height.value, {
        duration: 300,
      }),
    };
  });

  const handleFormTypeChange = (type: "login" | "signup" | null) => {
    setFormType(type);
    height.value = !type ? 340 : 612;
  };

  async function signInWithEmail() {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw new Error(error.message);
      }
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function signUpWithEmail() {
    setLoading(true);

    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      console.log(session);

      if (error) {
        throw new Error(error.message);
      }

      if (!session) {
        throw new Error("No session");
      }

      setSession(session);

      // only if using email verification
      // if (!session) {
      //   Alert.alert("Please check your inbox for email verification!");
      // }
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async () => {
    if (!formType) return;

    if (formType === "login") {
      await signInWithEmail();
    } else {
      await signUpWithEmail();
    }
  };

  // logic for when user already logged in
  useEffect(() => {
    if (!session || !user) return;

    // case where user doesn't have required info
    if (user) {
      // // update when welcome page is ready
      // if (!user.username) {
      //   router.replace("/welcome");
      // } else {
      //   router.replace("/profile");
      // }

      router.replace("/profile");
    }
  }, [user]);

  return (
    <View className="bg-zinc-900 h-full relative justify-end">
      <View className="absolute top-12 left-0">
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => router.push("/")}
          className="w-full p-6 items-center flex-row gap-2"
        >
          <Icon name="dumbbell" size={24} color={"white"} />
          <Text className="text-white text-xl font-semibold">Logo</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior="padding">
        {!!formType && (
          <Animated.View
            entering={FadeIn.duration(300)}
            exiting={FadeOut.duration(500)}
          >
            <TouchableOpacity
              onPress={() => handleFormTypeChange(null)}
              className="w-full flex-row items-center mb-6 px-6 gap-2"
            >
              <Icon color="#FFFFFF" name="arrow-left" />
              <Text className="text-white font-semibold">Back</Text>
            </TouchableOpacity>
          </Animated.View>
        )}

        <Animated.View
          style={[{ overflow: "hidden" }, animatedStyle]}
          className="w-full px-6 bg-background pb-16 pt-12 border-t-2 border-border"
        >
          {!!formType && (
            <View className="flex-col mb-12 gap-1">
              <Text className="text-4xl font-bold text-zinc-600">
                {formType === "login" ? "Log In" : "Sign Up"}
              </Text>
              <Text className="text-zinc-400">
                {formType === "login"
                  ? "Hey, welcome back... uhhh?"
                  : "Nice to meet you... umm?"}
              </Text>
            </View>
          )}

          {!formType && (
            <View className="flex-row items-center justify-center w-full gap-2 px-1">
              <RoundedButton
                buttonClasses="w-1/2 bg-zinc-950 border-zinc-950"
                textClasses="text-white"
                text="Login"
                onPress={() => handleFormTypeChange("login")}
              />
              <RoundedButton
                buttonClasses="w-1/2"
                textClasses="text-zinc-800"
                text="Sign Up"
                onPress={() => handleFormTypeChange("signup")}
              />
            </View>
          )}

          {!formType && (
            <>
              <View className="flex-row items-center py-8">
                <View className="flex-1 h-px bg-border" />
                <View>
                  <Text className="text-zinc-400 px-4">or</Text>
                </View>
                <View className="flex-1 h-px bg-border" />
              </View>

              <RoundedButton
                textClasses="text-zinc-800"
                text="Continue with Google"
                icon="google"
                iconPosition="far-left"
                iconColor="rgb(39 39 42)"
              />

              <RoundedButton
                buttonClasses="mt-2"
                textClasses="text-zinc-800"
                text="Continue with Apple"
                icon="apple"
                iconPosition="far-left"
                iconColor="rgb(39 39 42)"
              />
            </>
          )}

          {!!formType && (
            <>
              <>
                <RoundedInput
                  name="Email"
                  value={formData.email}
                  handleChange={(e) => setFormData({ ...formData, email: e })}
                  placeholder="Enter email..."
                />

                <RoundedInput
                  name="Password"
                  value={formData.password}
                  handleChange={(e) =>
                    setFormData({ ...formData, password: e })
                  }
                  placeholder="Enter password..."
                  type="password"
                  containerClasses="mt-4"
                />

                <View className="mt-4 h-24">
                  {formType === "signup" && (
                    <Animated.View
                      entering={FadeIn.duration(100)}
                      exiting={FadeOut.duration(100)}
                    >
                      <RoundedInput
                        name="Repeat password"
                        value={formData.repeatPassword}
                        handleChange={(e) =>
                          setFormData({ ...formData, repeatPassword: e })
                        }
                        placeholder="Repeat password..."
                        type="password"
                      />
                    </Animated.View>
                  )}
                </View>
              </>

              <Animated.View exiting={FadeOut.duration(300)}>
                <UnderlineButton
                  text={
                    formType === "login"
                      ? "Don't have an account?"
                      : "Already have an account?"
                  }
                  textClasses="text-zinc-400 font-normal"
                  buttonClasses="mt-16 mb-2"
                  onPress={() =>
                    handleFormTypeChange(
                      formType === "login" ? "signup" : "login"
                    )
                  }
                />
                <RoundedButton
                  onPress={handleSubmit}
                  disabled={loading}
                  buttonClasses="mt-2 bg-zinc-950 border-zinc-950"
                  textClasses="text-white"
                  text="Continue"
                />
              </Animated.View>
            </>
          )}
        </Animated.View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default Enter;
