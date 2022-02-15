import axios from 'axios' ; 
const baseUrl = '/api/login' ;

const login = async (username, password) => {
    const credentials = {
        username: username,
        password: password
    }
    try {
        const user = await axios.post(baseUrl, credentials) ; 
        return user ;
    } catch (error) {
        return null ; 
    }
} 

export default { login } ;