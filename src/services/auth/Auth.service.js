import axios from "axios";
import links from "../../config";

const SignInApi = ({ Email, Password }) => {
  return axios
    .post(links.Url + "Auth/SignIn", { Email, Password })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};

const SignUpApi = ({ Email, Password, UserName }) => {
  console.log({ Email, Password, UserName });
  return axios
    .post(links.Url + "Auth/SignUp", { Email, Password, UserName })
    .then((result) => {
      return result.data;
    })
    .catch((err) => {
      return err;
    });
};
let Key = "UserData";
const SaveData = (Data) => {
  localStorage.setItem(Key, JSON.stringify(Data));
  return true;
};
const GetData = () => {
  return JSON.parse(localStorage.getItem(Key));
};
const IsLogginFun = () => {
  if (GetData() !== null) {
    return true;
  } else {
    return false;
  }
};
export { SignInApi, SignUpApi, SaveData, GetData, IsLogginFun };
