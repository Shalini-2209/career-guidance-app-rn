import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Headlines from "../screens/Headlines";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Articles" component={Headlines} />
      <Tab.Screen name="Login" component={Login} />
      <Tab.Screen name="Register" component={Register} />
    </Tab.Navigator>
  );
}
