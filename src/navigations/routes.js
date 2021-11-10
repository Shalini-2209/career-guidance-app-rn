// In App.js in a new project

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Headlines from "../screens/Headlines";
import MyTabs from "./tab-container";
import Register from "../screens/Register";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Call modules with the name specified in Stack.Screen */}
          <Stack.Screen
            name="Tabs"
            component={MyTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Articles" component={Headlines} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;
