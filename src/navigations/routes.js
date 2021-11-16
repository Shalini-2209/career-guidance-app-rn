import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Headlines from "../screens/Headlines";
import MyTabs from "./tab-container";
import Register from "../screens/Register";
import Login from "../screens/Login";

const Stack = createNativeStackNavigator();

function Routes() {
  const [role, setRole] = useState("");

  const LoginWithProps = ({ navigation }) => (
    <Login navigation={navigation} checkUser={checkUser} />
  );

  const MyTabsWithProps = () => {
    return <MyTabs role={role} />;
  };

  const checkUser = async () => {
    let user = await AsyncStorage.getItem("user");
    let coach = await AsyncStorage.getItem("coach");

    if (coach) {
      setRole("coach");
    } else if (user) setRole("user");
    // else setRole("");
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {/* Call modules with the name specified in Stack.Screen */}
          {!role && (
            <>
              <Stack.Screen name="Login" component={LoginWithProps} />
              <Stack.Screen name="Register" component={Register} />
            </>
          )}

          <Stack.Screen
            name="Tabs"
            component={MyTabsWithProps}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Articles" component={Headlines} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Routes;
