import axios from "axios";
import React, { useEffect, useState } from "react";
import { NEWS_API_KEY } from "../../../config";
import { dark } from "../../default/colors";
import { StyleSheet, ScrollView, Linking } from "react-native";
import { Avatar, Card, Paragraph } from "react-native-paper";

export default function Headlines() {
  const [articles, setArticles] = new useState([]);
  let API = NEWS_API_KEY;
  useEffect(() => {
    async function getArticles() {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API}`
        );
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    }

    getArticles();
  }, []);
  const LeftContent = (props) => (
    <Avatar.Icon
      {...props}
      icon="newspaper-variant"
      style={{ backgroundColor: dark }}
    />
  );

  const readMore = async (url) => {
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {articles.map((item, index) => {
        return (
          <Card
            key={index}
            mode="elevated"
            onPress={() => readMore(item.url)}
            style={styles.card}
          >
            <Card.Title
              title={item.title}
              subtitle={item.author}
              left={LeftContent}
            />
            <Card.Content>
              <Paragraph>{item.content}</Paragraph>
            </Card.Content>
            <Card.Cover source={{ uri: `${item.urlToImage}` }} />
          </Card>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "white",
  },

  card: {
    marginVertical: 3,
  },
});
