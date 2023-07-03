import { useState, useEffect } from 'react'
import axios, {AxiosRequestConfig, AxiosError, CancelTokenSource, Canceler} from 'axios';

type Output<T> = [
    T | null,
    AxiosError | null,
    boolean,
    Canceler | undefined
]

function useApi<T>(url: string, options?: AxiosRequestConfig): Output<T> {
    const [ data, setData ] = useState<T | null>(null);
    const [ error, setError ] = useState<AxiosError | null>(null);
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ cancel, setCancel ] = useState<CancelTokenSource | null>(null)

    const doApi = () => {
        const source = axios.CancelToken.source();
        setCancel(source);
        setLoading(true)
        axios(url,{
            ...options,
            cancelToken: source.token
        }).then(response => {
            setData(response.data)
        }).catch(error => {
            setError(error)
        }).finally( () => {
            setLoading(false);
        })
    }

    useEffect(() => {
        doApi();
        return () => {
            cancel?.cancel();
        }
    },[])

    return [ data, error, loading, cancel?.cancel ];
}

export default useApi;