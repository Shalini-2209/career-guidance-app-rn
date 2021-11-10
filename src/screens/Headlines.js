import { StatusBar } from "expo-status-bar";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NEWS_API_KEY } from "../../config";
import { StyleSheet, Text, View } from "react-native";

export default function Headlines() {
  const [articles, setArticles] = new useState([]);
  let API = NEWS_API_KEY;
  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API}`
        );
        setArticles(response);
      } catch (error) {
        console.error(error);
      }
    }

    getArticles();
  }, []);

  console.log({ articles });

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
