'use client'

import Input from "./Input"
import { resolver } from "../validation/schema/address"
import { useForm } from "react-hook-form"

interface Props extends Address {
    title?: string,
    description?: string,
    submitData: (data: Address) => void
    disabled?: boolean
}

const AddressForm = ({title, description, name, surname, email, street, post_code, city, submitData, disabled}:Props) => {

    const { register, handleSubmit, formState: {errors} }
        = useForm<Address>({resolver})

    const onSubmit = (data: Address) => {
        if(data)
            submitData(data)
    }

    return(
        <div>
                <div className="rounded px-6 py-2">
                    <div className="py-4">
                        <h3 className="text-lg font-semibold leading-6 text-gray-900">
                            {
                                title ? 
                                title : "Personal Information"
                            }
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                            {
                                description ? 
                                description : "Enter your details. The invoice will be issued for the following data"
                            }
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} >
                        <fieldset disabled={disabled ? disabled : false}>
                    <div className="overflow-hidden">
                        <div className="py-2">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                            <Input
                                checker={register}
                                errors={errors}
                                id="name"
                                title="First Name"
                                autoComplete="given-name"
                                value={name}
                            />
                            </div>

                            <div className="col-span-6">
                            <Input 
                                checker={register}
                                errors={errors}
                                id="surname"
                                title="Last Name"
                                autoComplete="family-name"
                                value={surname}
                            />
                            </div>

                            <div className="col-span-8">
                                <Input
                                    checker={register}
                                    errors={errors} 
                                    id="email"
                                    title="Email address"
                                    autoComplete="email"
                                    value={email}
                                />
                            </div>

                            <div className="col-span-12">
                                <Input
                                    checker={register}
                                    errors={errors} 
                                    id="street"
                                    title="Street, House Number (/Flat Number)"
                                    autoComplete="street-address"
                                    value={street}
                                />
                            </div>

                            <div className="col-span-4">
                                <Input
                                    checker={register}
                                    errors={errors} 
                                    id="postcode"
                                    title="Postal Code"
                                    autoComplete="postal-code"
                                    value={post_code}
                                />
                            </div>
                            <div className="col-span-6">
                                <Input 
                                    checker={register}
                                    errors={errors}
                                    id="city"
                                    title="City"
                                    autoComplete="address-level-2"
                                    value={city}
                                />
                            </div>
                            <div className="col-span-12">
                                <button type="submit" className="px-6 py-3 my-2 bg-gray-700 text-white rounded">
                                    Save
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </fieldset>
                    </form>
                </div>
            </div>
    )
}

AddressForm.displayName = "AddressForm"
export default AddressForm