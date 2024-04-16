import {ExclamationCircleIcon} from "@heroicons/react/24/outline";

const ErrorBox = () => {
    return(
        <div className={"shadow rounded-xl p-4 my-2 bg-white"}>
            <div className={"flex flex-row items-center gap-4"}>
                <ExclamationCircleIcon width={20} height={20} className={"text-red-600"}/>
                <div>
                    <div className={"text-sm font-semibold text-gray-700"}>Fetch error</div>
                    <div className={"text-xs text-gray-500"}>
                        Cannot fetch data from database. Try again later.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorBox