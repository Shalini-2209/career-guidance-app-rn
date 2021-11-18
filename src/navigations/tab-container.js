import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Coaches from "../screens/user/Coaches";
import Headlines from "../screens/user/Headlines";
import Profile from "../screens/coach/Profile";
import MyBookings from "../screens/user/MyBookings";
import Videos from "../screens/user/Videos";
import Sessions from "../screens/coach/Sessions";
import Login from "../screens/Login";

const Tab = createBottomTabNavigator();

export default function MyTabs({ role, checkUser }) {
  const ProfileWithProps = () => <Profile checkUser={checkUser} />;

  const MyBookingsWithProps = () => <MyBookings checkUser={checkUser} />;

  const LoginWithProps = ({ navigation }) => (
    <Login navigation={navigation} checkUser={checkUser} />
  );

  return (
    <Tab.Navigator>
      {role === "user" && (
        <>
          <Tab.Screen name="Articles" component={Headlines} />
          {/* <Tab.Screen name="Videos" component={Videos} /> */}
          <Tab.Screen name="Coaches" component={Coaches} />
          <Tab.Screen name="My Bookings" component={MyBookingsWithProps} />
        </>
      )}

      {role === "coach" && (
        <>
          <Tab.Screen name="Profile" component={ProfileWithProps} />
          <Tab.Screen name="Sessions" component={Sessions} />
        </>
      )}

      {role === "" && <Tab.Screen name="Login" component={LoginWithProps} />}
    </Tab.Navigator>
  );
}
