import axios from 'axios'
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

export const postItSafely = async url => {
    const res = await (await axios.get(`${address}${url}`, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const updateItSafely = async (url, data) => {
    const res = await (await axios.put(`${address}${url}`, data, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}


export const deleteItSafely = async url => {
    const res = await (await axios.delete(`${address}${url}`, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}