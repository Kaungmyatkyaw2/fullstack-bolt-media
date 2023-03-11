"use client";

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { apiInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { CircularProgress } from "@mui/material";
import TextInput from "@/components/form/TextInput";
import Header from "@/components/Header";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn() {
  const route = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const info = new FormData(event.currentTarget);
    setIsLoading(true);
    const alldata = {
      email: info.get("email"),
      user_name: info.get("user_name"),
      password: info.get("password"),
      image: "",
    };

    try {
      const { data } = await apiInstance.post(
        "/account/create",
        JSON.stringify(alldata)
      );

      if (data.isOk) {
        route.push("/login");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header title="Register"></Header>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextInput label={"User Name"} name="user_name" type="text" />

              <TextInput label={"Email Address"} name="email" type="email" />

              <TextInput label={"Password"} name="password" type="password" />

              <button className="block w-full py-[10px] rounded-[5px] bg-primary text-white my-[15px] duration-200">
                {isLoading ? <CircularProgress size="20px" /> : "Sign In"}
              </button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </>
  );
}
