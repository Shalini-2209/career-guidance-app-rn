import { View, StyleSheet, Text } from "react-native";
import { TextInput, Card, Button, Title } from "react-native-paper";
import { basic, dark } from "../default/colors";
import React from "react";

const Login = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <Card style={{ padding: 20 }}>
          <Title
            style={{ textAlign: "center", color: dark, marginVertical: 5 }}
          >
            Sign in to continue..
          </Title>

          <TextInput
            mode="outlined"
            label="Email address"
            placeholder="Enter email"
            // style={{ marginBottom: 10 }}
            outlineColor={basic}
            activeOutlineColor={dark}

            // right={<TextInput.Affix text="/100" />}
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
            onPress={() => console.log("Pressed")}
          >
            Log me in !
          </Button>

          <Text style={{ marginVertical: 10 }}>
            I m a new user,{" "}
            <Text
              style={{ fontWeight: "bold", color: "red" }}
              onPress={() => navigation.navigate("Register")}
            >
              Sign up
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
