/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./SignUp.page.style.css";
import {
  StrongPassword,
  isEmailValid,
} from "../../services/auth/Vaildation.service";
import { SignUpApi } from "../../services/auth/Auth.service";
import { toast } from "react-toastify";

const FormSignInComponent = (Data) => {
  let [UserName, SetUserName] = useState("");
  let [Email, SetEmail] = useState("");
  let [Password, SetPassword] = useState("");
  let [LoadSended, SetLoadSended] = useState(false);

  let [SignUpBtnDisabled, SetSignUpBtnDisabled] = useState(true);
  let [Errors, SetErrors] = useState({
    Email: [],
    UserName: [],
    Password: [],
    Other: [],
  });
  useEffect(() => {
    if (
      Errors.Email.length === 0 &&
      Errors.Password.length === 0 &&
      Errors.UserName.length === 0
    ) {
      SetSignUpBtnDisabled(false);
    } else {
      SetSignUpBtnDisabled(true);
    }
  }, [UserName, Email, Password]);
  const WatchUserName = (e) => {
    let UserName = e.target.value;
    SetUserName(UserName);
    if (UserName.replace(/ /g, "").length > 5) {
      Errors.UserName = [];
      SetErrors(Errors);
    } else {
      Errors.UserName = ["Must Your Name Be 5 Characters or Than"];
      SetErrors(Errors);
    }
  };
  const WatchEmail = (e) => {
    let Email = e.target.value;
    SetEmail(Email);
    if (Email.replace(/ /g, "").length > 0) {
      if (isEmailValid(Email)) {
        Errors.Email = [];
        SetErrors(Errors);
      } else {
        Errors.Email = ["Your Email Is InVaild"];
        SetErrors(Errors);
      }
    } else {
      Errors.Email = ["Mustn't Your Email is Empty"];
      SetErrors(Errors);
    }
  };
  const WatchPassword = (e) => {
    let Password = e.target.value;
    SetPassword(Password);
    if (Password.replace(/ /g, "").length > 4) {
      if (StrongPassword(Password)) {
        Errors.Password = [];
        SetErrors(Errors);
      } else {
        Errors.Password = ["Your Password Must Be Strong"];
        SetErrors(Errors);
      }
    } else {
      Errors.Password = ["Must Your Password Be 5 Characters or Than"];
      SetErrors(Errors);
    }
  };
  const SignUpFun = () => {
    SetLoadSended(true);
    if (
      Errors.Email.length === 0 &&
      Errors.Password.length === 0 &&
      Errors.UserName.length === 0
    ) {
      SignUpApi({ Email, Password, UserName })
        .then((result) => {
          console.log(result);
          if (result.StatusCode === 400) {
            Errors.Other = [result.Body.MessageError];
            SetErrors(Errors);
          } else if (result.StatusCode === 200) {
            Errors.Other = [];
            SetErrors(Errors);
            Data.OnSignUp({
              Message: "Sign Up Successful !! Go To Page Login",
            });
            toast.success("Sign Up Successful !!", {
              autoClose: 2000,
              theme: "dark",
              closeOnClick: true,
              hideProgressBar: false,
              position: "top-right",
            });
          }
          SetLoadSended(false);
        })
        .catch((err) => {});
    }
  };
  return (
    <div>
      <form className="Form">
        <h2 className="Title">Sign Up</h2>
        <div className="input-box">
          <label htmlFor="UserName">Your UserName</label>
          <input
            type="text"
            name="UserName"
            value={UserName}
            onChange={(e) => {
              WatchUserName(e);
            }}
            id="UserName"
          />
        </div>
        <div className="input-box">
          <label htmlFor="Email">Your Email</label>
          <input
            type="email"
            name="Email"
            value={Email}
            onChange={(e) => {
              WatchEmail(e);
            }}
            id="Email"
          />
        </div>
        <div className="input-box">
          <label htmlFor="Password">Your Password</label>
          <input
            type="password"
            name="Password"
            value={Password}
            onChange={(e) => {
              WatchPassword(e);
            }}
            id="Password"
          />
        </div>
        <div className="Errors w-100 d-flex align-items-center justify-content-center flex-column">
          {Errors.UserName.length > 0 && (
            <div className="w-100 d-flex align-items-center justify-content-center flex-column">
              <h4 className="text-start w-100">User Name Errors</h4>
              {Errors.UserName.map((ErrorUserName, i) => {
                return (
                  <div
                    className="Error alert alert-danger p-2 w-100 mb-1"
                    key={i}
                  >
                    {ErrorUserName}
                  </div>
                );
              })}
            </div>
          )}
          {Errors.Email.length > 0 && (
            <div className="w-100 d-flex align-items-center justify-content-center flex-column">
              <h4 className="text-start w-100">Email Errors</h4>
              {Errors.Email.map((ErrorEmail, i) => {
                return (
                  <div
                    className="Error alert alert-danger p-2 w-100 mb-1"
                    key={i}
                  >
                    {ErrorEmail}
                  </div>
                );
              })}
            </div>
          )}
          {Errors.Password.length > 0 && (
            <div className="w-100 d-flex align-items-center justify-content-center flex-column">
              <h4 className="text-start w-100">Password Errors</h4>
              {console.log(Errors.Password)}
              {Errors.Password.map((ErrorPassword, i) => {
                return (
                  <div
                    className="Error alert alert-danger p-2 w-100 mb-1"
                    key={i}
                  >
                    {ErrorPassword}
                  </div>
                );
              })}
            </div>
          )}
          {Errors.Other.map((ErrorOther, i) => {
            return (
              <div className="Error alert alert-danger p-2 w-100 mb-1" key={i}>
                {ErrorOther}
              </div>
            );
          })}
        </div>
        <div className="input-box">
          <button
            className="BtnForm btn btn-warning"
            onClick={SignUpFun}
            disabled={SignUpBtnDisabled}
            type="button"
          >
            <span className="me-2">Sign Up</span>
            {LoadSended && (
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSignInComponent;
