'use client'

import Input from "@/components/form/Input";
import {useState} from "react";
import {useForm} from "react-hook-form";
import FileUpload from "@/components/form/FileUpload";
import {resolver} from "@/components/validation/schema/mainSettings";

interface Settings {
    facebookLink: string,
    instaLink: string,
    shopName: string,
    shopEmail: string,
    shopPhone: string
}

const MainSettings = () => {
    const [facebookLink, setFacebookLink] = useState("")
    const [instaLink, setInstaLink] = useState("")
    const [shopName, setShopName] = useState("")
    const [shopEmail, setShopEmail] = useState("")
    const [shopPhone, setShopPhone] = useState("")

    const [logo, setLogo] = useState<File[]>([])

    const { register, handleSubmit, formState: {errors} }
        = useForm<Settings>({resolver})
    const submitSettings = () => {
        console.log("submitting")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitSettings)}>
                <Input
                    id="facebookLink"
                    title="Facebook Link"
                    type="text"
                    value={facebookLink}
                    errors={errors}
                    checker={register}
                    setter={setFacebookLink}
                />
                <Input
                    id="instaLink"
                    title="Instagram Link"
                    type="text"
                    value={instaLink}
                    errors={errors}
                    checker={register}
                    setter={setInstaLink}
                />
                <Input
                    id="shopName"
                    title="Shop Name"
                    type="text"
                    value={shopName}
                    errors={errors}
                    checker={register}
                    setter={setShopName}
                />
                <Input
                    id="shopEmail"
                    title="Shop e-mail"
                    type="email"
                    value={shopEmail}
                    errors={errors}
                    checker={register}
                    setter={setShopEmail}
                />
                <Input
                    id="shopPhone"
                    title="Shop phone number"
                    type="text"
                    value={shopPhone}
                    errors={errors}
                    checker={register}
                    setter={setShopPhone}
                />
                <FileUpload files={logo} setFiles={setLogo} multiple={false} />
                <button type="submit" className="mt-2 bg-gray-700 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
        </div>
    )
}

export default MainSettings