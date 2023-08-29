/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import "./SignIn.page.style.css";
import {
  StrongPassword,
  isEmailValid,
} from "../../services/auth/Vaildation.service";
import { SignInApi } from "../../services/auth/SignIn.service";
import { toast } from "react-toastify";
const SignIn = () => {
  let [Email, SetEmail] = useState("");
  let [Password, SetPassword] = useState("");
  let [LoadSended, SetLoadSended] = useState(false);
  let [SignInBtnDisabled, SetSignInBtnDisabled] = useState(true);
  let [Errors, SetErrors] = useState({
    Email: [],
    Password: [],
    Other: [],
  });
  useEffect(() => {
    if (Errors.Email.length === 0 && Errors.Password.length === 0) {
      SetSignInBtnDisabled(false);
    } else {
      SetSignInBtnDisabled(true);
    }
  }, [Email, Password]);
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
  const SignIn = () => {
    SetLoadSended(true);

    if (Errors.Email.length === 0 && Errors.Password.length === 0) {
      Errors.Other = [];
      SetErrors(Errors);
      SignInApi({
        Email,
        Password,
      }).then((result) => {
        if (result.StatusCode === 400) {
          Errors.Other = [result.Body.Message];
          SetErrors(Errors);
        } else if (result.StatusCode === 200) {
          Errors.Other = [];
          SetErrors(Errors);
          console.log(result.Body.User);
          toast.success("Loggin Successful !!", {
            autoClose: 2000,
            theme: "dark",
            closeOnClick: true,
            hideProgressBar: false,
            position: "top-right",
          });
        }
        SetLoadSended(false);
      });
    }
  };
  return (
    <section id="SignIn">
      <form className="Form">
        <h2 className="Title">Sign In</h2>
        <div className="input-box">
          <label htmlFor="Email">Your Email</label>
          <input
            type="email"
            onChange={(e) => {
              WatchEmail(e);
            }}
            name="Email"
            id="Email"
          />
        </div>
        <div className="input-box">
          <label htmlFor="Password">Your Password</label>
          <input
            type="password"
            onChange={(e) => {
              WatchPassword(e);
            }}
            name="Password"
            id="Password"
          />
        </div>
        <div className="Errors w-100 d-flex align-items-center justify-content-center flex-column">
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
            className="BtnForm btn btn-warning d-flex align-items-center justify-content-center"
            onClick={SignIn}
            disabled={SignInBtnDisabled}
            type="button"
          >
            <span className="me-2">Sign In</span>
            {LoadSended && (
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            )}
          </button>
        </div>
      </form>
    </section>
  );
};

export default SignIn;
