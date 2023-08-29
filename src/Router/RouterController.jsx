import React, { useContext } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./../pages/Home/Home";
import SignUp from "./../pages/SignUp/SignUp";
import SignIn from "./../pages/SignIn/SignIn";
import Header from "../MainComponents/Header/Header";
import NotFound from "../pages/NotFound/NotFound";
import { MainContext } from "../AppData/AppContext";
const RouterController = () => {
  let {
    Data: { Theme },
  } = useContext(MainContext);
  return (
    <HashRouter>
      <div id={Theme}>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/SignIn" element={<SignIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
    </HashRouter>
  );
};

export default RouterController;
