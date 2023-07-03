import { ADD_TO_DETAILS_DATA, REMOVE_FROM_DETAILS_DATA, RESET_DETAILS_DATA } from "./types"

export const addToDetailsData = (payload: {itemName: string, itemCode: string, qty: number,rate: number}) => {
    return {
        type: ADD_TO_DETAILS_DATA,
        payload
    }
}

export const removeFromDetailsData = (payload: number) => {
    return {
        type: REMOVE_FROM_DETAILS_DATA,
        payload
    }
}

export const resetDetailsData = () => {
    return {
        type: RESET_DETAILS_DATA
    }
}