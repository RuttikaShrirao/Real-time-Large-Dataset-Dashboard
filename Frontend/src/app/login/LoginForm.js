"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";
import { useState } from "react";

import Button from '@mui/material/Button';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export function LoginForm() {
  const [state, loginAction] = useActionState(login, undefined);
  const [showPassword, setShowPassword] = useState(false);
  console.log(login);
  return (
    <form action={loginAction} className="flex  flex-col justify-center items-center">
      <FormControl  variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
        <Input
          // id="standard-adornment-password"
          type="text"
          id="email"
          name="email"
        />
      </FormControl>
      {state?.errors?.email && (
        <p className="text-red-500">{state.errors.email}</p>
      )}
      <FormControl  variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
        //   id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
        id="password"
                name="password"
                placeholder="Password"
        />
      </FormControl>
      {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

      {/* <Button variant="contained" onClick={loginHandler}>Login</Button> */}
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    // <button disabled={pending} type="submit">
    //   Login
    // </button>
    <Button variant="contained" sx={{ mt: 4}} disabled={pending} type="submit">Login</Button>
  );
}
