import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Error = ({ errorMsg }) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons
        name="emoticon-sad-outline"
        size={85}
        color="#bdc3c7"
      />
      <Text style={{ color: "#95a5a6", fontSize: 20 }}>Whoops !</Text>
      <Text style={{ color: "#95a5a6", fontSize: 17 }}>{errorMsg}</Text>
    </View>
  );
};

export default Error;
