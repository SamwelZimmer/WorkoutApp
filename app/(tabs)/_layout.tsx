import { View } from "react-native";
import React from "react";
import { Icon } from "@/assets/IconMap";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import Exercises from "@/app/screens/Exercises";
import Journal from "@/app/screens/Journal";
import Stats from "@/app/screens/Stats";
import Home from "@/app/screens/Home";
import Profile from "./profile";

interface TabIconProps {
  icon: string;
  name: string;
  focused: boolean;
}

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabIcon = ({ icon, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 relative pt-4">
      <Icon
        name={icon}
        size={24}
        color={focused ? "rgb(39 39 42)" : "rgb(161 161 170)"}
      />

      {/* hidden to get accurate sizing */}
      {/* <Text className={`font-semibold text-xs opacity-0`}>{name}</Text>
      <Text
        className={`absolute bottom-0 left-0 text-center ${
          focused ? "font-semibold text-orange-400" : "text-blue-400 font-black"
        } text-xs `}
      >
        {name}
      </Text> */}
    </View>
  );
};

// style={{
//   position: "absolute",
//   bottom: 0,
//   left: 0,
//   right: 0,
//   textAlign: "center",
//   fontSize: 10,
//   fontWeight: focused ? "600" : "400",
// }}

const TabsLayout = () => {
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: {
            display: "none",
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: "",
            header: () => <></>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"home"} name="Home" focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Journal"
          options={{
            tabBarShowLabel: false,
            header: () => <></>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"notebook"} name="Journal" focused={focused} />
            ),
          }}
        >
          {() => (
            <Stack.Navigator>
              <Stack.Screen
                name="JournalScreen"
                component={Journal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Exercises"
                component={Exercises}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          )}
        </Tab.Screen>

        <Tab.Screen
          name="Stats"
          component={Stats}
          options={{
            tabBarLabel: "",
            header: () => <></>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"graph-up"} name="Stats" focused={focused} />
            ),
          }}
        />

        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarLabel: "",
            header: () => <></>,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon icon={"user"} name="Profile" focused={focused} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
  // return (
  //   <>
  //     <Tabs
  //       screenOptions={{
  //         tabBarShowLabel: false,
  //         tabBarActiveTintColor: "#FFFFFF",
  //         tabBarInactiveTintColor: "#FFFFFF",
  //         tabBarStyle: {
  //           backgroundColor: "#FFFFFF",
  //           borderTopWidth: 1,
  //           borderTopColor: "hsl(240 5.9% 90%)",
  //           height: 84,
  //         },
  //       }}
  //     >
  //       <Tabs.Screen
  //         name="home"
  //         options={{
  //           title: "Home",
  //           headerShown: false,
  //           tabBarIcon: ({ color, focused }) => (
  //             <TabIcon icon={"notebook"} name="Home" focused={focused} />
  //           ),
  //         }}
  //       />
  //       <Tabs.Screen
  //         name="journal"
  //         options={{
  //           title: "Journal",
  //           headerShown: false,
  //           tabBarIcon: ({ color, focused }) => (
  //             <TabIcon icon={"notebook"} name="Journal" focused={focused} />
  //           ),
  //         }}
  //       />
  //       <Tabs.Screen
  //         name="stats"
  //         options={{
  //           title: "Stats",
  //           headerShown: false,
  //           tabBarIcon: ({ color, focused }) => (
  //             <TabIcon icon={"notebook"} name="Stats" focused={focused} />
  //           ),
  //         }}
  //       />
  //       <Tabs.Screen
  //         name="profile"
  //         options={{
  //           title: "Profile",
  //           headerShown: false,
  //           tabBarIcon: ({ color, focused }) => (
  //             <TabIcon icon="notebook" name="Profile" focused={focused} />
  //           ),
  //         }}
  //       />
  //     </Tabs>
  //   </>
  // );
};

export default TabsLayout;
