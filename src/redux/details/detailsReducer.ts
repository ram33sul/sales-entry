import { DetailData } from "../../interfaces/interface";
import { ADD_TO_DETAILS_DATA, REMOVE_FROM_DETAILS_DATA, RESET_DETAILS_DATA } from "./types";

const inititalState: DetailData[] = [];

const detailsReducer = (state: DetailData[] = inititalState, action: {type: string, payload: DetailData | number}) => {
    switch(action.type){
        case ADD_TO_DETAILS_DATA: return [
            ...state,
            action.payload
        ]
        case REMOVE_FROM_DETAILS_DATA: return [
            ...state.filter(data => data.sr_no !== action.payload)
        ]
        case RESET_DETAILS_DATA: return []
        default: return state;
    }
}

export default detailsReducer;