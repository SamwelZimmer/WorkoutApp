import { createStackNavigator } from "@react-navigation/stack";
import JournalScreen from "./index";
import ExercisesScreen from "./exercises/index";

const Stack = createStackNavigator();

export const JournalStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="JournalHome"
        component={JournalScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Exercises" component={ExercisesScreen} />
    </Stack.Navigator>
  );
};
