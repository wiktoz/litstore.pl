import Sidebar from '@/components/sidebar/Sidebar'
import Transition from '@/components/layout/Transition';


export const metadata = {
    title: "LitStore — admin panel",
    description: "Panel for managing products, settings and orders for shop owners"
}
export default function AdminLayout({children}) {
    return (
        <>
        <div className="flex flex-col md:flex-row font-sans">
            <Sidebar></Sidebar>
            <Transition>
            <div className="container mx-auto p-8 bg-gray-100 h-full">
                <div className="w-full h-full rounded">
                    <div className="container">
                        {children}
                    </div>
                </div>
            </div>
            </Transition>
        </div>
        </>
    );
}