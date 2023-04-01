import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Avatar, Button } from "@material-ui/core";
import { Link, useNavigate, useLocation } from "react-router-dom";
import decode from "jwt-decode";
import useStyles from "./styles";
import memories from "../../images/memories-Text.png";
import logo from "../../images/memories-Logo.png";
import { useDispatch } from "react-redux";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });

    navigate("/");

    setUser((prew) => (prew = null));
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
    // eslint-disable-next-line
  }, [location]);

  return (
    <AppBar
      className={
        window.innerWidth < 768 ? classes.appBarMobile : classes.appBar
      }
      position="static"
      color="inherit"
    >
      <div
        className={classes.brandContainer}
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height={window.innerWidth < 768 ? "40" : "60"}
        />
        <img
          className={classes.image}
          src={logo}
          alt="memories"
          height={window.innerWidth < 768 ? "40" : "60"}
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.name}
              src={user.imageUrl}
            >
              {user.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
