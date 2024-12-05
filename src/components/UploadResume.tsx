"use client"
import React, { useState } from 'react'
import axios from 'axios';
import { FileUpload } from './ui/file-upload';

const UploadResume = () => {
    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = async(files: File[]) => {
      setFiles(files);
      console.log(files);
      const form = new FormData();
      form.append("file", files[0]);
      try{
        const res  = await axios.post("/api/learning/upload", form  )
        console.log(res.data)
      }catch (error){
        console.error(error);
      }

    };
  return (
    <div className='w-full flex items-center'>
        <div className="container mx-auto">
        <FileUpload onChange={()=>handleFileUpload(files)} />
        </div>
    </div>
  )
}

export default UploadResume