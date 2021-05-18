import axios from 'axios'
import {
    FETCH_ANONY_COMMENTS, FETCH_USER_COMMENTS, SUBMIT_COMMENT, DELETE_COMMENT
} from './types'
import { API_URL } from '../components/Config'


// 익명 댓글 리스트 가져오는 액션
export function fetchAnonyComments(movieId, page = 1) {
    const request = axios.get(API_URL + '/comments/' + movieId + '?page=' + page)
        .then(response => response.data)

    return {
        type: FETCH_ANONY_COMMENTS,
        payload: request
    }
}

// 사이트 유저 댓글 리스트 가져오는 액션
export function fetchUserComments(movieId, page = 1) {
    const request = axios.get(API_URL + '/user_comments/' + movieId + '?page=' + page)
        .then(response => response.data)

    return {
        type: FETCH_USER_COMMENTS,
        payload: request
    }
}

// 사이트 유저 댓글 작성/수정
export function submitComments(dataToSubmit) {
    const request = axios.post(API_URL + '/edit_comment', dataToSubmit,
        { headers: { 'Authorization': `Token ${localStorage.getItem("token")}` } })
        .then(response => response.data)

    return {
        type: SUBMIT_COMMENT,
        payload: request
    }
}

// 사이트 유저 댓글 삭제
export function deleteComment(dataToSubmit) {
    const request = axios.post(API_URL + '/delete_comment', dataToSubmit,
        { headers: { 'Authorization': `Token ${localStorage.getItem("token")}` } })
        .then(response => response.data)

    return {
        type: DELETE_COMMENT,
        payload: request
    }
}