import React, { useEffect, useState } from "react";
import {
  DeleteSingleAttribute,
  getOneData,
} from "../../controllers/strapiController";
import {
  Avatar,
  Button,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Spinner,
} from "@nextui-org/react";
import Replies from "../Replies/Replies";

function SingleComment({ comment, setIsOpen}) {
  const [user, setUser] = useState(null);
  const [log,setLog] = useState(null);
  const [loader,setLoader] = useState(false);
  const userId = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;
  const handleDelete = async () => {
    let comId = comment.data.id;
    let repId = comment.data.attributes.replies.data.map((item) => {
      return item.id;
    });
    try {
      const promises = repId.map((id) =>
        DeleteSingleAttribute("replies", Number(id))
      );
      const results = await Promise.all(promises);
      const resp = await DeleteSingleAttribute("comments", Number(comId));
      console.log("Deleted", results, resp);
      window.location.reload();
    } catch (error) {
      console.log("Error", error);
    }
  };
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const month = months[date.getUTCMonth()];
    const day = date.getUTCDate();
    const year = date.getUTCFullYear();
    const hours = date.getUTCHours();
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    return `${month} ${day}, ${year} ${hours}:${minutes}`;
  }
  const color = ["primary", "secondary", "warning", "success", "danger"];
  const numColors = color.length;
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoader(true);
        const resp = await getOneData(
          "users",
          comment.data.attributes.user.data.id
        );
        console.log("Successfully fetched", resp);
        setUser(resp);
        setLoader(false);
      } catch (error) {
        console.log("Error", error);
        setLoader(false);
      }
    };
    if (comment) {
      fetchUser();
    }
  }, [comment]);
  useEffect(() => {
    const getCurr = async() => {
        try{
            const resp = await getOneData("users",userId.user.id);
            setLog(resp);
        }
        catch(error){
            console.log("Error:",error)
        }
    }
    if(userId?.user?.id){
        getCurr()
    }
  },[userId?.user?.id])
  return (
    <> {loader ? <Spinner color="warning"/> :
    <div className="w-full gap-4 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Avatar
            className=" text-[.5rem]"
            style={{ height: "25px", width: "25px" }}
            showFallback
            src={user?.role?.name === "Author" ? "/adarshidp.png" : ""}
            name={user?.FirstName?.charAt(0)}
            color={color[Number(user?.id) % numColors]}
          />
          <p
            className={` text-xs ${
              user?.role?.name === "Author" ? " font-semibold" : ""
            }`}
          >
            {user?.FirstName}{" "}
            <span className=" font-normal">
              {user?.role?.name === "Author" ? "(Author)" : ""}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-xs">
            {formatTimestamp(comment.data.attributes.createdAt)}
          </p>
          {userId &&
            (userId.user.id === comment.data.attributes.user.data.id || log?.role?.name === "Author") && (
              <Dropdown>
                <DropdownTrigger>
                  <Button size="sm" isIconOnly variant="light" color="danger">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Button>
                </DropdownTrigger>
                <DropdownMenu>
                  <DropdownItem
                    onClick={() => handleDelete()}
                    className=" text-xs"
                    variant="flat"
                    color="danger"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            )}
        </div>
      </div>
      <p className=" text-sm">{comment?.data?.attributes?.Comment}</p>
      <div className="w-[80%] pl-4">
        <Replies
            log={log}
          id={comment?.data?.id}
          setIsOpen={setIsOpen}
          replyIds={comment?.data?.attributes?.replies?.data}
        />
      </div>
      <Divider className="bg-[#BF7B67] my-2" />
    </div>}
    </>
  );
}

export default SingleComment;
