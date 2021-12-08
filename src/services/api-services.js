import { getDatabase, ref, onValue } from "firebase/database";
import database from "../storage/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRef = async (path, slug) => {
  let uid = await AsyncStorage.getItem(slug);

  let url = path + uid;
  const curRef = ref(database, url);

  return curRef;
};
