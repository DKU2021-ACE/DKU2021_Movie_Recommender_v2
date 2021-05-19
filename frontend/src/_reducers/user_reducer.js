import {
    FETCH_USERINFO,
    LOGIN_USER,
    LOGOUT_USER,
    REGISTER_USER
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload }

        case REGISTER_USER:
            return { ...state, register: action.payload }

        case LOGOUT_USER:
            return { ...state, logout: action.payload }

        case FETCH_USERINFO:
            return { ...state, fetchSuccess: action.payload }

        default:
            return state;
    }
}