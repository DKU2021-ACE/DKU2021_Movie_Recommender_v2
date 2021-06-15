import axios from 'axios'
import {
    FETCH_MOVIES, FETCH_MOVIEDETAIL, FETCH_RECOMMENDEDMOVIES
} from './types'
import { API_URL } from '../components/Config'


/*
// Equivalent to `axios.get('https://httpbin.org/get?answer=42')`
const res = await axios.get('https://httpbin.org/get', { params: { answer: 42 } });
이런 방식도 존재
*/

// 영화 리스트 가져오는 액션 (필터링 포함)
export function fetchMovies(page = 1, title, genre, score_gte) {
    const request = axios.get(API_URL + '/movies/?page=' + page + '&title=' + title + '&genre=' + genre + '&score_gte=' + score_gte)
        .then(response => response.data)

    return {
        type: FETCH_MOVIES,
        payload: request
    }
}


// 영화 정보 가져오는 액션
export function fetchMovieDetail(movieId) {
    const request = axios.get(API_URL + '/movies/' + movieId)
        .then(response => response.data)

    return {
        type: FETCH_MOVIEDETAIL,
        payload: request
    }
}

// 추천된 영화 리스트 가져오는 액션
export function fetchRecommendedMovies() {
    const request = axios.get(API_URL + '/recommends',
        { headers: { 'Authorization': `Token ${localStorage.getItem("token")}` } })
        .then(response => response.data)

    return {
        type: FETCH_RECOMMENDEDMOVIES,
        payload: request
    }
}