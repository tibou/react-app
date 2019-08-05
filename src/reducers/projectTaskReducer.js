// On importe les types d'action
import { GET_PROJECT_TASKS, DELETE_PROJECT_TASK, GET_PROJECT_TASK } from '../actions/types';

// Le state initial
const initialState = {
    project_tasks: [],
    project_task: {}
};

// Le reducer qui gère les actions sur les projectTasks
const projectTaskReducer = (state = initialState, action) => {
    switch (action.type) {
        // Cas où on récupère tous les project tasks du serveur
        case GET_PROJECT_TASKS:
            // On retourne le state courant et les données récupérées
            return {
                ...state,
                project_tasks: action.payload
            }
        // Cas où on récupère un seul project task en vue de le modifier
        case GET_PROJECT_TASK:
            // On retourne le state courant et le project task récupéré
            return {
                ...state,
                project_task: action.payload
            }
        // Cas où on supprime un project task du serveur
        // Ce type d'action est dispatché pour mettre à jour le state en vue de faire disparaitre le project task supprimé
        case DELETE_PROJECT_TASK:
            // On retourne le state courant et les project tasks sans le project task supprimé
            return {
                ...state,
                project_tasks: state.project_tasks.filter(project_task => project_task.id !== action.payload)
            }
        default:
            return state;
    }

}

export default projectTaskReducer;