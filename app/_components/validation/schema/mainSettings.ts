import { object, string } from 'yup'
import {yupResolver} from "@hookform/resolvers/yup"
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = object().shape({
    facebookLink: string().url("Not a valid URL"),
    instaLink: string().url("Not a valid URL"),
    shopName: string().required("Shop Name is required"),
    shopEmail: string().email("Provide valid email").required("Shop E-mail is required"),
    shopPhone: string().required("Shop Phone is required").matches(phoneRegExp, 'Phone number is not valid')
})

const resolver = yupResolver(validationSchema)

export { resolver }