import { useMemo } from "react"
import { Activity } from "../types"
import CaloryDisplay from "./CaloryDisplay"


type CaloryTrackerProps = {
    activities: Activity[]
}

export default function CaloriaTraker({activities} : CaloryTrackerProps) {

    const caloriesconsumed = useMemo(()=> activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [activities])

    const caloriesBurned = useMemo(()=> activities.reduce((total, activity) => 
        activity.category === 2 ? total + activity.calories : total, 0) , 
    [activities])

    const netCalories = useMemo(()=> caloriesconsumed - caloriesBurned , [activities])


  return (
    <>
        <h2 className=" text-4xl font-black text-white text-center">
            Resumen de Calorias
        </h2>

        <div className="flex flex-col items-center md:flex-row md:justify-between
        gap-5 mt-10">
        
            <CaloryDisplay 
                calorias={caloriesconsumed}
                text="Consumidas"
            />

            <CaloryDisplay 
                calorias={caloriesBurned}
                text="Ejercicio"
            />

            <CaloryDisplay 
                calorias={netCalories}
                text="Diferencia"
            />
        </div>

        
    </>
  )
}
