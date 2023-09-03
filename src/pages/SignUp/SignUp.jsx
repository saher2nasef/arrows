/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from "react";
import "./SignUp.page.style.css";
import FormSignInComponent from "./Form.SignIn.component";
import { MainContext } from "../../AppData/AppContext";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  let {
    Data: { IsLoggin },
  } = useContext(MainContext);
  let [IsSignUpSuccessFul, SetIsSignUpSuccessFul] = useState(true);
  let [MessageSended, SetMessageSended] = useState("");
  let navigate = useNavigate();
  useEffect(() => {
    if (IsLoggin) {
      navigate("/");
    }
  }, []);
  const MessageFun = ({ Message }) => {
    SetIsSignUpSuccessFul(false);
    SetMessageSended(Message);
  };
  return (
    <section id="SignUp">
      {IsSignUpSuccessFul ? (
        <FormSignInComponent
          OnSignUp={(e) => {
            MessageFun(e);
          }}
        ></FormSignInComponent>
      ) : (
        <div className="alert alert-success">{MessageSended}</div>
      )}
    </section>
  );
};

export default SignUp;
