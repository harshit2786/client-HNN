import {
  Button,
  Divider,
  Modal,
  Textarea,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tabs,
  Tab,
  Input,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { useMobileLayout } from "../../hooks/mobilelayout";
import { CreateData, getFilteredByTwoRelation, getOneData } from "../../controllers/strapiController";
import { LoginLogic, SignUpLogic } from "../../controllers/publiccontroller";
import SingleComment from "./SingleComment";
import './modal.css'

function Comment({ likeIds, commentIds, id }) {
  const [numLikes,setNumLikes] = useState(likeIds?.length);
  const [comments, setComments] = useState([]);
  const [sortedComments,setSortedComments] = useState([]);
  const [userLike, setUserLike] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [first, setFirst] = useState("");
  const [signEmail, setSignEmail] = useState("");
  const [signPass, setSignPass] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useMobileLayout();
  const [error, setError] = useState("");
  const [signError, setSignError] = useState("");
  const [com, setCom] = useState("");
  const [loader,setLoader] = useState(false);
  const userId = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;
  const handleSubmit = async () => {
    if (userId) {
      const formData = {
        Comment: com,
        blog: {
          disconnect: [],
          connect: [
            {
              id: id,
              position: {
                end: true,
              },
            },
          ],
        },
        user: {
          disconnect: [],
          connect: [
            {
              id: userId.user.id,
              position: {
                end: true,
              },
            },
          ],
        },
      };
      try {
        const resp = await CreateData("comments", formData);
        console.log("Succesfully posted comment", resp);
        window.location.reload();
      } catch (error) {
        console.log("Error", error);
      }
    } else {
      setIsOpen(true);
    }
  };
  const checkUser = () => {
    if (userId) {
      return;
    } else {
      setIsOpen(true);
    }
  };
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
  const handleLike = async()=>{
    if(userId){
        if(userLike ===false){
            const formData = {
                blog: {
          disconnect: [],
          connect: [
            {
              id: id,
              position: {
                end: true,
              },
            },
          ],
        },
        user: {
          disconnect: [],
          connect: [
            {
              id: userId.user.id,
              position: {
                end: true,
              },
            },
          ],
        },
            }
            try{
              setNumLikes(numLikes+1);
              setUserLike(true);
                const resp = CreateData("likes",formData);
                
                console.log("Success Like",resp);
            }
            catch(error){
                console.log("Error:",error)
            }
        }
    }
    else{
        setIsOpen(true);
        return;
    }
  }
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
  useEffect(() => {
    const getComments = async () => {
      try {
        setLoader(true);
        const promises = commentIds.map((item) =>
          getOneData("comments", Number(item))
        );
        const result = await Promise.all(promises);
        console.log("comments--->", result);
        setComments(result);
        setLoader(false)
      } catch (error) {
        console.log("Error", error);
        setLoader(false);
      }
    };
    if (commentIds.length > 0) {
      getComments();
    }
  }, [commentIds]);
  useEffect(() => {
    if(comments.length>0){
      let arr = [];
      arr = comments.sort(
        (a, b) =>
          new Date(b.data.attributes.createdAt) - new Date(a.data.attributes.createdAt)
      );
      setSortedComments(arr);
    }
  },[comments])
  useEffect(() => {
    const checkLike= async() => {
        try{
            const resp = await getFilteredByTwoRelation("likes","blog",id,"user",userId.user.id);
            console.log("like----",resp.data);
            setUserLike(resp.data.length===0 ? false : true);
        }
        catch(error){
            console.log("Error:",error);
        }
    }
    if(userId && id){
        checkLike();
    }
  },[userId,id])
  return (
    <div className="border-[#BF7B67] my-4 p-4 flex flex-col gap-2 bg-[#FAE9DD] shadow-md border">
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
      <div
        className={` flex flex-col ${
          isMobile ? "" : "px-8"
        }  items-center gap-2`}
      >
        <Textarea
          value={com}
          onChange={(e) => setCom(e.target.value)}
          placeholder="Leave a comment..."
        />
        <div className="flex justify-between items-center w-full">
          <p className=" text-xs">
            You must be{" "}
            <span
              onClick={() => checkUser()}
              className=" cursor-pointer underline text-[#BF7B67]"
            >
              loggedin
            </span>{" "}
            in to submit a comment.
          </p>
          <Button
            disabled={com.trim() === "" ? true : false}
            onClick={() => handleSubmit()}
            className="bg-[#BF7B67] text-white"
            size="sm"
          >
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
            onClick={() => handleLike()}
            xmlns="http://www.w3.org/2000/svg"
            fill={userLike ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={userLike ? "none" : "currentColor"}
            className={`size-6  text-[#BF7B67] ${
              userLike ? "" : "stroke cursor-pointer"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={
                userLike
                  ? "M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"
                  : "M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
              }
            />
          </svg>
          <p className=" text-sm font-light">{numLikes && numLikes} likes!</p>
        </div>
        <div className="flex text-sm"> {commentIds.length} comments!</div>
      </div>
      <Divider className="bg-[#BF7B67] my-2" />
      <div
        className={` flex flex-col ${
          isMobile ? "" : "px-8"
        }  items-center gap-2`}
      >
        {loader ? <Spinner color="warning"/> :  sortedComments.map((item, index) => (
          <SingleComment setIsOpen={setIsOpen} key={index} comment={item} />
        ))}
      </div>
    </div>
  );
}

export default Comment;
