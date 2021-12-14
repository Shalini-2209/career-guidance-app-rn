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

const QuizResult = ({ route, navigation }) => {
  const { result } = route.params;

  console.log({ route });

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
          Quiz Result
        </Headline>
        <Subheading style={{ marginBottom: 4 }}>
          You are interested in {JSON.stringify(result)}
        </Subheading>
        <Divider />

        <View style={styles.container}>
          <Button
            mode="contained"
            style={styles.homeBtn}
            color={dark}
            onPress={() => navigation.navigate("Tabs")}
          >
            Home
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

  homeBtn: {
    marginTop: 20,
    padding: "2%",
    marginBottom: 2,
    width: "45%",
  },
});

export default QuizResult;
