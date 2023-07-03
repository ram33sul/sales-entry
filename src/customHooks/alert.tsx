import { useState } from "react";
import Alert, { AlertProps } from "../components/general/alert/alert";


type Returns = {
    doAlert: ({message, type}: AlertProps) => void,
    AlertComponent: JSX.Element | null,
}

function useAlert(): Returns {

    const [ props, setProps ] = useState<AlertProps>({
        message: 'message',
        type: "success"
    })
    const [ timeoutId, setTimeoutId ] = useState<number | undefined>();
    const [ isVisible, setIsVisible ] = useState<boolean>(false);

    const showAlert = (props: AlertProps) => {
        setProps(props);
        clearTimeout(timeoutId);
        setIsVisible(true)
        const timeout = setTimeout(() => {
            setIsVisible(false)
        }, 2000);
        setTimeoutId(timeout);
    }

    const AlertComponent = isVisible ? <Alert {...props} /> : null ;

    return { doAlert: showAlert, AlertComponent };
}

export default useAlert;