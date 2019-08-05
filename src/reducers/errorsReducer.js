// On importe le type d'action dispatché
import { GET_ERRORS } from "../actions/types";

// State initial
const initialState = {};

// Le reducer qui gère les erreurs
const errorsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ERRORS:
            // On retourne le contenu de l'erreur qui est le payload
            return action.payload;

        default:
            return state;
    }
}

export default errorsReducer;