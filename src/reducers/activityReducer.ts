import { Activity } from "../types"

export type ActivityActions = 
    { type: 'Save Activity', payload: {newActivity : Activity} } |
    { type: 'Set-activeId', payload: {id: Activity['id']} }   |
    { type: 'Delete-activity', payload: {id: Activity['id']} } |
    { type: 'Restart-App'} 

export type ActivityState = {
    activities : Activity[]
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] =>{
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

export const initialState: ActivityState = {
    activities : localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
        state: ActivityState = initialState,
        action: ActivityActions
    ) => {

        if(action.type === 'Save Activity'){
            //maneja la logica para el state

            let updateActivities : Activity[] = []
            
            if(state.activeId){
                updateActivities = state.activities.map( activity =>
                    activity.id === state.activeId ? action.payload.newActivity :
                    activity
                )
            }else{
                updateActivities = [...state.activities, action.payload.newActivity]
            }
            
            return {
                ...state,
                activities:  updateActivities,
                activeId: ''
            }
        }

        if(action.type === 'Set-activeId'){
            return {
                ...state,
                activeId : action.payload.id,
            
            }
        }

        if(action.type === 'Delete-activity'){
            return{
                ...state,
                activities: state.activities.filter( activity => 
                    activity.id !== action.payload.id
                )
            }
        }

        if(action.type === 'Restart-App'){
            return {
                activities: [],
                activeId : ''
            }
        }


    return state
    
}