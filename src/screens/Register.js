import { View, StyleSheet, Text } from "react-native";
import { TextInput, Card, Button, Title } from "react-native-paper";
import { basic, dark } from "../default/colors";
import Alert from "../components/Alert";
import database from "../storage/firebase";
import { getDatabase, ref, set } from "firebase/database";
import React, { useState, useEffect } from "react";

const Login = () => {
  const initalState = {
    mail: "",
    pwd: "",
    contact: "",
  };

  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleRegister = () => {
    if (form.mail === "" || form.contact === "" || form.pwd === "")
      setAlert("Fields are empty!");
    else if (form.pwd.length < 5) setAlert("Password length mismatched!");
    else if (form.contact.length < 10) setAlert("Contact length mismatched!");
    else {
      const db = getDatabase();

      set(ref(db, "users/" + form.mail), {
        pwd: form.pwd,
        contact: form.contact,
      });

      setForm(initalState);
      setAlert("User registered!");
    }
  };

  return (
    <>
      <View style={styles.container}>
        {alert ? (
          <Alert alert={alert} setAlert={setAlert} />
        ) : (
          <Card style={{ padding: 20 }}>
            <Title
              style={{
                textAlign: "center",
                color: basic,
                marginVertical: 10,
                textTransform: "uppercase",
              }}
            >
              Create Account
            </Title>

            <TextInput
              mode="outlined"
              value={form.mail}
              label="Email address"
              placeholder="Enter email"
              // style={{ marginBottom: 10 }}
              outlineColor={basic}
              activeOutlineColor={dark}
              onChangeText={(text) => setForm({ ...form, mail: text })}
            />

            <TextInput
              mode="outlined"
              value={form.contact}
              label="Contact"
              placeholder="Enter contact number"
              // style={{ marginBottom: 10 }}
              outlineColor={basic}
              activeOutlineColor={dark}
              keyboardType="numeric"
              maxLength={10}
              right={<TextInput.Affix text="/10" />}
              onChangeText={(num) => setForm({ ...form, contact: num })}
            />

            <TextInput
              mode="outlined"
              value={form.pwd}
              label="Password"
              secureTextEntry
              placeholder="Enter secret code"
              outlineColor={basic}
              activeOutlineColor={dark}
              onChangeText={(text) => setForm({ ...form, pwd: text })}
            />
            <Text style={{ fontWeight: "bold", color: "red" }}>
              Enter aleast 5 characters
            </Text>

            <Button
              icon="import"
              mode="contained"
              style={{ marginTop: 20, padding: "2%" }}
              color={basic}
              onPress={handleRegister}
            >
              Register !
            </Button>

            {/* <Text style={{ marginVertical: 10 }}>
            Already a user,{" "}
            <Text
              style={{ fontWeight: "bold", color: "red" }}
              onPress={() => navigation.navigate("Login")}
            >
              Sign in
            </Text>
          </Text> */}
          </Card>
        )}
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
