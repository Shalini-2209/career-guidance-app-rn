import React, { useContext, useState } from "react";
import Headlines from "../screens/user/Headlines";
import Coaches from "../screens/user/Coaches";
import Videos from "../screens/user/Videos";
import MyBookings from "../screens/user/MyBookings";
import { Menu, Divider } from "react-native-paper";
import { basic } from "../default/colors";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GetRoleContext, RoleContext } from "../contexts/RoleProvider";
import QuizStack from "./QuizStack";

const Tab = createBottomTabNavigator();

const UserStack = () => {
  // Menu
  const [visible, setVisible] = useState(false);
  const checkUser = useContext(GetRoleContext);
  const role = useContext(RoleContext);

  const openMenu = () => setVisible(true);

  const closeMenu = () => setVisible(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem(role);
    checkUser();
  };
  return (
    <Tab.Navigator>
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
        component={QuizStack}
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
    </Tab.Navigator>
  );
};

export default UserStack;
