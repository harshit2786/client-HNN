import { Button, Input, ModalContent, ModalHeader, Tab, Tabs } from '@nextui-org/react';
import React, { useEffect, useState } from 'react'
import { LoginLogic, SignUpLogic } from '../../controllers/publiccontroller';

function Modal({isOpen,setIsOpen}) {
    const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [first, setFirst] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");
  const [error, setError] = useState("");
  const [signError, setSignError] = useState("");
  const handleLogin = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(loginEmail)) {
      setError("Invalid email format");
      return;
    }
    if (loginPass.trim().length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }
    const resp = await LoginLogic(loginEmail, loginPass);
    if (resp === "DNE") {
      setError("Kindly sign up first!");
      console.log("Kindly sign up first!");
    }
    if (resp === "Incorrect") {
      setError("Password you entered is incorrect");
      console.log("Password you entered is incorrect");
    }
    if (resp === "Success") {
      setIsOpen(false);
    }
  };
  const handleSignUp = async () => {
    if (!first.trim()) {
      setSignError("Name is required");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(signEmail)) {
      setSignError("Invalid email format");
      return;
    }
    if (signPass.trim().length < 8) {
      setSignError("Password must be at least 8 characters");
      return;
    }

    const resp = await SignUpLogic(signEmail.trim(), signPass, first.trim());
    if (resp === "Exists") {
      setSignError("Account already exists");
      console.log("Account already exists");
    }
    if (resp === "Success") {
      setIsOpen(false);
    }
  };
  useEffect(() => {
    setError("");
    setSignEmail("");
    setSignPass("");
    setFirst("");
    setLoginEmail("");
    setLoginPass("");
    setSignError("");
  }, [isOpen]);
  return (
    <Modal
        className=" w-80 h-[400px]"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ModalContent className="pt-8 poppins-thin">
          <ModalHeader className="w-full flex flex-col gap-4 items-center justify-center">
            <div className="flex flex-col w-full">
              <Tabs fullWidth size="sm" aria-label="Tabs form">
                <Tab key="login" title="Login">
                  <form className="flex flex-col gap-4">
                    <Input
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      value={loginPass}
                      onChange={(e) => setLoginPass(e.target.value)}
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />
                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleLogin()}
                        fullWidth
                        className="bg-black text-white hover:bg-gray-700"
                      >
                        Login
                      </Button>
                    </div>
                    {error !== "" && (
                      <p className=" text-xs justify-center text-center text-red-500">
                        {error}
                      </p>
                    )}
                  </form>
                </Tab>
                <Tab key="sign-up" title="Sign up">
                  <form className="flex flex-col gap-4 h-[300px]">
                    <Input
                      value={first}
                      onChange={(e) => setFirst(e.target.value)}
                      label="Name"
                      placeholder="Enter your name"
                    />
                    <Input
                      value={signEmail}
                      onChange={(e) => setSignEmail(e.target.value)}
                      label="Email"
                      placeholder="Enter your email"
                      type="email"
                    />
                    <Input
                      value={signPass}
                      onChange={(e) => setSignPass(e.target.value)}
                      label="Password"
                      placeholder="Enter your password"
                      type="password"
                    />

                    <div className="flex gap-2 justify-end">
                      <Button
                        onClick={() => handleSignUp()}
                        fullWidth
                        className="bg-black text-white hover:bg-gray-700"
                      >
                        Sign up
                      </Button>
                    </div>
                    {signError !== "" && (
                      <p className=" text-xs justify-center text-center text-red-500">
                        {signError}
                      </p>
                    )}
                  </form>
                </Tab>
              </Tabs>
            </div>
          </ModalHeader>
        </ModalContent>
      </Modal>
  )
}

export default Modal
