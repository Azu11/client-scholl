import axios from 'axios'

export const getDocumentTypes = async () => {
  try {
    return (await axios.get('/documents')).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
