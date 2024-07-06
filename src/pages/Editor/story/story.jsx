import React, { useEffect, useState } from 'react'
import { DeleteSingleAttribute, getOneTypeBlog } from '../../../controllers/strapiController';
import { Button, Chip, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { useNavigate } from 'react-router-dom';
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";



function EditorStory() {
    const navigate = useNavigate();
    const [stories,setStories] = useState([]);
    const [isOpen,setIsOpen] = useState(false);
    const [deleteId,setDeleteId] = useState(null);
    const [input,setInput] = useState("")
    const openModal = (id) => {
        setIsOpen(true);
        setDeleteId(id);
    }
    const handleDelete= async() =>{
        try{
            const resp = await DeleteSingleAttribute("blogs",deleteId);
            console.log("Successfully deleted",resp);
            window.location.reload();
        }
        catch(error){
            console.log("Error",error);
        }
    }
    useEffect(() => {
        if(sessionStorage.getItem("KadduData") === null){
            navigate('/');
        }
      },[navigate])
    useEffect(()=> {
        const fetchNotes = async()=> {
            try{
                const resp = await getOneTypeBlog("blogs","Story");
                setStories(resp.data);
                console.log(resp.data);
            }
            catch(error){
                console.log("Error:",error);
            }
        }
        fetchNotes();
    },[])
  return (
    <div className='h-screen bg-[#fdf7f3] flex flex-col gap-8 items-center justify-center'>
    <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        
        <ModalContent>
        <ModalHeader>Delete</ModalHeader>
        <ModalBody>
        <p className=' text-xs text-[#BF7B67] '> Type "DELETE" to permanently delete this story.</p>
           <Input value={input}  size='sm' onChange={(e)=> setInput(e.target.value)} color='danger' className='w-full'/>
        </ModalBody>
        <ModalFooter><Button onClick={()=> handleDelete()} size='sm' disabled={input!=="DELETE"} color={input==="DELETE"? "danger" : "default"}>Delete</Button></ModalFooter>
        </ModalContent>
    </Modal>
    <div className='text-xl text-[#BF7B67]'>Stories</div>
    
    <div className='bg-[#FAE9DD] h-[300px] border rounded-lg w-[80%] border-[#BF7B67] overflow-y-auto'>
      <Table removeWrapper>
        <TableHeader>
            <TableColumn><div className='item-center text-[#BF7B67] text-xs'>Story no.</div></TableColumn>
            <TableColumn><div className='item-center text-[#BF7B67] text-xs'>Title</div></TableColumn>
            <TableColumn><div className='item-center text-[#BF7B67] text-xs'>Edit</div></TableColumn>
            <TableColumn><div className='item-center text-[#BF7B67] text-xs'>Delete</div></TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No stories to display."}>
            {stories?.map((item)=>(
                <TableRow  >
                    <TableCell><Chip className='text-[#BF7B67] bg-[#f7d2c7] font-light text-xs' size='sm' >Story-{item?.id}</Chip></TableCell>
                    <TableCell>{item?.attributes?.Title}</TableCell>
                    <TableCell><Button onClick={()=> navigate(`/editor/stories/${item?.attributes?.Path}`)} size='sm' isIconOnly variant='flat' className='bg-[#f7d2c7]'><CiEdit/></Button></TableCell>
                    <TableCell><Button size='sm' onPress={()=> openModal(item.id)} isIconOnly variant='flat' color='danger'><MdDeleteForever/></Button></TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
      </div>
    </div>
  )
}

export default EditorStory
