import {
  Button,
  CircularProgress,
  circularProgressClasses,
  Stack,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import { BrowserRouter as Router,Route,Link,Switch, Redirect,useHistory } from "react-router-dom";
import "./Register.css";
import Login from "./Login.js"


const Load = (props) => {
  let api = props.api;
  if (api === 0) {
    return (
      <Box sx={{ display: 'flex',justifyContent:'center'}}>
        <CircularProgress />
      </Box>
    );
  } else {
    return null;
  }
};


const Register = () => {
  const { enqueueSnackbar } = useSnackbar();
  let history = useHistory();

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement the register function
  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ username: string, password: string, confirmPassword: string }} formData
   *  Object with values of username, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "Username is already taken"
   * }
   */

  let [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  let [api, setApi] = useState();

  const register = async (formData) => {
    // setFormData = {username:`${()}`,password:`${handlechangeForPassword()}`,confirmPassword:`${handlechangeForConfirmPassword()}`};
    // console.log(formData.username)
    // console.log("register func executing")
    // let response;
    // if (response === undefined) {
    //   setApi(0);
    // }
    try {
    

    let response = await axios.post(`${config.endpoint}/auth/register`, {
      username: `${formData.username}`,
      password: `${formData.password}`,
    });
    // if (response !== undefined) {
    //   setApi(1);
    // }
    console.log(response)
    let status = response.status;
    let txt = response.statusText;
    enqueueSnackbar("Registered successfully", {anchorOrigin:{
      vertical:"bottom",
      horizontal:"center"
    },variant: "success"});
   
    // if (status < 400 && status >= 200) {
    //   // enqueueSnackbar("Registered successfully", { variant: "success" });
    //   alert('Successfully registered')
    // } else if (status < 500 && status >= 400) {
    //   // enqueueSnackbar(`${response.statusText}`);
    //   // console.log('its here')
    //   alert(`${txt}`);
    // }
    
  } catch (e) {
    //alert(e.response.data.message)
    enqueueSnackbar(e.response.data.message, { variant: "error" });
    
  }
  };

  // TODO: CRIO_TASK_MODULE_REGISTER - Implement user input validation logic
  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ username: string, password: string, confirmPassword: string }} data
   *  Object with values of username, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that username field is not an empty value - "Username is a required field"
   * -    Check that username field is not less than 6 characters in length - "Username must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
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
    } else if (data.password !== data.confirmPassword) {
      enqueueSnackbar("passwords do not match", { variant: "warning" });
      return false;
    } else {
      return true;
    }
  };

  const checkValidationAndRegister = (e,formData) => {

    e.preventDefault();
    if (validateInput(formData)) {
      
      register(formData);
    }
  };



  return (
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        minHeight="100vh"
      >
        <Header />
        <Box className="content">
          <Stack spacing={2} className="form">
            <h2 className="title">Register</h2>
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
              helperText="Password must be atleast 6 characters length"
              fullWidth
              placeholder="Enter a password with minimum 6 characters"
            />
            <TextField
              id="confirmPassword"
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              variant="outlined"
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              fullWidth
            />
            <Load api={api} />
            <Button
              onClick={(e) => {
                checkValidationAndRegister(e,formData)
                history.push("/login")
              }}
              className="button"
              variant="contained"
            >
              Register Now
            </Button>
            <p className="secondary-action">
              Already have an account?{" "}
              <Link className="link" to="/login">
                Login here
              </Link>
            </p>
          </Stack>
        </Box>
        <Footer />
      </Box>
  );
};

export default Register;
