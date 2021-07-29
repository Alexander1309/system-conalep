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
        allowEscapeKey: false,
        didClose: () => {
            MySwal.clickConfirm()
        }
    })
    return res
}

export const alertSelectFile = async (title, accept) => {
    const { value: file } = await MySwal.fire({
        title: `${title}`,
        input: 'file',
        inputAttributes: {
          'accept': `${accept}`,
        },
        allowOutsideClick: false,
        allowEscapeKey: false,
    })
    return file
}