import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";

import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import LockOutlinedIcon from "@material-ui/icons/LockOpenOutlined";
import Input from "./Input";
import Icon from "./icon";

import useStyles from "./styles";

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  const handleSubmit = () => {};
  const handleChange = () => {};
  const switchMode = () => {
    setIsSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  // const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    console.log("res is ", res);
  };

  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try Again Later.");
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignUp ? "Sign Up" : "Sign In"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignUp && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Adress"
              handleChange={handleChange}
              type="email"
              color="primary"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignUp && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleOAuthProvider>
              <GoogleLogin
                client_id="559698675513-og06v37mmv3mf6ki7enlqnihgt48c7cp.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    fullWidth
                    variant="contained"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                  >
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onError={googleFailure}
                cookiePolicy="single_host_origin"
              />
            </GoogleOAuthProvider>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
