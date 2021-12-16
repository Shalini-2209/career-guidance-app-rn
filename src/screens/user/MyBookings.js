import { ScrollView } from "react-native";
import { List } from "react-native-paper";
import { onValue } from "firebase/database";
import React, { useState, useEffect } from "react";
import { getRef } from "../../services/api-services";
import { dark } from "../../default/colors";
import Error from "../../components/Error";

const MyBookings = () => {
  // booked sessions
  const [bookings, setBookings] = useState([]);

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
    <>
      {bookings ? (
        <ScrollView style={{ flexGrow: 1 }}>
          {Object.keys(bookings).map((elt) => {
            return (
              // <ScrollView style={{ flexGrow: 1 }} key={bookings[elt].name}>
              <List.Item
                title={"Meet your career counsellor " + bookings[elt].name}
                key={bookings[elt].name}
                description={"Booking Date: " + bookings[elt].date}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="account-circle"
                    style={{
                      backgroundColor: dark,
                      // borderRadius: "50%",
                    }}
                    color="white"
                  />
                )}
              />
              //  {/* </ScrollView> */}
            );
          })}
        </ScrollView>
      ) : (
        <Error errorMsg="You haven't booked a session yet." />
      )}
    </>
  );
};

export default MyBookings;
