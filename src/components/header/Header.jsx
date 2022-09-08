import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useEffect, useState } from "react";

export const LoginOut = () => {
  const navigate = useNavigate();
  const [loginCheck, setLoginCheck] = useState(true);

  const removeToken = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setLoginCheck(false);
    navigate("/");
  };

  useEffect(() => {
    window.localStorage.accessToken === undefined
      ? setLoginCheck(false)
      : setLoginCheck(true);
  }, [loginCheck]);

  if (loginCheck === false) {
    return (
      <Button
        color="inherit"
        onClick={() => {
          navigate("/login");
        }}
      >
        LOGIN
      </Button>
    );
  }
  if (loginCheck === true) {
    return (
      <Button color="inherit" onClick={removeToken}>
        LOGOUT
      </Button>
    );
  }
};

export default function Header() {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              navigate("/");
            }}
          ></IconButton>
          <Typography
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            WeReF
          </Typography>

          <LoginOut />
          <Button
            color="inherit"
            onClick={() => {
              navigate("/signup");
            }}
          >
            SignUp
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
