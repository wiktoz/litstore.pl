import Input from "./Input"
import { forwardRef, useState } from "react"
import { useImperativeHandle } from "react"
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const AddressForm = forwardRef(({title, description, name, surname, email, street, postcode, city, submitData, disabled}, _ref) => {
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        surname: Yup.string()
            .required('Surname is required'),
        email: Yup.string().email('Not valid email').required('Email is required'),
        street: Yup.string().required('Street is required'),
        city: Yup.string().required("City is required"),
        postcode: Yup.string().required("Postcode is required")
    })

    const resolver = yupResolver(validationSchema)
    const { register, handleSubmit, reset, formState: {errors} } = useForm({resolver})

    const onSubmit = (data) => {
        if(data){
            submitData(data)
        }
    }

    return(
        <div>
                <div className="rounded p-4">
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
                        <fieldset disabled={disabled}>
                    <div className="overflow-hidden">
                        <div className="py-5">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-6">
                            <Input
                                register={register} 
                                errors={errors}
                                id="name"
                                title="First Name"
                                autoComplete="given-name"
                                value={name}
                            />
                            </div>

                            <div className="col-span-6">
                            <Input 
                                register={register} 
                                errors={errors}
                                id="surname"
                                title="Last Name"
                                autoComplete="family-name"
                                value={surname}
                            />
                            </div>

                            <div className="col-span-8">
                                <Input
                                    register={register} 
                                    errors={errors} 
                                    id="email"
                                    title="Email address"
                                    autoComplete="email"
                                    value={email}
                                />
                            </div>

                            <div className="col-span-12">
                                <Input
                                    register={register} 
                                    errors={errors} 
                                    id="street"
                                    title="Street, House Number (/Flat Number)"
                                    autoComplete="street-address"
                                    value={street}
                                />
                            </div>

                            <div className="col-span-4">
                                <Input
                                    register={register} 
                                    errors={errors} 
                                    id="postcode"
                                    title="Postal Code"
                                    autoComplete="postal-code"
                                    value={postcode}
                                />
                            </div>
                            <div className="col-span-6">
                                <Input 
                                    register={register} 
                                    errors={errors}
                                    id="city"
                                    title="City"
                                    autoComplete="address-level-2"
                                    value={city}
                                />
                            </div>
                            <div className="col-span-12">
                                <button type="submit" className="px-6 py-3 my-2 bg-gray-700 text-white rounded">Save</button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </fieldset>
                    </form>
                </div>
            </div>
    )
})

export default AddressForm