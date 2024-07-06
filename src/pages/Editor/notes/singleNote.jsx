import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { UpdateData, getOneBlog } from '../../../controllers/strapiController';
import { EditorProvider } from '@tiptap/react';
import { MenuBar, extensions, props } from '../../../components/markdown/markdown';
import { Button, Input } from '@nextui-org/react';

function NoteEdit() {
    const {name} = useParams();
    const navigate = useNavigate()
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [url,setUrl] = useState("");
    const[footer,setFooter] = useState("")
    const [id,setId] = useState(null);
    const generateUrl = (name) =>{
        return name.toLowerCase().replace(/\s+/g,"-");
      }
    const handleSubmit = async() => {
        if(description ==="" || description === "<p></p>" || title ==="" || footer===""){
            return;
        }
        const formData = {
            Title: title,
            Content: description,
            Footer: footer,
            url:url,
            Path:generateUrl(title)
        }
        try{
            const resp = await UpdateData("blogs", id,formData);
            console.log("Updated successfully",resp);
            navigate('/editor');
        }
        catch(error){
            console.log("Error",error)
        }
      }
    useEffect(()=> {
        const getData = async()=>{
            try{
                const resp = await getOneBlog("blogs","Note",name);
                setTitle(resp.data[0].attributes.Title);
                setDescription(resp.data[0].attributes.Content);
                setFooter(resp.data[0].attributes.Footer);
                setUrl(resp.data[0].attributes.url);
                setId(resp.data[0].id);
            }
            catch(error){
                console.log("Error:",error)
            }
        }
        if(name){
            getData();
        }
    },[name])
    useEffect(() => {
        if(sessionStorage.getItem("KadduData") === null){
            navigate('/');
        }
      },[navigate])
  return (
    <div className="h-screen flex justify-center pt-16 bg-[#fdf7f3]">
    <div className="w-[80%] flex gap-8 flex-col items-center">
      <div className="w-full flex items-center justify-between ">
        
            <Button className="bg-[#FAE9DD] text-[#BF7B67]" size="sm">
              Note
            </Button>
          
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
      <div className=" border border-[#BF7B67] h-auto rounded-lg  w-[80%]">
      {description !=="" && <EditorProvider
        editorProps={props}
        extensions={extensions}
        content={description}
        slotBefore={
          <MenuBar
            descriptionContent={description}
            setDescriptionContent={setDescription}
          />
        }
      ></EditorProvider>}
      </div>
      <Button disabled={description ==="" || description === "<p></p>" || title ==="" || footer===""} onPress={()=>handleSubmit()} className="bg-[#FAE9DD] text-[#BF7B67]" size="sm">Submit</Button>
    </div>
  </div>
  )
}

export default NoteEdit
