import { ToastContainer } from "react-toastify"
import FormularioTareas from "./components/FormularioTareas"
import ListaTareas from "./components/ListaTareas"
import 'react-toastify/dist/ReactToastify.css'

function App() {

  return (
    <>
      <div className="container mx-auto mt-20 bg-slate-200 shadow-lg">
        <h1 className="font-bold text-center text-2xl md:w-2/3 md:mx-auto">Mis Tareas!</h1>

        <div className="mt-12 md:flex">
          <FormularioTareas/>
          <ListaTareas/>
        </div>
      </div>
      <ToastContainer/>
    </>
  )
}

export default App
