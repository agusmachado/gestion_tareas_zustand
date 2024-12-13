import { toast } from "react-toastify"
import { useTareaStore } from "../store"
import { Tarea } from "../types"

export default function ListaTareas() {

  const { tareas, eliminarTarea, obtenerTareaPorId } =  useTareaStore()

  console.log("Tareas con id en ListaTareas", tareas)

   const handleAccion = (accion: 'eliminar' | 'editar', tarea: Tarea) => {
    console.log(`${accion === 'eliminar' ? 'Eliminamos' : 'Editamos'} la tarea con id`, tarea.id)

    if (accion === 'eliminar') { 
        eliminarTarea(tarea.id); 
        toast.error('Tarea eliminada')
    }
    if (accion === 'editar') { obtenerTareaPorId(tarea.id)}
   } 

  return (
    <div className="md:w-2/3 lg:h-3/5 md:h-screen overflow-auto">
        {tareas.length ? (
            <div>
                <h2 className="font-black text-lg mt-5 text-center mb-10">Listado de <span className="text-blue-800 font-bold">Tareas</span> para Gestionar</h2>
                { tareas.map( tarea => 
                    <div 
                        key={tarea.id}
                        className="mx-5 my-10 py-10 bg-slate-300 shadow-xl rounded-xl"
                    >
                        <p className="ml-5"><span className="font-bold">Nombre de la Tarea: </span>{tarea.tarea}</p>
                        <p className="ml-5"><span className="font-bold">Fecha de la Tarea: </span>{tarea.fecha.toString()}</p>
                        <p className="ml-5"><span className="font-bold">Descripción de la Tarea: </span>{tarea.descripcion}</p>
                    
                    <div className="flex flex-col lg:flex-row gap-3 justify-between mt-10 px-5">
                        <button
                            type="button"
                            className="py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
                            onClick={() => handleAccion('editar', tarea)}                            
                        >
                            Editar
                        </button>
                        <button
                            type="button"
                            className="py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
                            onClick={() => handleAccion('eliminar', tarea)}
                        >
                            Eliminar
                        </button>
                    </div>
                     
                </div>
                )}                
            </div>
        ) : (
            <div>
                <h2 className="font-black text-lg mt-5 text-center mb-10">No hay <span className="text-blue-800 font-bold">Tareas</span></h2>
                <p>Agrega tu primer tarea para que aparezca en este lugar.</p>
            </div>
        )}
        
    </div>
  )
}
