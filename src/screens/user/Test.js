import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { onValue, ref } from "firebase/database";
import {
  RadioButton,
  Headline,
  Subheading,
  Button,
  Card,
  Divider,
} from "react-native-paper";
import database from "../../storage/firebase";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { basic, dark } from "../../default/colors";

const Test = ({ navigation }) => {
  const [questionBank, setQuestionBank] = useState();
  const [index, setIndex] = useState(0);
  const [checked, setChecked] = useState();
  const [fields, setFields] = useState({
    cs: 1,
    mba: 1,
  });

  useEffect(() => {
    const fetchQuestions = () => {
      const cref = ref(database, "questions/");
      onValue(cref, (snapshot) => {
        const data = snapshot.val();
        setQuestionBank(data);
      });
    };

    fetchQuestions();
  }, []);

  const handleInterested = (chosenField) => {
    setChecked("first");

    console.log({ chosenField });

    if (chosenField === "Computer Science")
      setFields({ ...fields, cs: fields.cs + 1 });
    else if (chosenField === "Management")
      setFields({ ...fields, mba: fields.mba + 1 });

    handleNext();

    console.log({ fields });
  };

  const handleNotInterested = () => {
    setChecked("second");
    handleNext();
  };

  const handleNext = () => {
    setIndex(index + 1);
    setChecked("");

    // console.log({ index });

    if (index === 9) {
      if (fields.cs > fields.mba)
        navigation.navigate("Result", {
          result: "Computer Science",
        });
      else if (fields.cs < fields.mba)
        navigation.navigate("Result", { result: "Management Studies" });
      else
        navigation.navigate("Result", {
          result: "neither of the courses offered.",
        });
    }
  };

  // console.log({ questionBank });
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {questionBank && index < 10 && (
        <Card style={styles.card}>
          <View style={styles.fixRow}>
            <MaterialCommunityIcons
              name="crosshairs-question"
              size={35}
              color={basic}
              style={{ marginBottom: 5 }}
            />

            <Headline style={{ textAlign: "center", marginLeft: 7 }}>
              Question {questionBank[index].id}
            </Headline>
          </View>
          <Subheading style={{ marginBottom: 5 }}>
            {questionBank[index].question}
          </Subheading>

          <View>
            <View style={styles.fixRow}>
              <RadioButton
                value="first"
                status={checked === "first" ? "checked" : "unchecked"}
                onPress={() => handleInterested(questionBank[index].field)}
                color={basic}
              />
              <Text style={styles.options}>Interested</Text>
            </View>

            <View style={styles.fixRow}>
              <RadioButton
                value="second"
                status={checked === "second" ? "checked" : "unchecked"}
                onPress={handleNotInterested}
                color={basic}
              />
              <Text style={styles.options}>Not interested</Text>
            </View>
          </View>

          <Divider style={{ margin: "2%" }} />

          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              mode="contained"
              style={styles.testBtn}
              color={dark}
              onPress={handleNext}
            >
              Skip
            </Button>
          </View>
        </Card>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  fixRow: { flexDirection: "row", flexWrap: "wrap" },

  options: { color: "white", marginTop: 10 },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // margin: 2,
  },

  card: {
    // margin: 15,
    textAlign: "center",
    padding: 10,
    width: "80%",
    // height: "35%",
  },

  testBtn: {
    // marginVertical: 20,
    padding: "2%",
    width: "45%",
    // alignContent: "center",
  },
});

export default Test;
