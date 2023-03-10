"use client";

import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signIn, SignInResponse, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import TextInput from "@/components/form/TextInput";
import Header from "@/components/Header";
import { toast } from "react-hot-toast";
import { style } from "@/lib/toast";
import { CircularProgress } from "@mui/material";

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
  const form = React.useRef<HTMLFormElement>(null!);
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = Object.fromEntries(new FormData(form.current).entries());

      const res: SignInResponse | undefined = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (res?.error) {
        toast.error(res.error, style);
        setIsLoading(false);
      }

      if (res?.ok) {
        route.push("/");
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Header title="Login" />
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
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }} ref={form}>
              <TextInput label={"Email Address"} name="email" type="email" />
              <TextInput label={"Password"} name="password" type="password" />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <button
                disabled={isLoading}
                onClick={(e) => handleSubmit(e)}
                className="w-full py-[10px] rounded-[5px] bg-primary text-white my-[15px] duration-200 flex justify-center items-center"
                type="button"
              >
                {isLoading ? <CircularProgress size={"17px"} /> : "Sign In"}
              </button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
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
