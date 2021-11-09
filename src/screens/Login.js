import { Text, View, StyleSheet } from "react-native";
import { TextInput, Button } from "react-native-paper";
import { basic, dark } from "../default/colors";
import React from "react";

const Login = () => {
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Email address"
        placeholder="Enter email"
        style={{ marginBottom: 10 }}
        outlineColor={basic}
        activeOutlineColor={dark}
        // right={<TextInput.Affix text="/100" />}
      />

      <TextInput
        mode="outlined"
        label="Password"
        placeholder="Enter secret code"
        outlineColor={basic}
        activeOutlineColor={dark}
      />

      <Button
        icon="import"
        mode="contained"
        style={{ marginTop: 20, padding: 5 }}
        color={basic}
        onPress={() => console.log("Pressed")}
      >
        Log me in !
      </Button>
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

export default Login;
