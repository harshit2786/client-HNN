import React, { useEffect, useState } from "react";
import SingleReply from "./SingleReply";
import { Button, Textarea } from "@nextui-org/react";
import { CreateData, getOneData } from "../../controllers/strapiController";

function Replies({ replyIds, setIsOpen, id ,log}) {
  const [toggle, setToggle] = useState(false);
  const [rep, setRep] = useState("");
  const [loader,setLoader] = useState(false);
  const [sortedReplies,setSortedReplies] = useState([]);
  const [replies, setReplies] = useState([]);
  const userId = sessionStorage.getItem("userData")
    ? JSON.parse(sessionStorage.getItem("userData"))
    : null;
  const handleSubmit = async () => {
    if (userId) {
      const formData = {
        Reply: rep,
        comment: {
          disconnect: [],
          connect: [
            {
              id: Number(id),
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
              id: Number(userId.user.id),
              position: {
                end: true,
              },
            },
          ],
        },
      };
      try{
        const resp = await CreateData("replies",formData);
      console.log("Reply posted",resp);
      window.location.reload();
      }
      catch(error){
        console.log("Error:",error);
      } 
      
    } else {
      setIsOpen(true);
    }
  };
  useEffect(() => {
    const fetchreplies = async() => {
        try{
            setLoader(true);
            const promises = replyIds.map((item) => getOneData("replies", Number(item.id)))
            const results = await Promise.all(promises);
            console.log("replieeeeee",results);
            setReplies(results);
            setLoader(false);
        }
        catch(error){
            console.log("Error:",error);
            setLoader(false);
        }
    }
    if (replyIds.length > 0) {
        fetchreplies();
    }
  }, [replyIds]);
  useEffect(() => {
    if(replies.length>0){
      let arr = [];
      arr = replies.sort(
        (a, b) =>
          new Date(b.data.attributes.createdAt) - new Date(a.data.attributes.createdAt)
      );
      setSortedReplies(arr);
    }
  },[replies])
  useEffect(() => {
    setRep("");
  }, [toggle]);
  return (
    <div className="w-full">
      {!toggle && (
        <p
          onClick={() => setToggle(true)}
          className=" cursor-pointer hover:underline text-xs"
        >
          {" "}
          Reply {replyIds.length === 0 ? "" : `(${replyIds.length})`}
        </p>
      )}
      {toggle && (
        <div className="w-full pt-4 flex flex-col gap-4">
        <div >
          <Textarea placeholder="Reply..." value={rep} onChange={(e) => setRep(e.target.value)} />
          <div className="w-full flex items-center py-2 justify-end">
            <Button
              className="bg-[#BF7B67] text-white"
              disabled={rep === "" ? true : false}
              size="sm"
              onClick={() => handleSubmit()}
            >
              Reply
            </Button>
          </div>
          </div>
          {sortedReplies.map((item) => (
            <SingleReply log={log} reply={item}/>
          ))}
          <p
            onClick={() => setToggle(false)}
            className="cursor-pointer hover:underline text-xs"
          >
            Hide Replies
          </p>
        </div>
      )}
    </div>
  );
}

export default Replies;
