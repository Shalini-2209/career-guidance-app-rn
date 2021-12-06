import { getRef } from "../../services/api-services";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground, ScrollView } from "react-native";
import UpdateForm from "./UpdateForm";
import { Button, Avatar, Surface, Title, DataTable } from "react-native-paper";
import { onValue } from "firebase/database";
import { basic } from "../../default/colors";

const Profile = () => {
  const [details, setDetails] = new useState(null);
  const [showForm, setShowForm] = new useState(false);

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
          }}
        >
          <ImageBackground
            source="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXc4gVACWlY1P46omdK9BxlG8MsFTA_NRzoVFQs4Hyr2tZizxcXU9L7wy9b5hRPr87h94&usqp=CAU"
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
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Button
              icon="account-edit"
              mode="contained"
              style={{
                marginTop: 20,
                padding: "2%",
              }}
              color={basic}
              onPress={() => setShowForm(!showForm)}
            >
              Edit Profile
            </Button>
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
});

export default Profile;
