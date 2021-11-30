import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { basic } from "../default/colors";
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
          <Tab.Screen
            name="Articles"
            component={Headlines}
            options={{
              tabBarLabel: "Articles",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="newspaper" size={24} color={basic} />
              ),
            }}
          />
          {/* <Tab.Screen
            name="Videos"
            component={Videos}
            options={{
              tabBarLabel: "Videos",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="video" size={24} color={basic} />
              ),
            }}
          /> */}
          <Tab.Screen
            name="Coaches"
            component={Coaches}
            options={{
              tabBarLabel: "Coaches",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="users" size={24} color={basic} />
              ),
            }}
          />
          <Tab.Screen
            name="My Bookings"
            component={MyBookingsWithProps}
            options={{
              tabBarLabel: "My Bookings",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="user-circle" size={24} color={basic} />
              ),
            }}
          />
        </>
      )}

      {role === "coach" && (
        <>
          <Tab.Screen
            name="Profile"
            component={ProfileWithProps}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="user-circle" size={24} color={basic} />
              ),
            }}
          />
          <Tab.Screen
            name="Sessions"
            component={Sessions}
            options={{
              tabBarLabel: "Sessions",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="book-reader" size={24} color={basic} />
              ),
            }}
          />
        </>
      )}

      {role === "" && <Tab.Screen name="Login" component={LoginWithProps} />}
    </Tab.Navigator>
  );
}
