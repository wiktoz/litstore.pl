import ComponentAccordion from "@/components/ComponentAccordion";
import Item from "@/components/admin/Item"
import {formatDate} from "@/utils/helpers"
import Delivery from "@/components/admin/Delivery"
import {ClipboardDocumentListIcon} from "@heroicons/react/24/outline";

const Order = ({order}:{order:OrderInterface}) => {
    return(
        <div className={"flex flex-col gap-4 p-4 rounded-xl bg-white shadow relative"}>
            <div className={"flex items-center justify-between"}>
                <div className={"text-xs"}>
                    <div>
                        {order._id}
                    </div>
                    <div>
                        {formatDate(order.createdAt)}
                    </div>
                </div>
                <div>
                    <div className={"text-xs px-2 py-0.5 rounded-lg " +
                        (order.payment.status === "SUCCESS" ? "text-green-800 bg-green-200" :
                        order.payment.status === "PENDING" ? "text-orange-800 bg-orange-200" :
                            "text-red-800 bg-red-200")}
                    >
                        {order.payment.status}
                    </div>
                </div>
            </div>
            <div className={"h-px bg-gray-100 rounded my-2"}></div>
            <ComponentAccordion header={"Products"}>
                <div className={"flex flex-col gap-2 my-6 mx-2"}>
                {
                    order.items.map((item, index) => {
                        return(
                            <div key={item.item_id + index}>
                                <Item itemData={item}/>
                            </div>
                        )
                    })
                }
                </div>
            </ComponentAccordion>
            <ComponentAccordion header={"Delivery"}>
                <div className={"my-6 mx-2"}>
                    <Delivery
                        d={order.delivery}
                    />
                </div>
            </ComponentAccordion>
            <ComponentAccordion header={"Payment"}>
                <div className={"flex flex-col gap-2 shadow rounded-xl p-4 px-6 my-6 mx-2"}>
                    <div className={"flex gap-2 items-center"}>
                        <div className={"text-sm font-medium"}>
                            {order.payment.method}
                        </div>
                        <div className={"text-xs px-2 py-0.5 rounded-lg w-fit " +
                            (order.payment.status === "SUCCESS" ? "text-green-800 bg-green-200" :
                                order.payment.status === "PENDING" ? "text-orange-800 bg-orange-200" :
                                    "text-red-800 bg-red-200")}
                        >
                            {order.payment.status}
                        </div>
                    </div>

                    <div className={"text-xs"}>
                        {order.payment.amount} {order.payment.currency}
                    </div>

                    <div className={"flex flex-row gap-1"}>
                        <div className={"bg-gray-100 rounded-lg text-xs w-fit font-semibold py-1 px-3"}>
                            <a href={order.payment.url} target={"_blank"}>
                                Back to Payment
                            </a>
                        </div>
                        <div onClick={() => {
                            navigator.clipboard.writeText(order.payment.url ? order.payment.url : "").then(r => console.log("copied"))
                        }}
                             className={"bg-gray-900 rounded-lg text-xs w-fit font-semibold text-gray-300 py-1 px-2 flex items-center justify-center hover:cursor-pointer"}
                        >
                            <p className={"mx-1"}>Copy Payment URL</p>
                            <ClipboardDocumentListIcon width={13} height={13}/>
                        </div>
                    </div>
                </div>
            </ComponentAccordion>
        </div>
    )
}

export default Order