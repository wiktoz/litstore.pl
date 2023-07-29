import React, {useState, useRef} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai'
import {AiOutlineClose} from 'react-icons/ai'

export default function FileInput({multiple}){

const wrapper = useRef();
const [fileList, setFileList] = useState([]);

const onFileDrop = (e) =>{
   var newFile, src
   var arr = []
    for (let i = 0; i < e.target.files.length; i++){
      newFile = e.target.files[i];
      if(newFile){
          src = URL.createObjectURL(newFile)
          newFile.urlSrc = src
          arr.push(newFile)
      }
    }
    setFileList(fileList.concat(arr))
}

const fileRemove = (file) =>{
  const updatedList = [...fileList]
  updatedList.splice(fileList.indexOf(file), 1)
  setFileList(updatedList)
}

return (
  <div className="mx-auto my-2">
    <div className="bg-white p-5 border rounded-lg relative hover:bg-gray-100 transition-all" ref={wrapper}>
      <div className="flex flex-col items-center justify-center">
        <div>
          <AiOutlineCloudUpload
            className="text-5xl"
          />
        </div>
        <div className="py-2">
          <p>Drag and Drop your files here</p>
        </div>
      </div>
      <input 
        className="absolute top-0 left-0 opacity-0 w-full h-full hover:cursor-pointer" 
        type="file"
        multiple={multiple ? multiple : true}
        onChange={onFileDrop}
        onClick={(event)=> { 
          event.currentTarget.value = null
     }}
        >
      </input>
    </div>
    {
        fileList.length > 0 ? (
            <div>
            { 
                fileList.map((item,index) => {
                  return(
                    <div
                      className="bg-gray-100 items-center rounded-lg p-2 my-2"
                      key={item.name + index}
                    >
                      <div className="flex flex-row justify-between h-16"> 
                        <div className="my-auto">
                          <img
                            className="w-16" 
                            src={item.urlSrc}
                          />
                        </div>
                        <div className="font-medium text-md my-auto">
                          <p>{item.name}</p>
                        </div>
                        <div className="text-md my-auto">
                          <AiOutlineClose
                            className='hover:cursor-pointer hover:text-gray-400' 
                            onClick={()=>fileRemove(item)}></AiOutlineClose>
                        </div>
                      </div>
                    </div>
                  )
                })
            }
            </div>
        ) : ""
    }
  </div>
)
}