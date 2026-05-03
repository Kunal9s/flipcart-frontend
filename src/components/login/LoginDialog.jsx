import {
  Dialog,
  Box,
  TextField,
  Typography,
  Button,
  styled,
} from "@mui/material";

import { useState, useContext } from "react";

import { authenticateSignup, authenticateLogin } from "../service/api";
import { DataContext } from "../../context/DataProvider";

const Component = styled(Box)`
  height: 70vh;
  width: 90vh;
`;

const Image = styled(Box)`
  background: #2874f0
    url(https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png)
    center 85% no-repeat;
  height: 100%;
  width: 35%;
  padding: 45px 35px;
  box-sizing: border-box;
  & > p,
  & > h5 {
    color: #ffffff;
    font-weight: 600;
  }
`;

const loginInitialValues = {
  username: "",
  password: "",
};

const signupInitialValues = {
  firstname: "",
  lastname: "",
  username: "",
  email: "",
  password: "",
  phone: "",
};

const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 25px 35px;
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;

  & div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const RequestOTP = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #287480;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  font-size: 12px;
  color: #878787;
`;

const CreateAccount = styled(Typography)`
  font-size: 14px;
  text-align: center;
  color: #2874f0;
  font-weight: 600;
  cursor: pointer;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const accountInitialValues = {
  login: {
    view: "login",
    heading: "Login",
    subHeading: "Get access to your Orders, Wishlist and Recommendations",
  },
  signup: {
    view: "signup",
    heading: "Looks like you're new here!",
    subHeading: "Sign up with your mobile number to get started",
  },
};

function LoginDialog({ open, setOpen }) {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  const { setAccount } = useContext(DataContext);
  const [account, toggleAccount] = useState(accountInitialValues.login);
  const [error, setError] = useState("");

  const handleClose = () => {
    setOpen(false);
    toggleAccount(accountInitialValues.login);
    setError("");
  };

  const toggleSignup = () => {
    toggleAccount(accountInitialValues.signup);
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async () => {
    try {
      let response = await authenticateSignup(signup);

      if (response.status === 200) {

      setAccount({
        username: signup.username
      });

      localStorage.setItem("user", JSON.stringify({
        username: signup.username
      }));

      handleClose();
    }
  } catch (error) {
    if (error.response?.status === 409) {
      setError("User already exists");
    } else {
      setError("Something went wrong");
    }
  }
};

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
    setError(false);
  };

  const loginUser = async () => {
    try {
      let response = await authenticateLogin(login);

      if (!response) {
        setError(true);
        return;
      }

      if (response.status === 200) {
        localStorage.setItem("token", "dummy-token"); // since no JWT yet
        localStorage.setItem("user", JSON.stringify(response.data.user || response.data));

        handleClose();
        setAccount(response.data.user || response.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("Login error:", error);
      setError(true);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { maxWidth: "unset", borderRadius: "4px" } }}
    >
      <Component>
        <Box style={{ display: "flex", height: "100%" }}>
          <Image>
            <Typography variant="h5">{account.heading}</Typography>
            <Typography style={{ marginTop: 20 }}>
              {account.subHeading}
            </Typography>
          </Image>
          {account.view === "login" ? (
            <>
            {error && <Error>{error}</Error>}
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="username"
                label="Enter username"
              />
              {error && <Error>Please enter valid username or password</Error>}
              <TextField
                variant="standard"
                onChange={(e) => onValueChange(e)}
                name="password"
                label="Enter Password"
              />
              <Text>
                By continuing, you agree to Flipkart's Terms of Use and Privacy
                Policy.
              </Text>
              <LoginButton onClick={() => loginUser()}>Login</LoginButton>
              <Typography style={{ textAlign: "center" }}>OR</Typography>
              <RequestOTP>Request OTP</RequestOTP>
              <CreateAccount onClick={() => toggleSignup()}>
                New to Flipkart? Create an account
              </CreateAccount>
            </Wrapper>
            </>
          ) : (
            <Wrapper>
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="firstname"
                label="Enter Firstname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="lastname"
                label="Enter Lastname"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="username"
                label="Enter Username"
              />
              {error && <Error>{error}</Error>} 
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="email"
                label="Enter Email"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="password"
                label="Enter Password"
              />
              <TextField
                variant="standard"
                onChange={(e) => onInputChange(e)}
                name="phone"
                label="Enter Phone"
              />
              <LoginButton onClick={() => signupUser()}>Continue</LoginButton>
            </Wrapper>
          )}
        </Box>
      </Component>
    </Dialog>
  );
}

export default LoginDialog;
