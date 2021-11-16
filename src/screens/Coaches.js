import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getDatabase, ref, onValue } from "firebase/database";
import { Button, Card, Title, Paragraph } from "react-native-paper";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    async function fetchCoachList() {
      try {
        const db = getDatabase();
        const guidesRef = ref(db, "coaches/");
        onValue(guidesRef, (snapshot) => {
          const data = snapshot.val();
          setCoaches(data);
        });
      } catch (error) {
        console.error(error);
      }
    }

    fetchCoachList();
  }, []);

  console.log({ coaches });

  return (
    <View style={styles.container}>
      {Object.keys(coaches).map((item) => {
        return (
          <View style={styles.item} key={item}>
            <Card>
              <Card.Title title={item.toUpperCase()} subtitle="Card Subtitle" />
              <Card.Content>
                <Title>{item}</Title>
                <Paragraph>{coaches[item].contact}</Paragraph>
              </Card.Content>
              <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
              <Card.Actions>
                <Button>Cancel</Button>
                <Button>Book</Button>
              </Card.Actions>
            </Card>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start", // if you want to fill rows left to right
  },
  item: {
    width: "50%", // is 50% of container width
  },
});

export default Coaches;
