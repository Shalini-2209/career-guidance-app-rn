import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Coaches from "../screens/Coaches";
import Headlines from "../screens/Headlines";
import Login from "../screens/Login";
import Videos from "../screens/Videos";

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Articles" component={Headlines} />
      {/* <Tab.Screen name="Videos" component={Videos} /> */}
      <Tab.Screen name="Coaches" component={Coaches} />
      <Tab.Screen name="My Bookings" component={Login} />
    </Tab.Navigator>
  );
}
