import React, { useState, useEffect } from "react";
import { Input,Button } from "@nextui-org/react";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-80 gap-4 pt-10">
        <Input size="sm" type="email" label="Email" placeholder="Enter your email" />
        <Input size="sm" type="password" label="Password" placeholder="Enter your password" />
        <Button style={{backgroundColor:"#BF7B67"}} size="sm" className="w-40">Sign in</Button>
      </div>
    </div>
  );
}

export default Login;
