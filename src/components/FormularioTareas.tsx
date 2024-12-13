import { useForm } from "react-hook-form"
import Error from "./Error"
import { DraftTarea } from "../types"
import { useTareaStore } from "../store"
import { useEffect } from "react"
import { toast } from "react-toastify"

export default function FormularioTareas() { 

  const { agregarTarea, activarId, tareas, actualizarTarea } = useTareaStore()
    
  const { register, handleSubmit, formState: { errors }, reset, setValue} =  useForm<DraftTarea>()

  useEffect(() => {
    if (activarId) {
        const activaTareas = tareas.filter( tarea => tarea.id === activarId)[0]

        console.log('Desde el useEffect en el Form', activaTareas)

        setValue('tarea', activaTareas.tarea)
        setValue('fecha', activaTareas.fecha)
        setValue('descripcion', activaTareas.descripcion)        
    }
  }, [activarId, tareas, setValue])

  

  const registroTarea = (data: DraftTarea) => {
    console.log('Nueva Tarea', data)

    if (activarId) {
      actualizarTarea(data)
      toast.success('Tarea actualizada exitosamente')
    } else {
      agregarTarea(data)
      toast.success('Tarea guardada exitosamente')
    }
    reset()
  }
 
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <p className="font-black text-lg mt-5 text-center mb-10">Añadir Tareas</p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        noValidate
        onSubmit={handleSubmit(registroTarea)}
      >
        <div className="mb-5">
          <label htmlFor="tarea" className="text-sm uppercase font-bold">
            Nombre de la Tarea
          </label>
          <input
            id="tarea"
            className="w-full p-3 border border-gray-100"
            type="text"
            placeholder="Nombre de la Tarea"
            {...register('tarea', {
                required: "Falta el nombre de la tarea",
                maxLength: {
                    value: 15,
                    message: "Máximo 15 caracteres"
                }
            })}
          />
          
          {errors.tarea && <Error>{errors.tarea?.message?.toString()}</Error>}                  
        </div>
    
        <div className="mb-5">
          <label htmlFor="fecha" className="text-sm uppercase font-bold">
            Fecha de la Tarea
          </label>
          <input
            id="fecha"
            className="w-full p-3 border border-gray-100"
            type="date" 
            {...register("fecha", { required: "Falta la Fecha"})}           
          />
          {errors.fecha && <Error>{errors.fecha.message?.toString()}</Error>}          
        </div>

        <div className="mb-5">
          <label htmlFor="descripcion" className="text-sm uppercase font-bold">
            Descripción
          </label>
          <textarea
            id="descripcion"
            className="w-full p-3 border border-gray-100"
            placeholder="Descripción de la Tarea" 
            {...register("descripcion", { required: "Falta la Descripción"})}           
          />   
           {errors.descripcion && <Error>{errors.descripcion.message?.toString()}</Error>}      
        </div>

        <input
          type="submit"
          className="bg-blue-600 w-full p-3 text-white uppercase font-bold hover:bg-blue-700 cursor-pointer transition-colors rounded"
          value="Guardar Tarea"
        />
      </form>
    </div>
  )
}
