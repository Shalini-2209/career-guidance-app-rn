import React from "react";
import { View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {
  Headline,
  Subheading,
  Button,
  Card,
  Divider,
} from "react-native-paper";
import { basic, dark } from "../../default/colors";

const Quiz = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <FontAwesome5
          name="business-time"
          size={70}
          color={basic}
          style={{ marginBottom: 10 }}
        />
        <Headline style={{ marginBottom: 4, textAlign: "center" }}>
          Interests
        </Headline>
        <Subheading style={{ marginBottom: 4 }}>
          See where your interests lie, and explore what type of jobs would suit
          you well.
        </Subheading>
        <Divider />

        <View style={styles.container}>
          <Button
            mode="contained"
            style={styles.testBtn}
            color={dark}
            onPress={() => navigation.navigate("Test")}
          >
            Start a test
          </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 2,
  },

  card: {
    margin: 15,
    textAlign: "center",
    padding: 10,
  },

  testBtn: {
    marginTop: 20,
    padding: "2%",
    marginBottom: 2,
    width: "45%",
  },
});

export default Quiz;
