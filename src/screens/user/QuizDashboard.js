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
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Card style={styles.card}>
        <FontAwesome5
          name="business-time"
          size={70}
          color={basic}
          style={{ textAlign: "center" }}
        />
        <Headline style={{ textAlign: "center" }}>Interests</Headline>
        <Subheading>
          See where your interests lie, and explore what type of jobs would suit
          you well.
        </Subheading>
        <Divider style={{ marginVertical: 10 }} />

        <View style={{ alignItems: "center" }}>
          <Button
            mode="contained"
            style={styles.testBtn}
            color={dark}
            onPress={() => navigation.push("Test")}
          >
            Start a test
          </Button>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: "5%",
    padding: 10,
  },

  testBtn: {
    padding: "2%",
    width: "40%",
  },
});

export default Quiz;
