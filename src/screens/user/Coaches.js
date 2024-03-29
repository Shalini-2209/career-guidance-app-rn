import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import Alert from "../../components/Alert";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, ref, onValue, set, update } from "firebase/database";
import { Button, Card, Paragraph } from "react-native-paper";

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [alert, setAlert] = useState("");
  const db = getDatabase();

  useEffect(() => {
    <Alert alert={alert} setAlert={setAlert} />;
  }, [alert]);

  const saveMyBooking = async (selectedCoach) => {
    let uid = await AsyncStorage.getItem("user");

    let bookingId = Date.now();
    let today = new Date();
    let frameDate =
      today.getDate() + "/" + today.getMonth() + "/" + today.getFullYear();

    set(ref(db, "bookings/" + uid + "/" + bookingId), {
      name: selectedCoach,
      date: frameDate,
    });

    set(ref(db, "bookings/" + selectedCoach + "/" + bookingId), {
      name: uid,
      date: frameDate,
    });
  };

  const handleBooking = (selectedCoach) => {
    let curRef = ref(db, "coaches/" + selectedCoach);
    let details;

    onValue(curRef, (snapshot) => {
      details = snapshot.val();
    });

    saveMyBooking(selectedCoach);

    update(curRef, { slots: details.slots - 1 })
      .then(() => {
        setAlert("Booked successfully!");
      })
      .catch((error) => {
        console.error("Update failed ! " + error);
      });
  };

  useEffect(() => {
    async function fetchCoachList() {
      try {
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

  return (
    <>
      {alert ? (
        <Alert alert={alert} setAlert={setAlert} />
      ) : (
        <ScrollView style={{ flexGrow: 1 }}>
          <View style={styles.container}>
            {Object.keys(coaches).map((item) => {
              return (
                <View style={styles.item} key={item}>
                  {coaches[item].slots > 0 && (
                    <Card style={{ margin: 2 }}>
                      <Card.Title
                        title={item.toUpperCase()}
                        subtitle={"Available slots:" + coaches[item].slots}
                      />

                      <Card.Content>
                        <Paragraph>{coaches[item].contact}</Paragraph>
                      </Card.Content>
                      <Card.Cover source={{ uri: coaches[item].image }} />
                      <Card.Actions>
                        <Button>Cancel</Button>
                        <Button onPress={() => handleBooking(item)}>
                          Book
                        </Button>
                      </Card.Actions>
                    </Card>
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </>
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
