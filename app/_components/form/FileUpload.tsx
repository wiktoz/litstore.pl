'use client'

import {Dispatch, SetStateAction, useCallback, useState} from "react"
import {FileRejection, useDropzone} from 'react-dropzone'
import Image from "next/image"
import { Reorder } from "framer-motion"
import { TrashIcon, PhotoIcon, CursorArrowRippleIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline"

interface FileUploadInterface {
    title?: string,
    files: File[], 
    setFiles: Dispatch<SetStateAction<File[]>>,
    multiple: boolean
}

const FileUpload = ({title, files, setFiles, multiple}:FileUploadInterface) => {
    const [errors, setErrors] = useState<string[]>([])

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        if(!multiple) setFiles([...acceptedFiles])
        else setFiles([...files, ...acceptedFiles])

        setErrors([])

        rejectedFiles.forEach((file) => {
            const err = file.errors[0]

            if (err.code === "file-too-large")
                setErrors([...errors, "File cannot be uploaded. Max size is 200kB."])

            if (err.code === "file-invalid-type")
                setErrors([...errors, "File cannot be uploaded. File type must be .png, .jpg, .jpeg, .gif."])

        })
    }, [multiple, setFiles, files, errors])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
        },
        maxSize: 400000,
        multiple: multiple
    })

    const removeFile = (file: File) =>{
        const updatedList = [...files]
        updatedList.splice(files.indexOf(file), 1)
        setFiles(updatedList)
    }

    const printFileName = (name: string) => {
        return name.length > 10 ? name.slice(0, 10) + "..." : name
    }

    return(
        <div className={"flex flex-col gap-1 text-sm"}>
            <div>
                {
                    title &&
                    <div className={"block text-xs text-gray-700 px-1"}>
                        {title}
                    </div>
                }
            </div>
            <div {...getRootProps()} className={"hover:cursor-pointer flex flex-col gap-2 p-4 rounded-lg border border-gray-300 " +
                (isDragActive ? "border-dashed border-gray-500 bg-gray-50" : "bg-white")}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <div className={"py-4 px-2 flex flex-row items-center gap-1"}>
                            <CursorArrowRaysIcon width={20} height={20}/>
                            Drop files here
                        </div> :
                        <div className={"py-4 px-2 flex flex-row items-center gap-2 text-gray-700"}>
                            <CursorArrowRippleIcon width={20} height={20}/>
                            Drag and drop some files here, or click to select files
                        </div>
                }
            </div>
            {
                files && files.length > 0 &&
                <div className={"flex flex-col gap-2 rounded-lg p-4 border border-gray-300 bg-white"}>
                    <Reorder.Group axis="x" values={files} onReorder={setFiles}
                                   className={"flex flex-row gap-2 overflow-auto scroll-light"}>
                        {
                            files.map(file => {
                                return (
                                    <Reorder.Item key={file.name} value={file}
                                                  className={"border border-gray-300 overflow-hidden flex flex-col rounded-lg"}>
                                        <div className={"flex flex-row items-center justify-between bg-gray-50 p-2 py-4"}>
                                            <div className={"text-xs flex flex-row items-center gap-1"}>
                                                <PhotoIcon width={14} height={14}/>
                                                {printFileName(file.name)}
                                            </div>
                                            <div onClick={() => removeFile(file)} className={"hover:cursor-pointer"}>
                                                <TrashIcon width={16} height={16}/>
                                            </div>
                                        </div>
                                        <div className={"relative w-32 h-36"}>
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                fill={true}
                                                draggable={false}
                                                style={{objectFit:"cover"}}
                                                className={""}
                                            />
                                        </div>
                                    </Reorder.Item>
                                )
                            })
                        }
                    </Reorder.Group>
                    <div className={"text-xs px-1 pt-4"}>{files.length} {files.length === 1 ? "image" : "images"}</div>
                </div>
            }
            <div className={"flex flex-col text-xs text-red-600 gap-1 px-1"}>{
                errors &&
                errors.map((err, i) => {
                    return(
                        <p key={i}>{err}</p>
                    )
                })
            }</div>
        </div>
    )
}

export default FileUpload