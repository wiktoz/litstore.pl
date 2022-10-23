
import Sidebar from '../sidebar/Sidebar'
import Transition from './Transition';

export default function AdminLayout({children}) {
    return (
        <>
        <div className="flex flex-col md:flex-row bg-gray-100">
            <Sidebar></Sidebar>
            <Transition>
            <div className="container mx-auto p-8">
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