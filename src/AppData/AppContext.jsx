/* eslint-disable no-unused-vars */
import React, { createContext, useState } from "react";
import InitialValue from "./InitialValue";

const MainContext = createContext();

const AppContext = ({ children }) => {
  let [Data, SetData] = useState(InitialValue);
  let [AnyData, SetAnyData] = useState("AnyData");
  let SetLogginUser = (Status) => {
    Data.IsLoggin = Status;
    SetData(Data);
    SetAnyData(new Date().getMilliseconds());
  };
  let SetUserData = (UserData) => {
    Data.UserData = UserData;
    SetData(Data);
    SetAnyData(new Date().getMilliseconds());
  };
  let SetTheme = (Theme) => {
    Data.Theme = Theme;
    SetData(Data);
    SetAnyData(new Date().getMilliseconds());
  };
  const Porps = { Data, SetData, SetLogginUser, SetUserData, SetTheme };
  return <MainContext.Provider value={Porps}>{children}</MainContext.Provider>;
};

export { AppContext, MainContext };
