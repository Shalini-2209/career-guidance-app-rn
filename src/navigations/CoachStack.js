import React, { useState, useContext } from "react";
import { basic } from "../default/colors";
import Profile from "../screens/coach/Profile";
import Sessions from "../screens/coach/Sessions";
import { FontAwesome5, Entypo } from "@expo/vector-icons";
import { Menu, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { GetRoleContext, RoleContext } from "../contexts/RoleProvider";

const Tab = createBottomTabNavigator();

const CoachStack = () => {
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
    </Tab.Navigator>
  );
};

export default CoachStack;
