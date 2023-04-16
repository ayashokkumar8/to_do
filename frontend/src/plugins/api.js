import axios from './axios'

const statusCodes = {
  401: () => window.location.href = '/login'
}

const handleError = (e) => {
  statusCodes[e.response.status] ? statusCodes[e.response.status]() : console.error(e)
}

export const fetchData = async (url, options = {}) => {
  try {
    const response = await axios.get(url, options)
    return response.data
  } catch (e) {
    handleError(e)
  }
}

export const postData = async (url, data, options = {}) => {
  try {
    const response = await axios.post(url, data, options)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const putData = async (url, data, options = {}) => {
  try {
    const response = await axios.put(url, data, options)
    return response.data
  } catch (e) {
    handleError(e)
  }
}

export const patchData = async (url, data, options = {}) => {
  try {
    const response = await axios.patch(url, data, options)
    return response.data
  } catch (e) {
    handleError(e)
  }
}

export const deleteData = async (url, options = {}) => {
  try {
    return await axios.delete(url, options)
  } catch (e) {
    handleError(e)
  }
}
