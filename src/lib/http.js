import axios from 'axios'

export const get = async url => {
    const res = await (await axios.get(url)).data
    return res
}

export const post = async (url, data) => {
    const res = await (await axios.post(url, data)).data
    return res
}

export const getItSafely = async url => {
    const res = await (await axios.get(url, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const getItSafelyById = async urlWithId => {
    const res = await (await axios.get(urlWithId, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const postItSafely = async url => {
    const res = await (await axios.get(url, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}

export const updateItSafely = async url => {
    const res = await (await axios.put(url, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}


export const deleteItSafely = async url => {
    const res = await (await axios.put(url, {
        headers: {
            'Authorization': `accessToken ${localStorage.getItem('token')}`
        }
    })).data
    return res
}