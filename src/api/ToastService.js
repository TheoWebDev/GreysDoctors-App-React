import { toast } from "react-toastify";

const toastConfig = {
    position: 'bottom-center',
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
    onClose: null
}

export function toastInfo(message){
    toast.info(message, toastConfig);
}

// export function toastSuccess(message){
//     toast.success(message, toastConfig);
// }

export function toastSuccess(message, onClose = null) {
    toast.success(message, { ...toastConfig, onClose });
}

export function toastWarning(message){
    toast.warn(message, toastConfig);
}

export function toastError(message){
    toast.error(message, toastConfig);
}