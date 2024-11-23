import { v4 as uuidv4 } from "uuid"
import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react"
import type { Activity } from "../types"
import { categories } from "../data/categorias"
import { ActivityActions, ActivityState } from "../reducers/activityReducer"

type FormProps = {
  dispatch: Dispatch<ActivityActions>
  state: ActivityState
}

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0
}

export default function Form({ dispatch, state } : FormProps) {

  const [activity, setActivity] = useState<Activity>(initialState)

  useEffect(()=>{
    if(state.activeId){
      const selectActivity = state.activities.filter(
        stateActivity => stateActivity.id === state.activeId
      )[0]
      setActivity(selectActivity)
    }
  }, [state.activeId])

  const handleChange =(e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {

    const isNumberField = ['category', 'calories'].includes(e.target.id)

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  }

  const isValidActivity = () =>{
    const {name, calories} = activity
    return name.trim() !== '' && calories > 0
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
    e.preventDefault()

    dispatch({type: 'Save Activity', payload: {newActivity: activity}})

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }


  return (
    <form action=""
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >

      <div className=" grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">Categoria: </label>

        <select className=" border border-slate-300 p-2 w-full bg-white"
          id="category"
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map(categoria =>(
            <option value={categoria.id}
              key={categoria.id}
            >
              {categoria.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">
          Actividad: 
        </label>

        <input 
          id="name"
          type="text"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, jugo de naranja, ensalda "
          value={activity.name}
          onChange={ handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">
          Calorias: 
        </label>

        <input 
          id="calories"
          type="number"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias "
          value={activity.calories}
          onChange={ handleChange}
        />
      </div>

      <input type="submit" 
        className=" bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase
        text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />



    </form>
  )
}