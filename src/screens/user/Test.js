import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { onValue, ref } from "firebase/database";
import database from "../../storage/firebase";

const Test = () => {
  const [questionBank, setQuestionBank] = useState();

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

  const renderItem = ({ item }) => (
    <>
      <Text style={{ color: "white" }}>
        {item.id} {item.question}
      </Text>
    </>
  );

  console.log({ questionBank });
  return (
    <View>
      {questionBank && (
        <FlatList
          data={questionBank}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

export default Test;
