import  { combineReducers } from 'redux';
import headersReducer from './headers/headersReducer';
import detailsReducer from './details/detailsReducer';

const rootReducer = combineReducers({
    headers: headersReducer,
    details: detailsReducer
})

export default rootReducer;