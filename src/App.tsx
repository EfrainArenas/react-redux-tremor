import { CreateNewUser } from "./components/CreateNewUser"
import { ListOfUsers } from "./components/ListOfUsers"
import { Toaster } from 'sonner'

function App() {


    return (
        <>
            <div className="h-screen flex justify-center items-center bg-black">
                <CreateNewUser />
                <ListOfUsers />
                <Toaster richColors />
            </div>
        </>
    )
}

export default App
