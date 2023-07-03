import { useSelector } from 'react-redux';
import Heading from '../../general/heading/Heading';
import styles from './DetailTable.module.css';

function DetailTable(){

    const detailsData = useSelector((state: {details: {itemCode: string, itemName: string, qty: number, rate: number}[]}) => state.details)

    return (
        <div className={styles.container}>
            <Heading>
                Detail
            </Heading>
            <div className={styles["table-wrapper"]}>
            <table>
                <thead>
                    <tr>
                        <th>
                            Sr No
                        </th>
                        <th>
                            Item Code
                        </th>
                        <th>
                            Item Name
                        </th>
                        <th>
                            Qty
                        </th>
                        <th>
                            Rate
                        </th>
                        <th>
                            Amount
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        detailsData.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td className={styles['align-center']}>
                                        {index + 1}
                                    </td>
                                    <td>
                                        {data.itemCode}
                                    </td>
                                    <td>
                                        {data.itemName}
                                    </td>
                                    <td className={styles['align-right']}>
                                        {data.qty}
                                    </td>
                                    <td className={styles['align-right']}>
                                        {data.rate}
                                    </td>
                                    <td className={styles['align-right']}>
                                        {parseFloat((data.qty * data.rate).toFixed(2))}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
            </div>
            <div className={styles["total-wrapper"]}>
                <div className={styles["total-text"]}>
                    Total: 
                </div>
                <div className={styles["total-amount"]}>
                    { detailsData.reduce((acc, curr) => acc += (curr.rate * curr.qty), 0) }
                </div>
            </div>
        </div>
    )
}

export default DetailTable;