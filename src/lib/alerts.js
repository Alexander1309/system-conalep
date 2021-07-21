import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const MySwal = withReactContent(Swal)

export const alertMessage = async (title, text, icon) => {
    const res = await MySwal.fire({
        title: `${title}`,
        text: `${text}`,
        icon: `${icon}`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#047c64',
        allowOutsideClick: false,
        allowEnterKey: false,
        allowEscapeKey: false,
        didClose: () => {
            MySwal.clickConfirm()
        }
    })
    return res
}