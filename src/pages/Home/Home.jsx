/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { MainContext } from "../../AppData/AppContext";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let {
    Data: { IsLoggin },
  } = useContext(MainContext);
  let Navigate = useNavigate();
  useEffect(() => {
    if (!IsLoggin) {
      Navigate("/SignIn");
    }
  }, [IsLoggin]);
  return <div>Home Page</div>;
};

export default Home;
