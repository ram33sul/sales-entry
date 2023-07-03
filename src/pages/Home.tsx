import { useState } from 'react';
import Button from '../components/general/button/Button';
import DetailTable from '../components/sections/detail-table/DetailTable';
import HeaderTable from '../components/sections/header-table/HeaderTable';
import styles from './Home.module.css';
import InsertPopup from '../components/general/insert-popup/InsertPopup';
import { useDispatch, useSelector } from 'react-redux';
import { addToDetailsData, resetDetailsData } from '../redux/details/actions';
import { ReduxState } from '../interfaces/interface';
import axios from 'axios';
import { resetHeadersData } from '../redux/headers/actions';
import useAlert from '../customHooks/alert';

function Home(){

    const [ isInsertVisible, setIsInsertVisible ] = useState<boolean>(false);
    const [ vrNoError, setVrNoError ] = useState<string>('');
    const [ acNameError, setAcNameError ] = useState<string>('');
    const [ saveLoading, setSaveLoading ] = useState<boolean>(false);
    const [ isSaved, setIsSaved ] = useState<boolean>(false);
    const { doAlert, AlertComponent } = useAlert();

    const headers = useSelector((state: ReduxState) => state.headers)
    const details = useSelector((state: ReduxState) => state.details)

    const dispatch = useDispatch();

    const handleNew = () => {
        dispatch(resetDetailsData());
        dispatch(resetHeadersData({
            vrNo: "",
            vrDate: new Date(),
            status: "A",
            acName: "",
            acAmt: 0
        }));
        setIsSaved(false);
        setSaveLoading(false);
        setVrNoError(''),
        setAcNameError('');
    }

    const handleInsert = () => {
        setIsInsertVisible(prev => !prev)
    }

    const handleSave = () => {
        if(!headers.vrNo){
            setVrNoError("Vr No is required")
        }
        if(!headers.acName?.trim?.()){
            setAcNameError("Ac Name is required")
        }
        if(!headers.vrNo || !headers.acName?.trim?.()) return;
        const detail_table = details.map((detail, index) => {
            return {
                vr_no: headers.vrNo,
                sr_no: index + 1,
                item_code: detail.itemCode,
                item_name: detail.itemName,
                description: "This is a description",
                qty: detail.qty,
                rate: detail.rate
            }
        })
        setSaveLoading(true)
        console.log(headers, detail_table)
        axios.post(import.meta.env.VITE_INSERT_DATA, {
            header_table: {
                vr_no: headers.vrNo,
                vr_date: headers.vrDate,
                ac_name: headers.acName,
                ac_amt: headers.acAmt,
                status: headers.status
            },
            detail_table
        }).then(() => {
            setIsSaved(true)
            doAlert({
                message: "Saved Successfully!",
                type: "success"
            })
        }).catch(() => [
            doAlert({
                message: "API is not responding!",
                type: "error"
            })
        ]).finally(() => {
            setSaveLoading(false);
        })
    }

    const handlePrint = () => {
        window.print()
    }

    const handleInserted = ({itemCode, qty, itemName, rate}: {itemCode: string, qty: number, itemName: string, rate: number}) => {
        dispatch(addToDetailsData({
            itemCode,
            itemName,
            qty,
            rate
        }))
        doAlert({
            message: "Inserted Successfully",
            type: "success"
        })
    }

    const handleTheme = () => {
        const rootStyle = document.documentElement.style;
        const backgroundColor = rootStyle.getPropertyValue('--background-color') === 'black' ? 'white' : 'black';
        const foregroundColor = rootStyle.getPropertyValue('--foreground-color') === 'white' ? 'black' : 'white';
        rootStyle.setProperty('--background-color', backgroundColor)
        rootStyle.setProperty('--foreground-color', foregroundColor)
    }

    return (
        <div className={styles.container}>
            <div className={styles["tables-wrapper"]}>
                <HeaderTable vrNoError={vrNoError} acNameError={acNameError} />
                <DetailTable />
            </div>
            <div className={styles["buttons-container"]}>
                <Button onClick={handleNew}>
                    New
                </Button>
                <Button onClick={handleInsert}>
                    Insert
                </Button>
                <Button loading={saveLoading} onClick={(!details || !details.length || saveLoading) ? () => {} : handleSave} style={{opacity: (!details || !details.length || saveLoading) ? 0.6 : '', backgroundColor: isSaved ? 'green' : ''}}>
                    {isSaved ? "Saved!" : 'Save'}
                </Button>
                <Button onClick={handlePrint}>
                    Print
                </Button>
                <Button onClick={handleTheme}>
                    Theme
                </Button>
            </div>
            {
                isInsertVisible && <InsertPopup onInsert={handleInserted} onCancel={() => setIsInsertVisible(false)} />
            }
            {
                AlertComponent
            }
        </div>
    )
}

export default Home;