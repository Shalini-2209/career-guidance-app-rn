import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const RoleContext = React.createContext();
export const LoadContext = React.createContext();
export const GetRoleContext = React.createContext();

const RoleProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    let user = await AsyncStorage.getItem("user");
    let coach = await AsyncStorage.getItem("coach");

    if (coach) {
      setRole("coach");
    } else if (user) setRole("user");
    else setRole("");
    setLoading(false);
  };

  return (
    <GetRoleContext.Provider value={checkUser}>
      <RoleContext.Provider value={role}>
        <LoadContext.Provider value={loading}> {children}</LoadContext.Provider>
      </RoleContext.Provider>
    </GetRoleContext.Provider>
  );
};

export default RoleProvider;
