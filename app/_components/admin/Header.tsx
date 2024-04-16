import {ReactNode} from "react"

const Header = ({icon, title, desc}:{icon?: ReactNode, title:string, desc:string}) => {
    return (
        <div className={"my-2 flex gap-4 items-center mx-1"}>

            <div>
                <div className={"flex gap-1.5 items-center"}>
                    {
                        icon &&
                        <div>
                            {icon}
                        </div>
                    }
                    <h3 className="text-lg font-bold leading-6 text-gray-900">{title}</h3>
                </div>

                <p className="mt-1 text-xs text-gray-600">
                    {desc}
                </p>
            </div>
        </div>
    )
}

export default Header