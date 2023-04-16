import { fetchData, patchData, postData, putData } from 'plugins/api';
import axios from 'plugins/axios';

const authorizationField = 'Authorization';

class AuthService {
    static async register(user) {
        return await postData('/auth/register', user)
    };

    static async login({ email, password }) {
        const { user, token } = await postData('/auth/login', { email, password })

        const bearerToken = `Bearer ${token}`
        axios.defaults.headers[authorizationField] = bearerToken
        localStorage.setItem(authorizationField, bearerToken)

        return user
    }

    static logout() {
        localStorage.removeItem(authorizationField)
        delete axios.defaults.headers[authorizationField]
    }

    static async fetchUser() {
        const token = localStorage.getItem(authorizationField)

        if (!token) {
            return null
        }

        axios.defaults.headers[authorizationField] = token

        try {
            const { data: user } = await axios.get('/auth/signed')
            return user
        } catch (e) {
            localStorage.removeItem(authorizationField)
            window.location.href = '/login'
        }
    }

};

export default AuthService;