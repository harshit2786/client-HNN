import React, { useEffect, useState } from "react";
import { getOneBlog } from "../../../controllers/strapiController";
import { useNavigate, useParams } from "react-router-dom";
import { useMobileLayout } from "../../../hooks/mobilelayout";
import { BreadcrumbItem, Breadcrumbs, Button, Spinner } from "@nextui-org/react";

function SingleNote() {
  const { note } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [footer, setFooter] = useState("");
  const [id, setId] = useState(null);
  const [loader, setLoader] = useState(true);
  const [date, setDate] = useState("");
  const isMobile = useMobileLayout();

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

  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await getOneBlog("blogs", "Note", note);
        setTitle(resp.data[0].attributes.Title);
        setDescription(resp.data[0].attributes.Complete);
        setFooter(resp.data[0].attributes.Footer);
        setId(resp.data[0].id);
        setDate(formatTimestamp(resp.data[0].attributes.createdAt));
        setLoader(false);
        if(resp.data.length === 0){
          navigate('/');
        }
      } catch (error) {
        console.log("Error:", error);
        setLoader(false);
        navigate('/')
      }
    };
    if (note) {
      getData();
    }
  }, [note,navigate]);
  return (
    <div className="h-full flex items-center flex-col w-full">
      <div className="w-full px-8 border-[#BF7B67] flex justify-between items-center sticky border-b  h-20">
        <Breadcrumbs isDisabled>
          <BreadcrumbItem>
            <p className="text-[#e7946f] ">Notes</p>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <p className="text-[#BF7B67] ">{title}</p>
          </BreadcrumbItem>
        </Breadcrumbs>
        <Button
          size="sm"
          className=" bg-[#FAE9DD] text-[#BF7B67]"
          onClick={() => navigate("/notes")}
        >
          Back to Notes
        </Button>
      </div>
      <div
        className={`px-8 py-8 w-full h-full ${
          isMobile ? "" : "overflow-y-auto "
        } `}
      >
        <div className={`border-[#BF7B67] p-4 flex flex-col ${loader ? " justify-center" : ""} gap-2 bg-[#FAE9DD] shadow-md border min-h-[200px]`}>
        {loader ?  <Spinner color="warning"></Spinner> :<>
          <div className="w-full flex justify-between items-center">
            <p className="text-2xl text-[#BF7B67]">{title}</p>
            <p className=" text-xs ">{date}</p>
          </div>
          <div className="flex w-full pl-4 justify-start">
            <p className="font-light pt-2 text-gray-500 text-sm leading-relaxed">~{footer}</p>
          </div>

          <div
            className="font-light pt-4 text-sm leading-relaxed w-full"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
          </>}
        </div>
      </div>
    </div>
  );
}

export default SingleNote;
