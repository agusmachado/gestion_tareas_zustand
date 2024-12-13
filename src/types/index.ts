
export type Tarea = {
    id: string
    tarea: string
    fecha: Date
    descripcion: string
}

export type DraftTarea = Omit<Tarea, 'id'>