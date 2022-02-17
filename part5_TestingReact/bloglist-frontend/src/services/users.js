import axios from 'axios'
const baseUrl = '/api/users'

// Return all the users in the database
// as a promise
const getAllUsers = () => {
    return  axios.get(baseUrl).then(response => response.data)
}

export default {
    getAllUsers
};