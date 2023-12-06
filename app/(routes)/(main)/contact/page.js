'use client'

import { AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function Contact(){
    return(
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kontakt</h1>
            <div className="flex flex-row">
                <AtSymbolIcon className="w-5"/>
                <p className='ml-2'>support@litstore.pl</p>
            </div>
            <div className="flex flex-row mt-2">
                <PhoneIcon className="w-5"/>
                <p className='ml-2 text-gray-800 font-semibold'>790 370 706</p>
            </div>
        </div>
    )
}