export interface HeaderData {
    vrNo: number | '',
    vrDate: Date,
    acName: string,
    acAmt: number,
    status: 'A' | 'I'
}

export interface DetailData {
    vr_no: number,
    sr_no: number,
    item_code: string,
    item_name: string,
    description: string,
    qty: number,
    rate: number
}

export interface ItemMaster {
    item_code: string,
    item_name: string
}

export interface ReduxState {
    headers: {
        vrNo: number,
        vrDate: Date,
        acName: string,
        acAmt: number,
        status: 'A' | 'I'
    }
    details: {
        itemCode: string,
        itemName: string,
        description: string,
        qty: number,
        rate: number
    }[]
}