import axios from 'axios'

export const getBloodTypes = async () => {
  try {
    return (await axios.get('/bloodtypes')).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
