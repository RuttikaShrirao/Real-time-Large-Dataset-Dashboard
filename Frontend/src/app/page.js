"use client"
import { useEffect, useState} from 'react';
import { io } from 'socket.io-client';

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";


import Button from '@mui/material/Button';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function Home() {
  // login form error message handle by using state in useActionState
  const [state, loginAction] = useActionState(login, undefined);

  // usestate
  const [showPassword, setShowPassword] = useState(false);


  //  useEffect(() => {
  //   const socket = io('http://localhost:5000');   
  //   socket.on('updateData', (data) => {
  //     console.log('Received real-time data:', data);
  //     // Update state here to reflect in the UI
  //   });
  //   return () => socket.disconnect();
  // }, []);


  return (
    // authentication handle here
    <div className="form  mt-14">
    <form action={loginAction} className="flex  flex-col justify-center items-center">
    {/* email */}
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

      {/* password */}
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

      <SubmitButton />
    </form>
    </div>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button variant="contained" sx={{ mt: 4}} disabled={pending} type="submit">Login</Button>
  );
}