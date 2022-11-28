import useSWR from "swr"
import Loader from "../../../../components/Loader"
import ShowBox from "../../../../components/admin/ShowBox"

const fetcher = url => fetch(url).then(r => r.json())

export default function ShowVariants(){
    const { data, error } = useSWR('/api/variants/get', fetcher)
    if (error) return "An error has occurred."
    if (!data) return <Loader></Loader>

    return(
        <>
        {
            data.map(variant => {
                return(
                    <ShowBox
                        key={variant.slug}
                        editLink={'/admin/categories/edit/' + variant.slug}
                        deleteLink={'/admin/categories/delete/' + variant.slug}
                    >
                        <div className="flex flex-col">
                        <div className="mx-1">
                            <p className="text-gray-700 text-md mb-2">{variant.name}</p>
                            <p className="text-gray-500 text-sm">{variant.displayName}</p>
                        </div>
                        <div className="flex flex-row">
                            {
                                variant.options.map(option => {
                                    return(
                                        <p className="m-1 p-2 bg-gray-100 text-xs" key={option._id}>
                                            {option.name}
                                        </p>
                                    )
                                })
                            }
                        </div>
                        </div>
                    </ShowBox>
                )
            })
        }
        </>
    )
}