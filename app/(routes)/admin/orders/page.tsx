'use client'

import useSWR from 'swr'
import Loader from '@/components/Loader'
import SearchBar from '@/components/form/SearchBar'
import {fetcher} from "@/utils/helpers"

const formatDate = (date:string) => {
    return new Date(date).toLocaleString("pl-PL", {dateStyle: 'medium', timeStyle: 'short'});
}

const ShowOrders = () => {
    const { data: orders, error: error, isLoading: isLoading } = useSWR("/api/orders", fetcher)

    return(
        <div className="py-2">

        <div className="bg-white rounded-md w-full flex items-center justify-between">
			<div className="w-full">
				<div className="inline-block min-w-full rounded-lg overflow-hidden">
					<table className="min-w-full leading-normal">
						<thead>
							<tr>
								<th
									className="px-5 py-3 border-b-2 border-gray-300 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Order ID
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-300 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Products
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-300 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Ordered at
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-300 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Amount
								</th>
								<th
									className="px-5 py-3 border-b-2 border-gray-300 bg-gray-300 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
									Status
								</th>
							</tr>
						</thead>
                        <tbody>
                        {
							isLoading ?
								<Loader/> :
							error ?
								<div>Error occurred.</div> :
                            orders && orders.length > 0 && orders.map((order:any) => {
                                return(
							    <tr key={order._id}>
								<td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
									<div className="flex items-center">
											<div>
												<p className="text-gray-900 whitespace-no-wrap">
													{order._id}
												</p>
											</div>
										</div>
								</td>
								<td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
                                        {
                                            order.items.map((item:any) => {
                                                return (
                                                    <p key={item.id}>{item.id}</p>
                                                )
                                            })
                                        }
                                    </p>
								</td>
								<td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{formatDate(order.date)}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
									<p className="text-gray-900 whitespace-no-wrap">
										{Intl.NumberFormat('pl', {style:'currency', currency:'PLN'}).format(order.payment.amount)}
									</p>
								</td>
								<td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
									<span
                                        className="relative inline-block px-3 py-1 font-semibold text-orange-900 leading-tight">
                                        <span aria-hidden
                                            className="absolute inset-0 bg-orange-200 opacity-50 rounded-full"></span>
									    <span className="relative">{order.payment.status}</span>
									</span>
								</td>
							</tr>
                                
                                )
                            })
                        }
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowOrders