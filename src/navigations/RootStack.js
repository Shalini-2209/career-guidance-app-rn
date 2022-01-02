import React from "react";
import MainStack from "./MainStack";
import {
  DarkTheme as PaperDarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import RoleProvider from "../contexts/RoleProvider";

export default function RootStack() {
  // const role = useContext(RoleContext);

  return (
    <PaperProvider theme={PaperDarkTheme}>
      <RoleProvider>
        <NavigationContainer theme={NavigationDarkTheme}>
          <MainStack />
        </NavigationContainer>
      </RoleProvider>
    </PaperProvider>
  );
}
