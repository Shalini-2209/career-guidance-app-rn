import React from "react";
import { View, StyleSheet } from "react-native";
import Routes from "./src/navigations/routes";
import MyTabs from "./src/navigations/tab-container";

export default function App() {
  return (
    <View style={styles.container}>
      <Routes />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
