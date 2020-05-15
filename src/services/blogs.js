import axios from 'axios'
const baseUrl = '/api/blogs'


let TOKEN = null
const setToken = newToken => { TOKEN = `bearer ${newToken}` }


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = async newObject => {
    const config = { headers: { Authorization: TOKEN }, }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

export default { getAll, create, setToken }