import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,Image
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { EditorProvider } from "@tiptap/react";
import { MenuBar, props, extensions } from "../../components/markdown/markdown";
import { useNavigate } from "react-router-dom";
import { CreateData } from "../../controllers/strapiController";
import { useMobileLayout } from "../../hooks/mobilelayout";

function Create() {
    const isMobile = useMobileLayout();
    const navigate = useNavigate();
  const [options, setOptions] = useState(new Set([]));
  const arr = ["Poem", "Story", "Memoir", "Note", "Quote", "Other"];
  const [description, setDescription] = useState("");
  const [footer,setFooter] = useState("");
  const [url,setUrl] = useState("");
  const [title,setTitle] = useState("");
  const generateUrl = (name) =>{
    return name.toLowerCase().replace(/\s+/g,"-");
  }
  const handleLogout = () => {
    sessionStorage.removeItem('KadduData');
    navigate('/');
  }
  const handleSubmit = async() => {
    if(Array.from(options).length ===0 || description ==="" || description === "<p></p>" || title ==="" || footer===""){
        return;
    }
    const formData = {
        Title: title,
        Content: description,
        Footer: footer,
        Type: Array.from(options)[0],
        url:url,
        Path:generateUrl(title)
    }
    try{
        const resp = await CreateData("blogs",formData);
        console.log("Created successfully",resp);
        navigate('/editor');
    }
    catch(error){
        console.log("Error",error)
    }
  }
  const handleSubmitDraft = async() => {
    if(Array.from(options).length ===0 || description ==="" || description === "<p></p>" || title ==="" || footer===""){
        return;
    }
    const formData = {
        Title: title,
        Content: description,
        Footer: footer,
        Type: Array.from(options)[0],
        url:url,
        Path:generateUrl(title)
    }
    try{
        const resp = await CreateData("drafts",formData);
        console.log("Created successfully",resp);
        navigate('/editor');
    }
    catch(error){
        console.log("Error",error)
    }
  }
  useEffect(() => {
    if(sessionStorage.getItem("KadduData") === null){
        navigate('/');
    }
  },[navigate])
  return (
    <div className={`${isMobile ? "min-h-screen pb-8" : " h-screen"} flex justify-center pt-16 bg-[#fdf7f3]`}>
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
        <div className={` ${isMobile ? "flex-col gap-2 items-center justify-center" : "justify-between"} w-full flex items-center `}>
          <Dropdown>
            <DropdownTrigger>
              <Button className="bg-[#FAE9DD] text-[#BF7B67]" size="sm">
                {options.size === 0 ? "Add" : Array.from(options)[0]}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              selectionMode="single"
              selectedKeys={options}
              onSelectionChange={setOptions}
            >
              {arr.map((item) => (
                <DropdownItem key={item}>{item}</DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
          <Input
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            variant="bordered"
            size="sm"
            className=" bg-[#FAE9DD] border-[#BF7B67] text-[#BF7B67] w-52 text-xs"
            label="Title"
          />
          <Input
            value={footer}
            onChange={(e)=>setFooter(e.target.value)}
            variant="bordered"
            size="sm"
            className=" bg-[#FAE9DD] border-[#BF7B67] text-[#BF7B67] w-52 text-xs"
            label="End"
          />
          <Input
            value={url}
            onChange={(e)=>setUrl(e.target.value)}
            variant="bordered"
            size="sm"
            className=" bg-[#FAE9DD] border-[#BF7B67] text-[#BF7B67] w-52 text-xs"
            label="Image URL"
          />
        </div>
        <div className={`w-full flex ${isMobile ? "flex-col justify-center items-center" : "justify-between"}  gap-2`}>
        <div className="flex flex-col items-center justify-center"><div className="text-lg text-[#BF7B67] font-light">Keep it up Kaddu Ji{" "} {`>.<`}</div><Image src="/adarshi.gif" alt="gif"/></div>
        <div className=" border border-[#BF7B67] h-auto rounded-lg  w-[70%]">
        <EditorProvider
          editorProps={props}
          extensions={extensions}
          slotBefore={
            <MenuBar
              descriptionContent={description}
              setDescriptionContent={setDescription}
            />
          }
          content=""
        ></EditorProvider>
        </div>
        </div>
        <div className=" flex gap-2 items-center justify-center">
        <Button onClick={()=> handleSubmit()} className={`bg-[#FAE9DD] text-[#BF7B67]" size="sm`}>Submit</Button>
        <Button onClick={()=> handleSubmitDraft()} className={`bg-[#FAE9DD] text-[#BF7B67]" size="sm`}>Save as Draft</Button>
        </div>
        
      </div>
    </div>
  );
}

export default Create;
