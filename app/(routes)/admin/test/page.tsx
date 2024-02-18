'use client'

import { useCallback, useState } from "react"
import {FileRejection, useDropzone} from 'react-dropzone'
import Image from "next/image"
import { Reorder } from "framer-motion"
import { TrashIcon, PhotoIcon, CursorArrowRippleIcon, CursorArrowRaysIcon } from "@heroicons/react/24/outline"

const FileUpload = () => {
    const [files, setFiles] = useState<File[]>([])
    const [errors, setErrors] = useState<string[]>([])

    const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        setFiles([...files, ...acceptedFiles])
        setErrors([])

        rejectedFiles.forEach((file) => {
            const err = file.errors[0]

            if (err.code === "file-too-large")
                setErrors([...errors, "File cannot be uploaded. Max size is 200kB."])

            if (err.code === "file-invalid-type")
                setErrors([...errors, "File cannot be uploaded. File type must be .png, .jpg, .jpeg, .gif."])

        })
    }, [files, errors])


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
        },
        maxSize: 200000
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
        <div className={"flex flex-col gap-2 text-sm"}>
            <div {...getRootProps()} className={"hover:cursor-pointer shadow flex flex-col gap-2 p-4 rounded-2xl border " +
                (isDragActive ? "border-dashed border-gray-500 bg-gray-50" : "bg-white border-white")}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <div className={"py-4 px-2 flex flex-row items-center gap-1"}>
                            <CursorArrowRaysIcon width={20} height={20}/>
                            Drop files here
                        </div> :
                        <div className={"py-4 px-2 flex flex-row items-center gap-1"}>
                            <CursorArrowRippleIcon width={20} height={20}/>
                            Drag and drop some files here, or click to select files
                        </div>
                }
            </div>
            {
                files && files.length > 0 &&
                <div className={"shadow flex flex-col gap-2 rounded-2xl bg-white p-4"}>
                    <Reorder.Group axis="x" values={files} onReorder={setFiles}
                                   className={"flex flex-row gap-2 overflow-auto scroll-light py-2"}>
                        {
                            files.map(file => {
                                return (
                                    <Reorder.Item key={file.name} value={file}
                                                  className={"flex flex-col bg-gray-50 rounded-2xl p-2 gap-2"}>
                                        <div className={"flex flex-row items-center justify-between my-2"}>
                                            <div className={"text-xs flex flex-row items-center gap-1"}>
                                                <PhotoIcon width={14} height={14}/>
                                                {printFileName(file.name)}
                                            </div>
                                            <div onClick={() => removeFile(file)} className={"hover:cursor-pointer"}>
                                                <TrashIcon width={16} height={16}/>
                                            </div>
                                        </div>
                                        <div className={"relative w-32 h-32 mb-2"}>
                                            <Image
                                                src={URL.createObjectURL(file)}
                                                alt={file.name}
                                                layout="fill"
                                                objectFit="cover"
                                                draggable={false}
                                            />
                                        </div>
                                    </Reorder.Item>
                                )
                            })
                        }
                    </Reorder.Group>
                    <div className={"text-xs px-1"}>{files.length} {files.length === 1 ? "image" : "images"}</div>
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