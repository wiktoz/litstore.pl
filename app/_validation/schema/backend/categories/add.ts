import {boolean, mixed, object, string} from "yup"

const schema = object().shape({
    name: string().required("Name is required")
        .max(20, "Category name must be max 20 characters"),
    description: string()
        .max(300, "Description must be max 300 characters"),
    seo_description: string()
        .max(300, "SEO Description must be max 300 characters"),
    bg_photo: mixed(),
    active: boolean()
})