import React, { useState, useEffect } from "react";
import { Input,Button} from "@nextui-org/react";
import { NavigateSign } from "../../controllers/loginController";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleLogin = async() => {
    try{
        const resp = await NavigateSign(email,pass);
        if(resp){
            navigate('/editor');
        }
    }
    catch(error){
        console.log("Error",error);
    }
  }
  return (
    <div className=" h-screen flex items-center justify-center">
      <div className="flex flex-col items-center w-80 gap-4 pt-10">
        <Input value={email} onChange={(e)=> setEmail(e.target.value)} size="sm" type="email" label="Email" placeholder="Enter your email" />
        <Input value={pass} onChange={(e)=> setPass(e.target.value)} size="sm" type="password" label="Password" placeholder="Enter your password" />
        <Button onClick={()=> handleLogin()} style={{backgroundColor:"#BF7B67"}} size="sm" className="w-40">Sign in</Button>
      </div>
    </div>
  );
}

export default Login;
