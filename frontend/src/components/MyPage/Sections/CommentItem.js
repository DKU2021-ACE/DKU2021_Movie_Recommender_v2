import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../../_actions/comment_action'
import { fetchMovieDetail } from '../../../_actions/movie_action'
import '../MyPage.css'

function CommentItem(props) {

    const dispatch = useDispatch()

    const [Title, setTitle] = useState('')

    useEffect(() => {
        dispatch(fetchMovieDetail(props.movie_id))
            .then(response => {
                setTitle(response.payload.name)
            })
    }, [])

    const DeleteComment = () => {
        let dataToSubmit = {
            movie_id: props.movie_id
        }
        dispatch(deleteComment(dataToSubmit))
            .then(response => {
                console.log(response)
                window.location.reload()
            })
    }

    return (
        <li class="user_comment">
            <h4 style={{ float: 'left', display: 'inline-block', color: '#636e72' }}>
                제목 : {Title},
                평점 : {props.score},
                내용 : {props.body}
            </h4>
            <button style={{ float: 'right', marginRight: '1%', marginLeft: '2%', backgroundColor: 'black', border: 'none' }}>
                <a href={'/movie/' + props.movie_id}>수정</a>
            </button>
            <button style={{ float: 'right', backgroundColor: 'black', border: 'none' }} onClick={() => DeleteComment(props.movie_id)}>
                <a href='#'>삭제</a>
            </button>
        </li>
    )
}

export default CommentItem
