import { View, StyleSheet, Text } from "react-native";
import {
  TextInput,
  Card,
  Button,
  Title,
  RadioButton,
} from "react-native-paper";
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

  const [user, setUser] = useState(true);

  // User form for registration
  const [form, setForm] = useState(initalState);
  const [alert, setAlert] = useState("");

  // Coach form for registration

  const initialValue = {
    mail: "",
    pwd: "",
    contact: "",
    degree: "selected",
    slots: 1,
  };

  // cdata === coach data
  const [cdata, setCdata] = useState(initialValue);

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const handleChange = (value, attribute) => {
    if (user) {
      setForm({ ...form, [attribute]: value });
    } else {
      setCdata({ ...cdata, [attribute]: value });
    }
  };

  const registerCoach = () => {
    if (cdata.mail === "" || cdata.contact === "" || cdata.pwd === "")
      setAlert("Fields are empty!");
    else if (cdata.pwd.length < 5) setAlert("Password length mismatched!");
    else if (cdata.contact.length < 10) setAlert("Contact length mismatched!");
    else if (cdata.degree == "rejected") {
      setAlert("Not eligible!");
      setUser(true);
    } else {
      let data = cdata.mail.split("@");
      let coachId = data[0];
      const db = getDatabase();

      set(ref(db, "coaches/" + coachId), {
        pwd: cdata.pwd,
        contact: cdata.contact,
        eligible: true,
      });

      setCdata(initialValue);
      setAlert("Congrats on joining!");
    }
  };

  const registerUser = () => {
    if (form.mail === "" || form.contact === "" || form.pwd === "")
      setAlert("Fields are empty!");
    else if (form.pwd.length < 5) setAlert("Password length mismatched!");
    else if (form.contact.length < 10) setAlert("Contact length mismatched!");
    else {
      let uid = form.mail.split("@");
      const db = getDatabase();

      set(ref(db, "users/" + uid[0]), {
        pwd: form.pwd,
        contact: form.contact,
      });

      setForm(initalState);
      setAlert("User registered!");
    }
  };

  const handleRegister = () => {
    if (user) registerUser();
    else registerCoach();
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
              {user ? "Create an user account" : "Join as a coach"}
            </Title>

            <TextInput
              mode="outlined"
              value={user ? form.mail : cdata.mail}
              label="Email address"
              placeholder="Enter email"
              // style={{ marginBottom: 10 }}
              outlineColor={basic}
              activeOutlineColor={dark}
              onChangeText={(text) => handleChange(text, "mail")}
            />

            <TextInput
              mode="outlined"
              value={user ? form.contact : cdata.contact}
              label="Contact"
              placeholder="Enter contact number"
              // style={{ marginBottom: 10 }}
              outlineColor={basic}
              activeOutlineColor={dark}
              keyboardType="numeric"
              maxLength={10}
              right={<TextInput.Affix text="/10" />}
              onChangeText={(num) => handleChange(num, "contact")}
            />

            <TextInput
              mode="outlined"
              value={user ? form.pwd : cdata.pwd}
              label="Password"
              secureTextEntry
              placeholder="Enter secret code"
              outlineColor={basic}
              activeOutlineColor={dark}
              onChangeText={(text) => handleChange(text, "pwd")}
            />
            <Text style={{ fontWeight: "bold", color: "red", marginBottom: 2 }}>
              Enter aleast 5 characters
            </Text>

            {!user && (
              <>
                <TextInput
                  mode="outlined"
                  value={cdata.slots}
                  label="Slots"
                  placeholder="Available slots"
                  // style={{ marginBottom: 10 }}
                  outlineColor={basic}
                  activeOutlineColor={dark}
                  keyboardType="numeric"
                  onChangeText={(num) => handleChange(num, "slots")}
                />
                <RadioButton.Group
                  onValueChange={(value) =>
                    setCdata({ ...cdata, degree: value })
                  }
                  value={cdata.degree}
                >
                  <RadioButton.Item
                    label="Degree in counselling"
                    value="selected"
                    color={dark}
                  />
                  <RadioButton.Item
                    label="Degree in others"
                    color={dark}
                    value="rejected"
                  />
                </RadioButton.Group>
              </>
            )}
            <Button
              icon="import"
              mode="contained"
              style={{ marginTop: 20, padding: "2%" }}
              color={basic}
              onPress={handleRegister}
            >
              Register !
            </Button>

            {user && (
              <Text style={{ marginVertical: 10 }}>
                Sign up as a{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    color: "#EA2027",
                    textTransform: "uppercase",
                  }}
                  onPress={() => setUser(!user)}
                >
                  Coach !
                </Text>
              </Text>
            )}
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
