import { CreateNewUser } from "./components/CreateNewUser"
import { ListOfUsers } from "./components/ListOfUsers"
import { Toaster } from 'sonner'

function App() {


    return (
        <>
            <div className="p-2">
                <h1 className="text-white text-2xl font-semibold">React + Redux + Tremor Create & Delete Example</h1>
                <h2 className="text-gray-500 text-lg">By: Efrain Arenas</h2>
                <div className="h-screen w-screen flex flex-col md:flex-row md:space-x-4 space-y-8 md:space-y-0 md:justify-center bg-black">
                    <div className="w-full md:w-1/3 ">
                        <CreateNewUser />
                    </div>
                    <div className="overflow-x-scroll w-screen md:w-full">
                        <ListOfUsers />
                    </div>
                    <Toaster richColors />
                </div>
            </div>
        </>
    )
}

export default App
