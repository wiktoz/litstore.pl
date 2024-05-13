'use client'

import Input from "./Input"
import { resolver } from "@/validation/schema/frontend/address"
import { useForm } from "react-hook-form"
import {useState} from "react";
import Button from "@/components/admin/Button";
import {PencilSquareIcon} from "@heroicons/react/24/outline";

interface Props extends AddressInterface {
    title?: string,
    description?: string,
    submitData: (data: AddressInterface) => void,
    disableOnSave?: boolean,
    dataLocked?: boolean
}

const AddressForm = ({title, description, name, surname, email, street, post_code, city, submitData, disableOnSave, dataLocked}:Props) => {
    const [locked, setLocked] = useState<boolean>(dataLocked ? dataLocked : false)
    const { register, handleSubmit, formState: {errors} }
        = useForm<AddressInterface>({resolver})

    const onSubmit = (data: AddressInterface) => {
        if(disableOnSave)
            setLocked(true)
        if(data)
            submitData(data)
    }

    return(
            <div>
                <div className="rounded-lg py-2">
                    <div className={title ? "mb-6" : ""}>
                        <h3 className={"font-bold text-gray-700"}>
                            {
                                title && title
                            }
                        </h3>
                        <div className={"text-xs text-gray-500"}>
                            {
                                description && description
                            }
                        </div>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className={locked ? "opacity-50" : ""}>
                    <fieldset disabled={locked}>
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
                                    id="post_code"
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
                                <button type="submit" className="text-sm w-full py-2 my-2 bg-gray-700 text-white rounded-lg">
                                    Save
                                </button>
                            </div>
                        </div>
                        </div>
                    </div>
                    </fieldset>
                    </form>
                    {
                        locked &&
                        <Button
                            icon={<PencilSquareIcon width={16} height={16}/>}
                            title={"Edit"}
                            onClick={() => setLocked(false)}
                        />
                    }
                </div>
            </div>
    )
}

AddressForm.displayName = "AddressForm"
export default AddressForm