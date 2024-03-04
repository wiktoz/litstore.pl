import {string, object, number} from "yup"
import {yupResolver} from "@hookform/resolvers/yup"

const schema = object().shape({
    code: string().required('Code is required'),
    unit: string().required("Unit is required").oneOf(["cashValue", "percent"]),
    value: number().required('Value is required').test({
        name: 'max',
        exclusive: false,
        params: { },
        message: 'Max value is 100%',
        test: function (value) {
            return this.parent.unit === "percent" ? value <= 100 : true
        },
    }),
})

const resolver = yupResolver(schema)

export { resolver }