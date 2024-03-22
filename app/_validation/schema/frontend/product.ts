import {string, object, boolean} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = object().shape({
    name: string().required('Name is required'),
    description: string(),
    manufacturer: string(),
    category: string(),
    subcategory: string(),
    variant: string(),
    new_badge: boolean(),
    active: boolean(),
})

const resolver = yupResolver(schema)

export { resolver }