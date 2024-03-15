'use client'

import { AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Contact(){
    return(
        <div className={"mx-8 my-4 gap-4 flex flex-col"}>
            <div className="text-2xl font-bold text-gray-800">Contact us</div>

            <div className={"bg-gray-50 rounded-lg p-8 flex flex-col gap-1"}>
                <div className={"font-semibold mb-1"}>Customer Care</div>
                <div className="flex flex-row">
                    <AtSymbolIcon className="w-4"/>
                    <p className='ml-2'>support@litstore.pl</p>
                </div>
                <div className="flex flex-row">
                    <PhoneIcon className="w-4"/>
                    <p className='ml-2 text-gray-800'>790 370 706</p>
                </div>
            </div>
            <div className={"bg-gray-50 rounded-lg p-8"}>
                <div className={"font-semibold mb-1"}>FAQ</div>
                <div className={"text-sm text-gray-600"}>
                    Check if your question have not been already answered on our Frequently Asked Questions list
                </div>
            </div>
        </div>
    )
}