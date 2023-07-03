import { HeaderData } from "../../interfaces/interface"
import { CHANGE_HEADERS_DATA, RESET_HEADERS_DATA } from "./types"

export const changeHeadersData = (payload: HeaderData) => {
    return {
        type: CHANGE_HEADERS_DATA,
        payload
    }
}

export const resetHeadersData = (payload: HeaderData) => {
    return {
        type: RESET_HEADERS_DATA,
        payload
    }
}