import { useState, FormEvent, useMemo, useEffect } from 'react';
import Heading from '../../general/heading/Heading';
import styles from './HeaderTable.module.css';
import Input from '../../general/input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { changeHeadersData } from '../../../redux/headers/actions';
import { ReduxState } from '../../../interfaces/interface';

function HeaderTable({vrNoError, acNameError}: {vrNoError: string, acNameError: string}){

    const [ vrDate ] = useState<Date>(new Date());

    const detailData = useSelector((state: {details: {rate: number, qty: number}[]}) => state.details)
    const headersData = useSelector((state: ReduxState) => state.headers)

    const dispatch = useDispatch();
    
    const acAmt = useMemo(() => {
        return detailData.reduce((acc, curr) => acc += (curr.qty * curr.rate),0)
    },[detailData])

    const handleVrNo = (e: FormEvent<HTMLInputElement>) => {
        const regex = /^[1-9]\d*$/
        if(regex.test(e.currentTarget.value) || e.currentTarget.value === '' && e.currentTarget.value.length <= 18){
            dispatch(changeHeadersData({
                ...headersData,
                vrNo: e.currentTarget.value ? parseInt(e.currentTarget.value, 10) : ''
            }))
        }
    }
    
    useEffect(() => {
        dispatch(changeHeadersData({
            ...headersData,
            acAmt: acAmt
        }))
    },[acAmt])

    const handleStatus = () => {
        dispatch(changeHeadersData({
            ...headersData,
            status: headersData.status === 'A' ? 'I' : 'A'
        }))
    }

    const handleAcName = (e: FormEvent<HTMLInputElement>) => {
        if(e.currentTarget.value.length <= 200){
            dispatch(changeHeadersData({
                ...headersData,
                acName: e.currentTarget.value
            }))
        }
    }

    useEffect(() => {
        dispatch(changeHeadersData({
            vrNo: "",
            vrDate: vrDate,
            status: "A",
            acName: "",
            acAmt: acAmt
        }))
    },[])

    return(
        <div className={styles.container}>
            <Heading>
                Header
            </Heading>
            <div className={styles["section"]}>
                <div className={styles["section-sub"]}>
                    <Input error={vrNoError} value={headersData?.vrNo === undefined ? '' : headersData?.vrNo} onChange={handleVrNo} label='Vr No' containerStyle={{width: "33%"}} required/>
                    <Input value={vrDate.toLocaleDateString()} label='Vr Date' containerStyle={{width: "33%"}} required readOnly/>
                    <Input value={headersData?.status === "I" ? 'I' : 'A'} onChange={handleStatus} label='Status' containerStyle={{width: "33%"}} required/>
                </div>
                <div className={styles["section-sub"]}>
                    <Input error={acNameError} value={headersData?.acName === undefined ? '' : headersData?.acName} onChange={handleAcName} label='Ac Name' containerStyle={{width: "67.5%"}} required/>
                    <Input value={acAmt} label='Ac Amt' containerStyle={{width: "33%"}} readOnly/>
                </div>
            </div>
        </div>
    )
}

export default HeaderTable;