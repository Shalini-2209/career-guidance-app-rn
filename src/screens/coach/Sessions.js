import { ScrollView, StyleSheet } from "react-native";
import { List, Surface } from "react-native-paper";
import database from "../../storage/firebase";
import { ref, onValue, update, remove } from "firebase/database";
import { dark } from "../../default/colors";
import React, { useState, useEffect } from "react";
import { getRef } from "../../services/api-services";
import { sendEmail } from "../../services/sendEmail";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Error from "../../components/Error";

const Sessions = () => {
  // booked sessions
  const [bookings, setBookings] = useState(null);
  const db = database;

  useEffect(() => {
    const fetchData = async () => {
      const curRef = await getRef("bookings/", "coach");
      onValue(curRef, (snapshot) => {
        if (snapshot.exists()) setBookings(snapshot.val());
      });
    };
    fetchData();
  }, []);

  const deleteBooking = (uid, cid, bookingId) => {
    const userRef = ref(db, "/bookings/" + uid + "/" + bookingId);
    const coachRef = ref(db, "/bookings/" + cid + "/" + bookingId);

    remove(userRef);
    // .then(() => {
    //   console.log("Deleted");
    // })
    // .catch((error) => {
    //   console.log({ error });
    // });
    remove(coachRef);
  };

  const handleCompletedSession = async (uname, bookingId) => {
    const cid = await AsyncStorage.getItem("coach");
    const url = "coaches/" + cid + "/slots";

    const newRef = ref(db, url);

    onValue(
      newRef,
      (snapshot) => {
        let available = snapshot.val() + 1;
        // console.log(available);
        update(ref(db, "coaches/" + cid + "/"), { slots: available })
          .then(() => {
            console.log("Updated");
          })
          .catch((error) => {
            throw new Error(error);
          });
      },
      {
        onlyOnce: true,
      }
    );

    deleteBooking(uname, cid, bookingId);
  };

  const handleMeeting = (name, bookingId) => {
    onValue(ref(db, "/users/" + name), (snapshot) => {
      let mail = snapshot.val().email;
      sendEmail(
        mail,
        "Career guidance Meeting Invitation ",
        " We invite you to a meeting which will last approximately an hour."
      ).then(() => {
        handleCompletedSession(name, bookingId);
      });
    });
  };
  return (
    <>
      {bookings ? (
        <ScrollView style={{ flexGrow: 1 }}>
          {Object.keys(bookings).map((elt) => {
            return (
              <Surface style={styles.surface} key={bookings[elt].name}>
                <List.Item
                  title={bookings[elt].name + " is waiting for your session"}
                  description="Click here to send meeting link..."
                  descriptionNumberOfLines={1}
                  descriptionEllipsizeMode="tail"
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="account-circle"
                      style={{
                        backgroundColor: dark,
                        borderRadius: "50%",
                      }}
                      color="white"
                    />
                  )}
                  onPress={() => handleMeeting(bookings[elt].name, elt)}
                />
              </Surface>
            );
          })}
        </ScrollView>
      ) : (
        <Error errorMsg="No upcoming sessions. " />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  surface: {
    marginBottom: 2,
    elevation: 5,
  },
});

export default Sessions;
