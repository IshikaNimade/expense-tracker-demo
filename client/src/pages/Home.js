import React, { useState } from "react";
import { Grid, Paper, Avatar, Typography, Stack } from "@mui/material";
import backgroundImage from "../assets/background.png";
import CustomButton from "../components/CustomButton";
import LockIcon from "@mui/icons-material/Lock";
import Signup from "../layouts/SignUp";
import Login from "../layouts/Login";
import CustomAppName from "../components/CustomAppName";

function Home() {
  const [isSignup, setIsSignup] = useState(false);
  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid
        item
        xs={12}
        sm={8}
        md={5}
        component={Paper}
        elevation={6}
        square
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 4,
        }}
      >
        <CustomAppName />
        <Stack alignItems={"center"}>
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignup ? "Sign Up" : "Sign In"}
          </Typography>
          {isSignup ? <Signup /> : <Login />}
          <CustomButton variant="text" onClick={() => setIsSignup(!isSignup)}>
            {isSignup
              ? "Already have an account? Sign In"
              : "Don't have an account? Sign Up"}
          </CustomButton>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Home;
