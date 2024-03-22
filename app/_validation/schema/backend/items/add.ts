import {array, number, object, string} from "yup"

const objectID = /^[a-f\d]{24}$/i

const schema = object().shape({
    product_id: string().required("Product ID is required"),
    options: array().of(object().shape({
        variant_id: string().required("Variant ID is required")
            .matches(objectID, "Object ID is not correct"),
        option_id: string().required("Option ID is required")
            .matches(objectID, "Object ID is not correct")
    })),
    stock: number(),
    unit: string(),
    price: number()
})