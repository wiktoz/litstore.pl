import Yup from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const addressSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    surname: Yup.string().required('Surname is required'),
    email: Yup.string().email('Not valid email').required('Email is required'),
    street: Yup.string().required('Street is required'),
    city: Yup.string().required("City is required"),
    postcode: Yup.string().required("Postcode is required")
})

const resolver = yupResolver(addressSchema)

export { resolver }