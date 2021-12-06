import React from "react";
import { getRef } from "../../services/api-services";
import { View, StyleSheet } from "react-native";
import { basic, dark } from "../../default/colors";
import { TextInput, Title, Button } from "react-native-paper";
import { set } from "firebase/database";

const UpdateForm = ({ setShowForm, details, setDetails }) => {
  const handleUpdate = async () => {
    let curRef = await getRef("coaches/", "coach");
    set(curRef, {
      cname: details.cname,
      contact: details.contact,
      eligible: details.eligible,
      slots: details.slots,
      pwd: details.pwd,
      experience: details.experience,
      qualification: details.qualification,
    })
      .then(() => {
        setShowForm(false);
      })
      .catch((error) => {
        console.log({ error });
      });
  };

  return (
    <View style={styles.container}>
      <Title style={styles.heading}> Update Profile</Title>
      <TextInput
        label="Coach Name"
        value={details.cname}
        mode="outlined"
        outlineColor={basic}
        activeOutlineColor={dark}
        onChangeText={(text) => setDetails({ ...details, cname: text })}
      />
      <TextInput
        label="Contact"
        value={details.contact}
        mode="outlined"
        outlineColor={basic}
        activeOutlineColor={dark}
        keyboardType="numeric"
        onChangeText={(text) => setDetails({ ...details, contact: text })}
      />

      <TextInput
        label="Qualification"
        value={details.qualification}
        mode="outlined"
        outlineColor={basic}
        activeOutlineColor={dark}
        onChangeText={(text) => setDetails({ ...details, qualification: text })}
      />

      <TextInput
        label="Available Slots"
        value={details.slots}
        mode="outlined"
        keyboardType="numeric"
        outlineColor={basic}
        activeOutlineColor={dark}
        onChangeText={(num) => setDetails({ ...details, slots: num })}
      />

      <TextInput
        label="Experience in years"
        value={details.experience}
        mode="outlined"
        outlineColor={basic}
        keyboardType="numeric"
        activeOutlineColor={dark}
        onChangeText={(text) => setDetails({ ...details, experience: text })}
      />
      {/* {[...Array(details.slots)].map((elem) => (
        <span key={elem}></span>
      ))} */}

      <Button
        icon="account-check-outline"
        mode="contained"
        style={{ marginTop: 20, padding: "2%" }}
        color={basic}
        onPress={handleUpdate}
      >
        Update
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },

  heading: {
    textAlign: "center",
    color: basic,
    marginVertical: 10,
    textTransform: "uppercase",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default UpdateForm;
