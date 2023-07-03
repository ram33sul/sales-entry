import { FormEvent, useState } from 'react';
import Input from '../input/Input';
import styles from './InsertPopup.module.css';
import useApi from '../../../customHooks/api';

function InsertPopup({onInsert, onCancel}: {onInsert: ({itemCode, qty}: {itemCode: string, qty: number, itemName: string, rate: number}) => void, onCancel: () => void}){

    const [ itemCode, setItemCode ] = useState<string>('');
    const [ qty, setQty ] = useState<string>('');
    const [ rate, setRate ] = useState<string>('');
    const [ error, setError ] = useState<string>('');
    const [ itemCodeError, setItemCodeError ] = useState<string>('');
    const [ qtyError, setQtyError ] = useState<string>('');
    const [ rateError, setRateError ] = useState<string>('');
    const [ message, setMessage ] = useState<string>('');

    const [ itemMaster, itemMasterError, itemMasterLoading ] = useApi<{item_code: string, item_name: string}[]>(import.meta.env.VITE_ITEM_MASTER);

    const handleItemCodeChange = (e: FormEvent<HTMLInputElement>) => {
        setItemCodeError('')
        setMessage('')
        setItemCode(e.currentTarget.value)
    }

    const handleQtyChange = (e: FormEvent<HTMLInputElement>) => {
        setQtyError('');
        setMessage('');
      
        const value = e.currentTarget.value;
        const validNumberRegex = /^\d*\.?\d*$/;
        if (value === '' || validNumberRegex.test(value)) {
          return setQty(value);
        }
        return setQtyError('Rate must be a valid number');
      };

      const handleRateChange = (e: FormEvent<HTMLInputElement>) => {
        setRateError('');
        setMessage('');
      
        const value = e.currentTarget.value;
        const validNumberRegex = /^\d*\.?\d*$/;
        if (value === '' || validNumberRegex.test(value)) {
          return setRate(value);
        }
        return setRateError('Rate must be a valid numberß');
      };

    const handleInsert = () => {
        setError('')
        if(itemMaster?.length){
            const itemMasterFiltered = itemMaster.filter((item) => item.item_code === itemCode)
            let isInvalid: boolean = false;
            if(!itemMasterFiltered.length){
                setItemCodeError("Product code doesn't exist")
                isInvalid = true;
            }
            if(qty === undefined){
                setQtyError("Quantity is required")
                isInvalid = true;

            } else if(parseFloat(qty) <= 0){
                setQtyError("Quantity must be greater than zero")
                isInvalid = true;
            }
            if(rate === undefined){
                setRateError("Rate is required")
                isInvalid = true;
            } else if(parseFloat(rate) <= 0){
                setRateError("Rate must be greater than zero")
                isInvalid = true;
            }
            if(isInvalid){
                return;
            }
            setItemCode('');
            setQty('0');
            setRate('0')
            return onInsert({itemCode, qty: parseFloat(parseFloat(qty).toFixed(2)), itemName: itemMasterFiltered[0]?.item_name ?? 'no name', rate: parseFloat(parseFloat(rate).toFixed(2))});
        }
        if(itemMasterError){
            return setError(`API is not responding (${import.meta.env.VITE_ITEM_MASTER})`)
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                {
                    error ? <div className={styles.error}>
                        {error}
                        </div> :
                    message ? <div className={styles.error} style={{color: 'green'}}>
                        {message}
                        </div> : ''
                }
                <Input error={itemCodeError} label='Item Code' onChange={handleItemCodeChange} value={itemCode} required={true} containerStyle={{width: "100%"}} />
                <Input error={qtyError} label='Quantity' onChange={handleQtyChange} value={qty} containerStyle={{width: "100%"}} required={true}/>
                <Input error={rateError} label='Rate' onChange={handleRateChange} value={rate} containerStyle={{width: "100%"}} required={true}/>
                <button className={styles.button} onClick={handleInsert} style={{backgroundColor: 'green', opacity: itemMasterLoading ? 0.6 : ''}}>
                    INSERT
                </button>
                <button className={styles.button} onClick={onCancel} style={{backgroundColor: 'var(--foreground-color)'}}>
                    CANCEL
                </button>
            </div>
        </div>
    )
}

export default InsertPopup;