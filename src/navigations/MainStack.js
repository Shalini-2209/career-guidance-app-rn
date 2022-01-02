import React, { useContext, useEffect } from "react";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import CoachStack from "./CoachStack";
import { RoleContext, GetRoleContext } from "../contexts/RoleProvider";

const MainStack = () => {
  const role = useContext(RoleContext);
  const checkUser = useContext(GetRoleContext);

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      {role === "user" && <UserStack />}
      {role === "coach" && <CoachStack />}
      {role === "" && <AuthStack />}
    </>
  );
};

export default MainStack;
