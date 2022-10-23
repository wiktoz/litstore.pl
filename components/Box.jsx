export default function Box({children}){
    return(
        <div className="border rounded p-2 mb-4 w-full relative bg-white">
            {children}
        </div>
    )
}