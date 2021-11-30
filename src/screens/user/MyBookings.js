import { ScrollView, Text, View } from "react-native";
import { List, Button, Drawer } from "react-native-paper";
import { onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { getRef } from "../../services/api-services";
import { basic, dark } from "../../default/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MyBookings = ({ checkUser }) => {
  // booked sessions
  const [bookings, setBookings] = useState([]);
  const [active, setActive] = React.useState("");

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
    <ScrollView style={{ flexGrow: 1 }}>
      <Drawer.Section title="Some title">
        <Drawer.Item
          label="First Item"
          active={active === "first"}
          onPress={() => setActive("first")}
        />
        <Drawer.Item
          label="Second Item"
          active={active === "second"}
          onPress={() => setActive("second")}
        />
      </Drawer.Section>
      {bookings ? (
        Object.keys(bookings).map((elt) => {
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
        })
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <MaterialCommunityIcons
            name="emoticon-sad-outline"
            size={85}
            color="#bdc3c7"
          />
          <Text style={{ color: "#95a5a6", fontSize: 20 }}>Whoops !</Text>
          <Text style={{ color: "#95a5a6", fontSize: 17 }}>
            You haven't booked a session yet. 
          </Text>
        </View>
      )}
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
