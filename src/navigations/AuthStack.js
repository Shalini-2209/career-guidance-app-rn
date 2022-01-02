import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login";
import Register from "../screens/Register";
import { LoadContext } from "../contexts/RoleProvider";
import Loading from "../components/Loading";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const loading = useContext(LoadContext);
  return (
    <>
      {!loading ? (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AuthStack;
