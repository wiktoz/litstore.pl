export default function Box({children}){
    return(
        <div className="border rounded-md p-2 w-full relative bg-white">
            {children}
        </div>
    )
}