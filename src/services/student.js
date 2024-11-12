import axios from 'axios'

export const createdStudent = async ({ student, accessToken }) => {
  try {
    return (
      await axios.post('/students', student, {
        headers: { Authorization: `Bearer ${accessToken}` }
      })
    ).data
  } catch (error) {
    throw new Error(error.response.data.message)
  }
}
