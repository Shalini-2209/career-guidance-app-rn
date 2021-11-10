import axios from "axios";
import React, { useState, useEffect } from "react";
import { WebView } from "react-native-webview";
import { StyleSheet, View, ScrollView } from "react-native";
import { GOOGLE_API_KEY } from "../../config";

const Videos = () => {
  const channelId = "UCrohLvu4-SEd6pLO3DxqTQw";
  const API = GOOGLE_API_KEY;
  const results = 15;

  // Has a list of videos
  const [list, setList] = useState([]);

  let url = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${results}`;

  useEffect(() => {
    async function getVideos() {
      try {
        const response = await axios.get(url);

        const videos = response.data.items.map(
          (obj) => "https://www.youtube.com/embed/" + obj.id.videoId
        );
        setList(videos);
      } catch (error) {
        console.error({ error });
      }
    }

    getVideos();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
      }}
    >
      {list.map((link, index) => {
        return (
          <WebView
            originWhitelist={["*"]}
            scrollEnabled={true}
            source={{
              html: `<iframe width="100%"
        height="100%" src=${link}
        title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
            }}
            style={{ marginVertical: 3, height: 200 }}
            key={index}
            injectedJavaScript="window.ReactNativeWebView.postMessage(Math.max(document.body.offsetHeight, document.body.scrollHeight));"
          />
        );
      })}
    </ScrollView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#222",
//     // alignItems: "center",
//     justifyContent: "center",
//     // width: "75%",
//     height: "100%",
//   },
// });

export default Videos;

{
  /* <View style={styles.container}>
<View style={{ width: "100%", height: "100%" }}>
  <WebView
    source={{ uri: "https://www.youtube.com/c/CareerAddictVideo/videos" }}
  />
</View>
</View> */
}
