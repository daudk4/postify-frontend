import { Slide, toast } from "react-toastify"

export const snackbar = (message, type, position = 'bottom-left') => {
    toast[type](message, {
        position,
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
    })
}