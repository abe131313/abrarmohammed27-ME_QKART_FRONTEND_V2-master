import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Search } from "@mui/icons-material";
import {
  Avatar,
  Button,
  Stack,
  TextField,
  InputAdornment,
} from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Container from "@mui/material/Container";
import "./Header.css";
import Products from "./Products";

const SearchCompo = (props) => {
  if (window.location.pathname === "/") {
    return (
      <TextField
        onChange={(e) => {props.data(e,1000)}}
        className="search-desktop"
        size="small"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Search color="primary" />
            </InputAdornment>
          ),
        }}
        placeholder="Search for items/categories"
        name="search"
      />
    );
  }else{
    return null;
  }
};

const Header = ({ children, hasHiddenAuthButtons }) => {
  let [search, setSearch] = useState("");
  
  let handleSearch = (e) => {
    setSearch(e.target.value);
  };

  let handleLogOut = () => {
    localStorage.clear();
    window.location.reload();
  };
  let history = useHistory();
  let username = localStorage.getItem("username");
  if (hasHiddenAuthButtons === true && window.location.pathname === "/") {
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Stack direction="row" spacing={2}>
          <SearchCompo data={children}/>
          <img src="avatar.png" alt={username}></img>
          <Container>
            <p>{username}</p>
          </Container>
          <Button
            onClick={handleLogOut}
            className="explore-button"
            variant="text"
          >
            Logout
          </Button>
        </Stack>
      </Box>
    );
  } else if (
    hasHiddenAuthButtons === false &&
    window.location.pathname === "/"
  ) {
    return (
      <Box className="header">
        <Box className="header-title" title>
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <SearchCompo data={children}/>
        <Stack direction="row" spacing={2}>
          <Button
            onClick={() => {
              history.push("/login");
            }}
            className="explore-button"
            variant="text"
          >
            Login
          </Button>
          <Button
            onClick={() => {
              history.push("/register");
            }}
            className="button"
            variant="contained"
          >
            Register Now
          </Button>
        </Stack>
      </Box>
    );
  } else {
    return (
      <Box className="header">
        <Box className="header-title">
          <img src="logo_light.svg" alt="QKart-icon"></img>
        </Box>
        <Button
          className="explore-button"
          startIcon={<ArrowBackIcon />}
          variant="text"
          onClick={() => {
            history.push("/");
          }}
        >
          Back to explore
        </Button>
      </Box>
    );
  }
};

export default Header;
