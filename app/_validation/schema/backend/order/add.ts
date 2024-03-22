import {array, number, object, string} from "yup"

const objectID = /^[a-f\d]{24}$/i

const schema = object().shape({
    buyer: object().shape({
        user_id: string().matches(objectID, "User ID is not valid"),
        email: string().required("Buyer email is required")
            .email("Buyer email is not valid"),
        name: string().required("Buyer name is required"),
        surname: string().required("Buyer surname is required"),
        street: string().required("Buyer street is required"),
        house: string().required("Buyer house is required"),
        flat: string(),
        city: string().required("Buyer city is required"),
        post_code: string().required("Buyer post code is required")
    }),
    delivery: object().shape({
        id: string().matches(objectID, "Delivery ID is not valid"),
        price: number().required("Delivery Price is required"),
        email: string().required("Buyer email is required")
            .email("Buyer email is not valid"),
        name: string().required("Buyer name is required"),
        surname: string().required("Buyer surname is required"),
        street: string().required("Buyer street is required"),
        house: string().required("Buyer house is required"),
        flat: string(),
        city: string().required("Buyer city is required"),
        post_code: string().required("Buyer post code is required")
    }),
    items: array().of(object().shape({
        item_id: string().required("Item ID is required")
            .matches(objectID, "Item ID is not valid"),
        product_id: string().required("Product ID is required")
            .matches(objectID, "Product ID is not valid"),
        qty: number().required("Item qty is required"),
        price: number().required("Item price is required")
    })),
    promo_code: object().shape({
        code: string(),
        discount: number()
    }),
    payment: object().shape({
        amount: number().required("Payment amount is required"),
        currency: string().required("Payment currency is required"),
        method: string().required("Payment method is required"),
        hash: string(),
        url: string(),
        status: string().required("Payment status is required")
            .oneOf(["PENDING", "SUCCESS", "FAILURE"], "Payment status is incorrect"),
    }),
    status: string().required("Order status is required")
        .oneOf(["payment", "cancelled", "preparing", "sent" ,"completed"])
})