// On importe les méthodes pour la création du store
import {createStore, applyMiddleware, compose} from "redux";
// On importe le thunk
import thunk from "redux-thunk";
// On importe le combineReducer pour la création du store
import rootReducer from './reducers';
// Le state initial
const initialState = {};
// Le middleware
const middleware = [thunk];

// Constante qui permet d'avoir redux dans Google Chrome
const ReactReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// Variable pour garder le store
let store;

// Créer le store selon les différents cas
if(window.navigator.userAgent.includes("Chrome") && ReactReduxDevTools){
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware),
            ReactReduxDevTools
        )
    );
}else {
    store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(...middleware)   )
    );
}

export default store;