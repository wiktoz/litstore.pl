import NewInput from "../../../app/components/form/NewInput";
import {useState} from "react";
import * as Yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import {useForm} from "react-hook-form";
import FileUpload from "../../../app/components/form/file-upload/FileUpload"

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const MainSettings = () => {
    const [facebookLink, setFacebookLink] = useState("")
    const [instaLink, setInstaLink] = useState("")
    const [shopName, setShopName] = useState("")
    const [shopEmail, setShopEmail] = useState("")
    const [shopPhone, setShopPhone] = useState("")


    const validationSchema = Yup.object().shape({
        facebookLink: Yup.string().url("Not a valid URL"),
        instaLink: Yup.string().url("Not a valid URL"),
        shopName: Yup.string().required("Shop Name is required"),
        shopEmail: Yup.string().email("Provide valid email").required("Shop E-mail is required"),
        shopPhone: Yup.string().required("Shop Phone is required").matches(phoneRegExp, 'Phone number is not valid')
    })

    const resolver = yupResolver(validationSchema)
    const { register, handleSubmit, formState: {errors} } = useForm({resolver})
    const submitSettings = () => {
        console.log("submitting")
    }

    return (
        <div>
            <form onSubmit={handleSubmit(submitSettings)}>
                <NewInput
                    id="facebookLink"
                    title="Facebook Link"
                    type="text"
                    value={facebookLink}
                    errors={errors}
                    checker={register}
                    setter={setFacebookLink}
                />
                <NewInput
                    id="instaLink"
                    title="Instagram Link"
                    type="text"
                    value={instaLink}
                    errors={errors}
                    checker={register}
                    setter={setInstaLink}
                />
                <NewInput
                    id="shopName"
                    title="Shop Name"
                    type="text"
                    value={shopName}
                    errors={errors}
                    checker={register}
                    setter={setShopName}
                />
                <NewInput
                    id="shopEmail"
                    title="Shop e-mail"
                    type="email"
                    value={shopEmail}
                    errors={errors}
                    checker={register}
                    setter={setShopEmail}
                />
                <NewInput
                    id="shopPhone"
                    title="Shop phone number"
                    type="text"
                    value={shopPhone}
                    errors={errors}
                    checker={register}
                    setter={setShopPhone}
                />
                <FileUpload multiple={false} />
                <button type="submit" className="mt-2 bg-gray-700 text-white px-4 py-2 rounded-lg">Submit</button>
            </form>
        </div>
    )
}

export default MainSettings