import store from './redux/store.js'

import decode from 'jwt-decode'

import { history } from './redux/history.js'

import {LOGOUT} from './redux/toDo-reducer.js'

import {myFetchWithoutToken} from './Api/myFetch.js'

const apiHost = process.env.REACT_APP_API_HOST

export const textTruncate = (text = '', maxLength) => text.length < maxLength ? text : text.slice(0, maxLength) + '...'

export const checkLoginStatus = () => !!localStorage.getItem('token')

export const getToken = () => {

    const token = localStorage.getItem('token')
    if (token) {
        const parsed = JSON.parse(token)
        const decoded = decode(parsed.jwt)

        if (decoded.exp - new Date().getTime() / 1000 > 60) {
            return Promise.resolve(parsed.jwt)
        } else {
            return myFetchWithoutToken(`${apiHost}/user/${decoded.userId}/token`,'PUT', {refreshToken: parsed.refreshToken})
            .then(token=>{
                localStorage.setItem('token',JSON.stringify(token))
                return token.jwt
            })
            .catch(()=>{
                logout()
            })
        }
    }else{
        logout()
    }
}

export const logout =()=>{
    localStorage.removeItem('token')
    store.dispatch({type:LOGOUT})
    history.push('/sign-in')
}