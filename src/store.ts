import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { DraftTarea, Tarea } from "./types";
import { devtools, persist } from "zustand/middleware";

type TareaState = {
    tareas: Tarea[]
    activarId: Tarea['id']
    agregarTarea: (data: DraftTarea) => void

    eliminarTarea: (id: Tarea['id']) => void

    obtenerTareaPorId: (id: Tarea['id']) => void

    actualizarTarea: (data: DraftTarea) => void
}

const crearTarea = ( tarea: DraftTarea ) : Tarea => {
    return {
        ...tarea,
        id: uuidv4()
    }
}

export const useTareaStore = create<TareaState>()( 
    devtools( 
        persist((set) => ({
        tareas: [],
        activarId: '',
        agregarTarea: (data) => {
            console.log("Llega la data del Formulario al store", data)

            const nuevaTarea = crearTarea(data)
            set((state) => ({
                tareas: [
                    ...state.tareas,
                    nuevaTarea
                ]
            }))        
        },
        eliminarTarea: (id) => {
            console.log("Recibimos el id para Eliminar la tarea en el Store", id)
            set((state) => ({
                tareas: state.tareas.filter((tarea) => tarea.id !== id)
            }))
        },
        obtenerTareaPorId: (id) => {
            console.log("Verificamos que esté llegando el id al store, para editarlo", id)    
            set(() => ({
                activarId: id
            }))    
        },
        actualizarTarea: (data) => {
            set((state) => ({
                tareas: state.tareas.map( (tarea) =>
                    tarea.id === state.activarId ? { id: state.activarId, ...data} : tarea
                ),
                activarId: '',
            }))
        }
    }), {
        name: 'tarea-storage'
    })
))

/* 
    Tarea en ListaTareas => 
    Editar => 
    1 - Envía id a activarId / 2 - Envía la tarea a Borrador/Draft (no tiene el id) => 
    Una vez que es editado y guardado el borrador => 
        ActivarId y Draft se juntan y modifican la Tarea. 
    */