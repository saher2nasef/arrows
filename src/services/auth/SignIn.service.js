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

export { SignInApi };
