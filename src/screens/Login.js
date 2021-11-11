import { View, StyleSheet, Text } from "react-native";
import { TextInput, Card, Button, Title } from "react-native-paper";
import { basic, dark } from "../default/colors";
import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { getDatabase, ref, onValue } from "firebase/database";

const Login = ({ navigation }) => {
  const initalState = {
    mail: "",
    pwd: "",
  };

  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleLogin = () => {
    if (form.mail !== "" && form.pwd !== "") {
      const db = getDatabase();
      let details = form.mail.split("@");
      let userId = details[0];

      onValue(
        ref(db, "/users/" + userId),
        (snapshot) => {
          if (form.pwd === snapshot.val().pwd) {
            setAlert("Logged in successfully..");
          }
        },
        {
          onlyOnce: true,
        }
      );
    } else setAlert("Missing Fields!");
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
              Sign in to continue..
            </Title>

            <TextInput
              mode="outlined"
              label="Email address"
              value={form.mail}
              placeholder="Enter email"
              // style={{ marginBottom: 10 }}
              outlineColor={basic}
              activeOutlineColor={dark}
              onChangeText={(text) => setForm({ ...form, mail: text })}
              // right={<TextInput.Affix text="/100" />}
            />
            <TextInput
              mode="outlined"
              value={form.pwd}
              label="Password"
              placeholder="Enter secret code"
              outlineColor={basic}
              activeOutlineColor={dark}
              onChangeText={(code) => setForm({ ...form, pwd: code })}
            />

            <Button
              icon="import"
              mode="contained"
              style={{ marginTop: 20, padding: "2%" }}
              color={basic}
              onPress={handleLogin}
            >
              Log me in !
            </Button>

            <Text style={{ marginVertical: 10, fontSize: 16 }}>
              I m a new user,{" "}
              <Text
                style={{ fontWeight: "bold", color: "red" }}
                onPress={() => navigation.navigate("Register")}
              >
                Sign up.
              </Text>
            </Text>
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
