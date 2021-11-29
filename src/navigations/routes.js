import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Headlines from "../screens/user/Headlines";
import MyTabs from "./tab-container";
import Register from "../screens/Register";
import Login from "../screens/Login";
import Profile from "../screens/coach/Profile";

const Stack = createNativeStackNavigator();

function Routes() {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const LoginWithProps = ({ navigation }) => (
    <Login navigation={navigation} checkUser={checkUser} />
  );

  const MyTabsWithProps = () => {
    return <MyTabs role={role} checkUser={checkUser} />;
  };

  const Loading = () => {
    return <ActivityIndicator animating={true} color="#1e3799" />;
  };

  const checkUser = async () => {
    let user = await AsyncStorage.getItem("user");
    let coach = await AsyncStorage.getItem("coach");

    if (coach) {
      setRole("coach");
    } else if (user) setRole("user");
    else setRole("");
    setLoading(false);
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <PaperProvider theme={PaperDarkTheme}>
      {!loading ? (
        <NavigationContainer theme={DarkTheme}>
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
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <Loading />
      )}
    </PaperProvider>
  );
}

export default Routes;
