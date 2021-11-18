import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { onValue } from "firebase/database";
import { dark } from "../../default/colors";
import React, { useState, useEffect } from "react";
import { getRef } from "../../services/api-services";

const Sessions = () => {
  // booked sessions
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let curRef = await getRef("bookings/", "coach");
      onValue(curRef, (snapshot) => {
        setBookings(snapshot.val());
      });
    };
    fetchData();
  }, []);

  console.log(bookings);

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: "white" }}>
      {Object.keys(bookings).map((elt) => {
        return (
          <List.Item
            key={bookings[elt].name}
            title={bookings[elt].name + " is waiting for your session"}
            description={"Session time: " + bookings[elt].date}
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
          />
        );
      })}
    </ScrollView>
  );
};

export default Sessions;
