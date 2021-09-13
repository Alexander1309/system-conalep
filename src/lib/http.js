import axios from 'axios'
import { alertCirculeProgress, alertMessage } from './alerts'
const address = 'http://localhost:3007/'

export const get = async url => {
    const res = await (await axios.get(`${address}${url}`)).data
    return res
}

export const post = async (url, data) => {
    const res = await (await axios.post(`${address}${url}`, data)).data
    return res
}

export const getItSafely = async url => {
    const res = await (await axios.get(`${address}${url}`, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const getItSafelyById = async urlWithId => {
    const res = await (await axios.get(`${address}${urlWithId}`, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const postItSafely = async (url, data) => {
    const res = await (await axios.post(`${address}${url}`, data, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const updateItSafely = async (urlWithId, data) => {
    const res = await ( await axios.put(`${address}${urlWithId}`, data, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const deleteItSafely = async urlWithId => {
    const res = await (await axios.delete(`${address}${urlWithId}`, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const downloadFiles = async (url, nameFile, typeFile) => {
    alertCirculeProgress('Download File', 'The download of the file is in process. This may take some time depending on the size of the file, please wait.')
    const res = await (await axios.get(url, {
        responseType: 'blob'
    })).data

    console.log(res)
    const fileUrl = URL.createObjectURL(new Blob([res]))
    const a = document.createElement('a')
    a.setAttribute('href', fileUrl)
    a.setAttribute('download', `${nameFile}.${typeFile}`)
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    if(res !== null) alertMessage('Download completed', 'Download completed successfully.', 'success')
}