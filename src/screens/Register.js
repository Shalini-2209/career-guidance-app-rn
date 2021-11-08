import { Text, View, StyleSheet } from "react-native";
import React from "react";

const Register = () => {
  return (
    <View style={styles.container}>
      <Text>Register page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
