import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useHistory, Link,BrowserRouter as Router } from "react-router-dom";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Login.css";


let Load = (props) => {
  let api = props.api;
  if(api === 1){
    return (
      <Box sx={{ display: 'flex',justifyContent:'center'}}>
        <CircularProgress />
      </Box>
    )
  }else{
    return null;
  }
}

const Login = () => {
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();
  let [api,setApi] = useState(0);
  // TODO: CRIO_TASK_MODULE_LOGIN - Fetch the API response
  /**
   * Perform the Login API call
   * @param {{ username: string, password: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/login"
   *
   * Example for successful response from backend:
   * HTTP 201
   * {
   *      "success": true,
   *      "token": "testtoken",
   *      "username": "criodo",
   *      "balance": 5000
   * }
   *
   * Example for failed response from backend:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Password is incorrect"
   * }
   *
   */
  let [formData,setFormData] = useState({
    username:"",
    password:""
  })
  let response;
  const login = async (formData) => {
    try{
      setApi(1);
      response = await axios.post(`${config.endpoint}/auth/login`,{
        username:`${formData.username}`,
        password:`${formData.password}`
      });
      setApi(0);
      persistLogin(response.data.token,response.data.username,response.data.balance)
      enqueueSnackbar("Logged in successfully",{anchorOrigin:{vertical:"bottom",horizontal:"center"},variant:"success"});
      history.push("/");
    }catch(e){
      setApi(0);
      console.log(e,"e")
      enqueueSnackbar(e.response.data.message, { variant: "error",anchorOrigin:{vertical:"bottom",horizontal:"center"} });
    }

  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Validate the input
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false and show warning message if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that password field is not an empty value - "Password is a required field"
   */
  const validateInput = (data) => {
      // let validEmail = new RegExp('^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$');
      // let validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');
      // if(!validEmail.test(data.username) && !validPassword.test(data.password))
      // if(data.password.length > 6){
      //   login(data);
      // }else{
      //   enqueueSnackbar("Password should be atleast of 6 characters",{variant:"warning",anchorOrigin:{vertical:"bottom",horizontal:"center"}})

      // }
      if (data.username.length === 0) {
        enqueueSnackbar("Username is a required field", { variant: "warning" });
        return false;
      } else if (data.username.length < 6) {
        enqueueSnackbar("Username must be atleast 6 characters", {
          variant: "warning",
        });
        return false;
      } else if (data.password.length === 0) {
        enqueueSnackbar("Password is a required field", { variant: "warning" });
        return false;
      } else if (data.password.length < 6) {
        enqueueSnackbar("Password must be atleast 6 characters", {
          variant: "warning",
        });
        return false;
      }else{
        return true;
      }
    
  };

  // TODO: CRIO_TASK_MODULE_LOGIN - Persist user's login information
  /**
   * Store the login information so that it can be used to identify the user in subsequent API calls
   *
   * @param {string} token
   *    API token used for authentication of requests after logging in
   * @param {string} username
   *    Username of the logged in user
   * @param {string} balance
   *    Wallet balance amount of the logged in user
   *
   * Make use of localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
   * -    `token` field in localStorage can be used to store the Oauth token
   * -    `username` field in localStorage can be used to store the username that the user is logged in as
   * -    `balance` field in localStorage can be used to store the balance amount in the user's wallet
   */
  const persistLogin = (token, username, balance) => {
    localStorage.setItem('token',`${token}`);
    localStorage.setItem(`username`,`${username}`);
    localStorage.setItem(`balance`,balance);
  };

  return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Header/>
     
          <Box className="content">
            <Stack spacing={2} className="form" >
            <h2 className="title">Login</h2>
            <TextField
                id="username"
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                label="Username"
                variant="outlined"
                title="Username"
                name="username"
                placeholder="Enter Username"
                fullWidth
              />
              <TextField
                id="password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                variant="outlined"
                label="Password"
                name="password"
                type="password"
                fullWidth
              />
                <Load api={api}/>
              <Button
                onClick={() => {
                  if(validateInput(formData)){
                    login(formData);
                  };
                  // history.push("/products")
                }}
                className="button"
                variant="contained"
              >
                LOGIN TO QKART
              </Button>
              <p className="secondary-action">
                Don't have an account?{" "}
                <Link className="link" to="/register">
                  Register now
                </Link>
              </p>
            </Stack>
          </Box>
        <Footer />
      </Box>
  );
};

export default Login;
