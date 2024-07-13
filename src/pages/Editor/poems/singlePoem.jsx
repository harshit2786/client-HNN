import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UpdateData, getOneBlog } from "../../../controllers/strapiController";
import { EditorProvider } from "@tiptap/react";
import {
  MenuBar,
  extensions,
  props,
} from "../../../components/markdown/markdown";
import { Button, Image, Input, Textarea } from "@nextui-org/react";
import { useMobileLayout } from "../../../hooks/mobilelayout";

function PoemEdit() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [footer, setFooter] = useState("");
  const [id, setId] = useState(null);
  const isMobile = useMobileLayout();
  const generateUrl = (name) => {
    return name.toLowerCase().replace(/\s+/g, "-");
  };
  const handleLogout = () => {
    sessionStorage.removeItem("KadduData");
    navigate("/");
  };
  const handleSubmit = async () => {
    if (
      description === "" ||
      description === "<p></p>" ||
      title === "" ||
      footer === ""
    ) {
      return;
    }
    const formData = {
      Title: title,
      Complete: description,
      Footer: footer,
      Content: url,
      Path: generateUrl(title),
    };
    try {
      const resp = await UpdateData("blogs", id, formData);
      console.log("Updated successfully", resp);
      navigate("/editor");
    } catch (error) {
      console.log("Error", error);
    }
  };
  useEffect(() => {
    const getData = async () => {
      try {
        const resp = await getOneBlog("blogs", "Poem", name);
        console.log(resp.data[0]);
        setTitle(resp.data[0].attributes.Title);
        setDescription(resp.data[0].attributes.Complete);
        setFooter(resp.data[0].attributes.Footer);
        setUrl(resp.data[0].attributes.Content);
        setId(resp.data[0].id);
      } catch (error) {
        console.log("Error:", error);
      }
    };
    if (name) {
      getData();
    }
  }, [name]);
  useEffect(() => {
    if (sessionStorage.getItem("KadduData") === null) {
      navigate("/");
    }
  }, [navigate]);
  return (
    <div
      className={`${
        isMobile ? "min-h-screen pb-8 pt-16" : " overflow-y-auto h-screen pt-10"
      } flex justify-center bg-[#fdf7f3]`}
    >
      <div className=" flex gap-4 absolute top-2 right-2">
        <Button
          onClick={() => handleLogout()}
          size="sm"
          className=" bg-[#FAE9DD] text-[#BF7B67]"
        >
          Logout
        </Button>
      </div>
      <div className="w-[80%] flex gap-8 flex-col items-center">
        <div
          className={` ${
            isMobile
              ? "flex-col gap-2 items-center justify-center"
              : "justify-between"
          } w-full flex items-center `}
        >
          <Button className="bg-[#FAE9DD] text-[#BF7B67]" size="sm">
            Poem
          </Button>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            variant="bordered"
            size="sm"
            className=" bg-[#FAE9DD] border-[#BF7B67] text-[#BF7B67] w-52 text-xs"
            label="Title"
          />
          <Input
            value={footer}
            onChange={(e) => setFooter(e.target.value)}
            variant="bordered"
            size="sm"
            className=" bg-[#FAE9DD] border-[#BF7B67] text-[#BF7B67] w-52 text-xs"
            label="End"
          />
          <Textarea
            value={url}
            onValueChange={setUrl}
            variant="bordered"
            size="sm"
            className=" bg-[#FAE9DD] border-[#BF7B67] text-[#BF7B67] w-52 text-xs"
            label="Summary"
            disableAnimation
            disableAutosize
            classNames={{
              base: "max-w-xs",
              input: "resize-y min-h-[40px]",
            }}
          />
        </div>
        <div
          className={`w-full flex ${
            isMobile
              ? "flex-col justify-center items-center"
              : "justify-between h-[300px]"
          }  gap-2`}
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-lg text-[#BF7B67] font-light">
              Hi Kaddu Ji {`<3`}
            </div>
            <Image style={{ height: "250px" }} src="/poem_1.gif" alt="gif" />
          </div>
          <div className=" border border-[#BF7B67] h-auto rounded-lg  w-[70%]">
            {description !== "" && (
              <EditorProvider
                editorProps={props}
                extensions={extensions}
                content={description}
                slotBefore={
                  <MenuBar
                    descriptionContent={description}
                    setDescriptionContent={setDescription}
                  />
                }
              ></EditorProvider>
            )}
          </div>
        </div>
        <Button
          disabled={
            description === "" ||
            description === "<p></p>" ||
            title === "" ||
            footer === ""
          }
          onPress={() => handleSubmit()}
          className="bg-[#FAE9DD] text-[#BF7B67]"
          size="sm"
        >
          Submit
        </Button>
      </div>
    </div>
  );
}

export default PoemEdit;
