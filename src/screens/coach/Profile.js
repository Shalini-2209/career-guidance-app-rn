import { getRef } from "../../services/api-services";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import UpdateForm from "./UpdateForm";
import { Button, Avatar, Surface, Title, DataTable } from "react-native-paper";
import { onValue } from "firebase/database";
import { basic } from "../../default/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ checkUser }) => {
  const [details, setDetails] = new useState(null);
  const [showForm, setShowForm] = new useState(false);

  const handleLogout = async () => {
    await AsyncStorage.removeItem("coach");
    checkUser();
  };

  useEffect(() => {
    const fetchData = async () => {
      let curRef = await getRef("coaches/", "coach");
      onValue(curRef, (snapshot) => {
        setDetails(snapshot.val());
      });
    };
    fetchData();
  }, []);

  return (
    <>
      {showForm ? (
        <UpdateForm
          setShowForm={setShowForm}
          details={details}
          setDetails={setDetails}
        />
      ) : (
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            backgroundColor: "#ffff",
          }}
        >
          <ImageBackground
            source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_1K206nuBRkQFLSS0kWc9b7hr2AlXRGUZt8fL0nBWajfwcRSi0q4qqm6PEUzE9uHHXWQ&usqp=CAU"
            style={styles.main}
          >
            <Avatar.Image
              size={130}
              source={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyD3SI8Qdekp6twYtnVVcpKfHw7WVQGy9Yfd32EiXPZI30cEgXJ-XhquB0ObTnutlwQrM&usqp=CAU"
              }
            />
            {details && (
              <Title
                style={{
                  fontWeight: "bold",
                  alignItems: "center",
                  color: "white",
                }}
              >
                {details.cname.toUpperCase()}
              </Title>
            )}
          </ImageBackground>
          {details && (
            <>
              <Surface style={styles.surface}>
                {details && (
                  <>
                    <DataTable style={{ marginVertical: 4 }}>
                      <DataTable.Row>
                        <DataTable.Cell>Contact</DataTable.Cell>
                        <DataTable.Cell>{details.contact}</DataTable.Cell>
                      </DataTable.Row>

                      <DataTable.Row>
                        <DataTable.Cell>Qualification</DataTable.Cell>
                        <DataTable.Cell>
                          {details.qualification
                            ? details.qualification
                            : "Not yet filled"}
                        </DataTable.Cell>
                      </DataTable.Row>

                      <DataTable.Row>
                        <DataTable.Cell>Experience</DataTable.Cell>
                        <DataTable.Cell>
                          {details.experience
                            ? details.experience
                            : "Not yet filled"}
                        </DataTable.Cell>
                      </DataTable.Row>

                      <DataTable.Row>
                        <DataTable.Cell>Slots Available</DataTable.Cell>
                        <DataTable.Cell>{details.slots}</DataTable.Cell>
                      </DataTable.Row>
                    </DataTable>
                  </>
                )}
              </Surface>
            </>
          )}

          <View style={styles.btnContainer}>
            <View style={styles.item}>
              <Button
                icon="account-edit"
                mode="contained"
                style={{ marginTop: 20, padding: "2%" }}
                color={basic}
                onPress={() => setShowForm(!showForm)}
              >
                Edit Profile
              </Button>
            </View>
            <View style={styles.item}>
              <Button
                icon="account-arrow-right-outline"
                mode="contained"
                style={{ marginTop: 20, padding: "2%" }}
                color="#40407a"
                onPress={handleLogout}
              >
                Log out!
              </Button>
            </View>
          </View>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    paddingVertical: "15%",
    width: "100%",
    alignItems: "center",
  },
  surface: {
    padding: 8,
    width: "100%",
    justifyContent: "center",
    elevation: 4,
    marginVertical: 10,
  },
  btnContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  item: {
    width: "49%",
    marginHorizontal: 2,
  },
});

export default Profile;
