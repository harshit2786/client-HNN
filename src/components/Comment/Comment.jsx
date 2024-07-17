import { Button, Divider, Modal, Textarea,ModalBody,ModalContent,ModalFooter,ModalHeader, Tabs, Tab, Input, Card, CardBody } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { getOneData } from "../../controllers/strapiController";
import { LoginLogic,SignUpLogic } from "../../controllers/publiccontroller";

function Comment({ likeIds, commentIds, id }) {
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [loginEmail,setLoginEmail] = useState("");
  const [loginPass,setLoginPass] = useState("");
  const [first,setFirst] = useState("");
  const [signEmail,setSignEmail] = useState("");
  const [signPass,setSignPass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobileLayout();
  const [error,setError] = useState("");
  const [signError,setSignError] = useState("")
  const handleSubmit = async() => {
    setIsOpen(true);
  }
  const handleLogin = async() => {
    const resp = await LoginLogic(loginEmail,loginPass);
    if(resp==="DNE"){
        setError("Kindly sign up first!");
        console.log("Kindly sign up first!")
    }
    if(resp==="Incorrect"){
        setError("Password you entered is incorrect");
        console.log("Password you entered is incorrect")
    }
    if(resp==="Success"){
        window.location.reload();
    }
  }
  const handleSignUp = async() => {
    const resp = await SignUpLogic(signEmail,signPass,first);
    if(resp==="Exists"){
        setSignError("Account already exists");
        console.log("Account already exists");
    }
    if(resp==="Success"){
        window.location.reload();
    }
  }
  useEffect(() => {
    const getComments = async () => {
      try {
        const promises = commentIds.map((item) =>
          getOneData("comments", Number(item))
        );
        const result = await Promise.all(promises);
        console.log("comments--->", result);
        setComments(result);
      } catch (error) {
        console.log("Error", error);
      }
    };
    if (commentIds.length > 0) {
      getComments();
    }
  }, [commentIds]);
  return (
    <div className="border-[#BF7B67] my-4 p-4 flex flex-col gap-2 bg-[#FAE9DD] shadow-md border">
    <Modal className=" w-80 h-[400px]" isOpen={isOpen} onClose={() => setIsOpen(false)} >
    <ModalContent className="pt-8">
    <ModalHeader className="w-full flex flex-col gap-4 items-center justify-center">
    <div className="flex flex-col w-full">
      
          <Tabs
            fullWidth
            size="sm"
            aria-label="Tabs form"
            
            // selectedKey={selected}
            // onSelectionChange={setSelected}
          >
            <Tab key="login" title="Login">
              <form className="flex flex-col gap-4">
                <Input value={loginEmail} onChange={(e)=> setLoginEmail(e.target.value)} label="Email" placeholder="Enter your email" type="email" />
                <Input
                  value={loginPass}
                  onChange={(e)=> setLoginPass(e.target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                <div className="flex gap-2 justify-end">
                <Button onClick={()=>handleLogin()} fullWidth className="bg-black text-white hover:bg-gray-700">
                    Login
                  </Button>
                </div>
                {error==="" && <p className=" text-xs justify-center text-center text-red-500">{error}</p>}
              </form>
            </Tab>
            <Tab key="sign-up" title="Sign up">
              <form className="flex flex-col gap-4 h-[300px]">
                <Input value={first} onChange={(e)=>setFirst(e.target.value)} label="Name" placeholder="Enter your name" />
                <Input value={signEmail} onChange={(e)=> setSignEmail(e.target.value)} label="Email" placeholder="Enter your email" type="email" />
                <Input
                  value={signPass}
                  onChange={(e)=>setSignPass(e.target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                />
                
                <div className="flex gap-2 justify-end">
                  <Button onClick={() => handleSignUp()} fullWidth className="bg-black text-white hover:bg-gray-700">
                    Sign up
                  </Button>
                </div>
                {signError ==="" && <p className=" text-xs justify-center text-center text-red-500">{signError}</p>}
              </form>
            </Tab>
          </Tabs>
    </div>

    {/* <Tabs radius="full">
            <Tab className="flex flex-col justify-center items-center gap-4" title="Log in">
                <Input type="email" size="sm" label="Email"/>
                <Input type="password" size="sm" label="Password"></Input>
                <Button className="w-40" size="sm" >Log in</Button>
            </Tab>
            <Tab className="flex flex-col justify-center items-center  gap-4" title="Sign up">
                <div className="flex gap-4" >
                <Input size="sm" label="First Name"/>
                <Input size="sm" label="Last Name"/>
                </div>
                <div className="flex gap-4" >
                <Input type="email" size="sm" label="Email"/>
                <Input type="password" size="sm" label="Password"/>
                </div>
                <Button className="w-40" size="sm" >Sign up</Button>
            </Tab>
        </Tabs> */}
    </ModalHeader>
    
    </ModalContent>
        
    </Modal>
      <div
        className={` flex flex-col ${
          isMobile ? "" : "px-8"
        }  items-center gap-2`}
      >
        <Textarea placeholder="Leave a comment..." />
        <div className="flex justify-between items-center w-full">
          <p className=" text-xs">
            You must be loggedin in to submit a comment.
          </p>
          <Button onClick={() => handleSubmit()} className="bg-[#BF7B67] text-white" size="sm">
            Submit
          </Button>
        </div>
      </div>
      <div
        className={` flex items-center mt-8 justify-start ${
          isMobile ? "" : "px-8"
        }  gap-8`}
      >
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
            />
          </svg>
          <p className=" text-sm font-light">{likeIds.length} likes!</p>
        </div>
        <div className="flex text-sm"> {commentIds.length} comments!</div>
      </div>
      <Divider className="bg-[#BF7B67] my-2" />
      <div
        className={` flex flex-col ${
          isMobile ? "" : "px-8"
        }  items-center gap-2`}
      ></div>
    </div>
  );
}

export default Comment;
