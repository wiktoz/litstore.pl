import {useState, useRef, forwardRef, useImperativeHandle} from 'react';
import {AiOutlineCloudUpload} from 'react-icons/ai'
import { Reorder } from "framer-motion"
import {AiOutlineClose} from 'react-icons/ai'
import Image from 'next/image'

const FileInputOrder = forwardRef((props, ref) => {

const wrapper = useRef();
const [fileList, setFileList] = useState(props.files || [])

useImperativeHandle(ref, () => ({
  getFiles: () => {
    return fileList
  },
  fileRemoveAll: () => {
    return fileRemoveAll()
  }
}))

const onFileDrop = (e) => {
   var newFile, src
   var arr = []
    for (let i = 0; i < e.target.files.length; i++){
      newFile = e.target.files[i];
      if(newFile){
          src = URL.createObjectURL(newFile)
          newFile.img = src
          newFile.id = newFile.name + Date.now()
          newFile.uploaded = false
          arr.push(newFile)
      }
    }
    setFileList(fileList.concat(arr))
}

const fileRemoveAll = () => {
  setFileList([])
}

const fileRemove = (file) =>{
  const updatedList = [...fileList]
  updatedList.splice(fileList.indexOf(file), 1)
  setFileList(updatedList)
}

return (
  <>
  <div className="max-w-xl mx-auto my-2">
    <label htmlFor={props.id} className="block text-sm font-medium text-gray-700">
      {props.title}
    </label>
    <div className="p-5 my-1 border rounded-lg relative hover:bg-gray-100 transition-all" ref={wrapper}>
      <div className="flex flex-col items-center justify-center">
        <div>
          <AiOutlineCloudUpload
            className="text-5xl font-thin"
          />
        </div>
        <div className="py-2">
          <p>Drag and Drop your files here</p>
        </div>
      </div>
      <input 
        className="absolute top-0 left-0 opacity-0 w-full h-full hover:cursor-pointer" 
        type="file"
        name={props.id}
        id={props.id}
        multiple 
        onChange={onFileDrop}
        onClick={(event)=> { 
          event.currentTarget.value = null
     }}
        >
      </input>
    </div>
    {
        fileList.length > 0 ? (
          <div className="my-5">
          <p className="my-2 text-sm text-gray-500">
            Uploaded files. You can reorder them dragging and releasing on different position.
          </p>
            <div className="overflow-auto scroll-light">
            { 
            <Reorder.Group axis="x" className="flex flex-row my-2" values={fileList} onReorder={setFileList}>
              {fileList.map((item, index) => (
                <Reorder.Item className="mr-1 relative bg-white" key={item.id} value={item}>
                  <div className="absolute top-1 right-1 text-gray-300 hover:cursor-pointer" onClick={() => fileRemove(item)}><AiOutlineClose></AiOutlineClose></div>
                  <div className="flex flex-col h-full w-28 border rounded-lg p-3 justify-content-center text-center">
                    <div className="grow flex items-center justify-center my-2">
                      <img className="small-img" src={item.img + (item.uploaded ? "?lastmod=" + Date.now() : "")} draggable='false'></img>
                    </div>
                    <div>
                      <p className="mt-3 overflow-hidden text-xs font-semibold">{item.name}</p>
                    </div>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
            }
            </div>
          </div>
        ) : ""
    }
  </div>
  </>
)
})

export default FileInputOrder