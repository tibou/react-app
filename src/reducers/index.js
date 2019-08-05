// On importe combineReducers
import {combineReducers} from 'redux';

// On importe les reducers
import errorsReducer from './errorsReducer';
import projectTaskReducer from './projectTaskReducer';

export default combineReducers({
    errors: errorsReducer,
    project_task: projectTaskReducer
});