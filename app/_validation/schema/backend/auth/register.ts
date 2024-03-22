import {object, ref, string} from 'yup'

const schema = object().shape({
    email: string().required("Email is required")
        .email("Not valid email")
        .min(3, "Email must be at least 3 characters")
        .max(60, "Email must be max 60 characters"),
    password: string().required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(70, "Password must be max 70 characters"),
    passwordConfirm: string().required("Password Confirmation is required")
        .oneOf([ref("password")], "Passwords must match")
})