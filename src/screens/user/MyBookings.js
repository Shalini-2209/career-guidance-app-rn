import { ScrollView } from "react-native";
import { List, Button } from "react-native-paper";
import { onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { getRef } from "../../services/api-services";
import { basic, dark } from "../../default/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyBookings = ({ checkUser }) => {
  // booked sessions
  const [bookings, setBookings] = useState([]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("user");
    checkUser();
  };

  useEffect(() => {
    const fetchData = async () => {
      let curRef = await getRef("bookings/", "user");
      onValue(curRef, (snapshot) => {
        setBookings(snapshot.val());
      });
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={{ flexGrow: 1, backgroundColor: "white" }}>
      {Object.keys(bookings).map((elt) => {
        return (
          <List.Item
            key={bookings[elt].name}
            title={"Meet your career counsellor " + bookings[elt].name}
            description={"Booking time: " + bookings[elt].date}
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
      <Button
        icon="account-arrow-right-outline"
        mode="contained"
        style={{ margin: 20, padding: "2%" }}
        color={basic}
        onPress={handleLogout}
      >
        Log out
      </Button>
    </ScrollView>
  );
};

export default MyBookings;
