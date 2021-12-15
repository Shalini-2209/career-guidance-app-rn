import Login from "../screens/Login";
import React, { useState } from "react";
import { basic } from "../default/colors";
import Coaches from "../screens/user/Coaches";
import Headlines from "../screens/user/Headlines";
import Profile from "../screens/coach/Profile";
import MyBookings from "../screens/user/MyBookings";
import Quiz from "../screens/user/QuizDashboard";
import Videos from "../screens/user/Videos";
import Sessions from "../screens/coach/Sessions";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Menu, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function MyTabs({ role, checkUser }) {
  // Menu
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(role);
    checkUser();
  };

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
          <Tab.Screen
            name="Videos"
            component={Videos}
            options={{
              tabBarLabel: "Videos",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="video" size={24} color={basic} />
              ),
            }}
          />

          <Tab.Screen
            name="Take a quiz"
            component={Quiz}
            options={{
              tabBarLabel: "Quiz",
              tabBarLabelStyle: { color: "white" },
              tabBarIcon: () => (
                <FontAwesome5 name="check-square" size={24} color={basic} />
              ),
            }}
          />
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
            component={MyBookings}
            options={{
              tabBarLabel: "My Bookings",
              headerRight: () => (
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color="white"
                      style={{ marginRight: 10 }}
                      onPress={openMenu}
                    />
                  }
                >
                  <Menu.Item onPress={closeMenu} title="Close" />
                  <Divider />
                  <Menu.Item onPress={handleLogout} title="Sign out" />

                  {/* <Menu.Item onPress={() => {}} title="Item 3" /> */}
                </Menu>
              ),
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
            component={Profile}
            options={{
              tabBarLabel: "Profile",
              tabBarLabelStyle: { color: "white" },
              headerRight: () => (
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  anchor={
                    <Entypo
                      name="dots-three-vertical"
                      size={20}
                      color="white"
                      style={{ marginRight: 10 }}
                      onPress={openMenu}
                    />
                  }
                >
                  <Menu.Item onPress={closeMenu} title="Close" />
                  <Divider />
                  <Menu.Item onPress={handleLogout} title="Sign out" />
                </Menu>
              ),
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
