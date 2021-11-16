import { View, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { TextInput, Card, Button, Title, Switch } from "react-native-paper";
import { basic, dark } from "../default/colors";
import React, { useState, useEffect } from "react";
import Alert from "../components/Alert";
import { getDatabase, ref, onValue } from "firebase/database";

const Login = ({ navigation, checkUser }) => {
  const initalState = {
    mail: "",
    pwd: "",
  };

  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");
  const [coach, setCoach] = useState(false);

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const storeUser = async (key) => {
    await AsyncStorage.setItem(key, form.mail);
  };

  const handleLogin = () => {
    if (form.mail !== "" && form.pwd !== "") {
      const db = getDatabase();
      let details = form.mail.split("@");
      let userId = details[0];

      if (coach) {
        onValue(
          ref(db, "/coaches/" + userId),
          (snapshot) => {
            if (form.pwd === snapshot.val().pwd) {
              storeUser("coach");
              setAlert("Logged in as coach..");
            }
          },
          {
            onlyOnce: true,
          }
        );
      } else {
        onValue(
          ref(db, "/users/" + userId),
          (snapshot) => {
            if (form.pwd === snapshot.val().pwd) {
              storeUser("user");
              checkUser();
              // setAlert("Logged in successfully..");
            } else setAlert("Invalid credentials..");
          },
          {
            onlyOnce: true,
          }
        );
      }
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
                fontWeight: "bold",
                fontSize: 20,
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
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <Text
                style={{
                  fontSize: 16,
                  color: basic,
                  marginRight: 25,
                  fontWeight: "bold",
                }}
              >
                Counsellor
              </Text>
              <Switch
                value={coach}
                onValueChange={() => setCoach(!coach)}
                color="#1289A7"
                style={{ alignSelf: "flex-end" }}
              />
            </View>

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
