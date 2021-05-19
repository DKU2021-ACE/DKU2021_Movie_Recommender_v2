import {
    FETCH_ANONY_COMMENTS, FETCH_USER_COMMENTS, SUBMIT_COMMENT, DELETE_COMMENT
} from '../_actions/types'

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_ANONY_COMMENTS:
            return { ...state, fetchSuccess: action.payload }

        case FETCH_USER_COMMENTS:
            return { ...state, fetchSuccess: action.payload }

        case SUBMIT_COMMENT:
            return { ...state, submitSuccess: action.payload }

        case DELETE_COMMENT:
            return { ...state, deleteSuccess: action.payload }

        default:
            return state;
    }
}