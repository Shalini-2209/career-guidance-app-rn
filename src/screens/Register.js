import { View, StyleSheet, Text } from "react-native";
import { TextInput, Card, Button, Title } from "react-native-paper";
import { basic, dark } from "../default/colors";
import Alert from "../components/Alert";
import React, { useState, useEffect } from "react";

const Login = ({ navigation }) => {
  const initalState = {
    name: "",
    pwd: "",
    contact: "",
  };

  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleRegister = () => {};

  return (
    <>
      <View style={styles.container}>
        <Card style={{ padding: 20 }}>
          <Title
            style={{ textAlign: "center", color: dark, marginVertical: 5 }}
          >
            Create Account
          </Title>

          <TextInput
            mode="outlined"
            label="Email address"
            placeholder="Enter email"
            // style={{ marginBottom: 10 }}
            outlineColor={basic}
            activeOutlineColor={dark}
          />

          <TextInput
            mode="outlined"
            label="Contact"
            placeholder="Enter contact number"
            // style={{ marginBottom: 10 }}
            outlineColor={basic}
            activeOutlineColor={dark}
            keyboardType="numeric"
            right={<TextInput.Affix text="/10" />}
          />

          <TextInput
            mode="outlined"
            k
            label="Password"
            placeholder="Enter secret code"
            outlineColor={basic}
            activeOutlineColor={dark}
          />

          <Button
            icon="import"
            mode="contained"
            style={{ marginTop: 20, padding: "2%" }}
            color={basic}
            onPress={handleRegister}
          >
            Register !
          </Button>

          <Text style={{ marginVertical: 10 }}>
            Already a user,{" "}
            <Text
              style={{ fontWeight: "bold", color: "red" }}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Text>
          </Text>
        </Card>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 30,
    // alignItems: "center",
    justifyContent: "center",
    // width: "75%",
    height: "100%",
  },
});

export default Login;
