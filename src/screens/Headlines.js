import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Headlines() {
  const [articles, setArticles] = new useState([]);
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=tesla&from=2021-10-08&sortBy=publishedAt&apiKey=bec3b5d40ea2429391097e1f339ea49b"
        );
        setArticles(response);
      } catch (error) {
        console.error(error);
      }
    }

    getUser();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
