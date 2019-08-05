// Importer pour faire des appels rest
import axios from 'axios';

// On importe les types d'action
import { GET_ERRORS, GET_PROJECT_TASK } from './types';
import {GET_PROJECT_TASKS, DELETE_PROJECT_TASK} from './types';

// Cette action permet de créer un project task sur le serveur
export const addProjectTask = (project_task, history) => async dispatch => {

    try {
        // On fail un appel rest
        await axios.post("http://localhost:8282/api/board", project_task);
        //On fait une redirection
        history.push("/");
        // On réinitialise les erreurs
        dispatch({
            type: GET_ERRORS,
            payload: {}
        });
    } catch (error) {
        // En cas d'erreur, on dispatche GET_ERRORS avec les erreurs venues du serveur pour mettre à jour le state
        dispatch({
            type: GET_ERRORS,
            payload: error.response.data
        });
    }

}

// Cette action permet de récupérer tous les project tasks du serveur
export const getBacklog = () => async dispatch => {
    const res =  await axios.get("http://localhost:8282/api/board/all");
    // On met à jour le state pour permettre l'affichage des données
    dispatch({
        type: GET_PROJECT_TASKS,
        payload: res.data
    })
}

// Cette action permet de supprimer un project task du serveur
export const deleteProjectTask = (pt_id) => async dispatch => {
    // On demande la confirmation avant suppression
    if(window.confirm(`You are deleting a project task ${pt_id},  This action cannot be undone`)){
        // On lance la suppression
        await axios.delete(`http://localhost:8282/api/board/${pt_id}`);
        // On lance la mise à jour du state
        dispatch({
            type: DELETE_PROJECT_TASK,
            payload: pt_id
        });

    }
}

// Cette action permet de récupérer un project task dans le cas de la modification
export const getProjectTask = (pt_id, history) => async dispatch => {
    try{
        // On lance la récupération
        const res = await axios.get(`http://localhost:8282/api/board/${pt_id}`);
        // On lance la mise à jour du state
        dispatch({
            type: GET_PROJECT_TASK,
            payload: res.data
        });
    }catch(error){
        // En cas d'erreur on fait juste la redirection
        history.push("/");
    }
}