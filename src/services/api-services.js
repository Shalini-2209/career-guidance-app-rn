import { getDatabase, ref, onValue } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getRef = async (path, slug) => {
  let uid = await AsyncStorage.getItem(slug);

  const db = getDatabase();
  let url = path + uid;
  const curRef = ref(db, url);

  return curRef;
};
