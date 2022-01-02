import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Quiz from "../screens/user/QuizDashboard";
import Test from "../screens/user/Test";
import QuizResult from "../screens/user/QuizResult";

const Stack = createNativeStackNavigator();

const QuizStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Test" component={Test} />
      <Stack.Screen name="Result" component={QuizResult} />
    </Stack.Navigator>
  );
};

export default QuizStack;
