import { HeaderData } from "../../interfaces/interface";
import { CHANGE_HEADERS_DATA, RESET_HEADERS_DATA } from "./types";

const inititalState: HeaderData | {} = {};

const headersReducer = (state = inititalState, action: {type: string, payload: HeaderData}) => {
    switch(action.type){
        case CHANGE_HEADERS_DATA: return {
            ...action.payload
        }
        case RESET_HEADERS_DATA: return {
            ...action.payload
        };
        default: return state;
    }
}

export default headersReducer;