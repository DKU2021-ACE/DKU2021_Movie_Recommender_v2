import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../_actions/comment_action'
import { fetchUserInfo } from '../../_actions/user_action'
import NavBar from '../NavBar/NavBar'
import './MyPage.css'

function MyPage() {

    const dispatch = useDispatch()

    const [User, setUser] = useState([])

    // 코멘트 부분을 왜ㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐㅐ state로 다시 정의해야하는거야 length 메소드 오류남;
    const [UserComments, setUserComments] = useState([])

    useEffect(() => {
        dispatch(fetchUserInfo())
            .then(response => {
                console.log(response)
                setUser(response.payload)
                setUserComments(response.payload.comments)
            })
    }, [])

    const DeleteComment = (movie_id) => {
        let dataToSubmit = {
            movie_id: movie_id
        }
        dispatch(deleteComment(dataToSubmit))
            .then(response => {
                console.log(response)
                window.location.reload()
            })
    }

    return (
        <div>
            <NavBar />
            <br />
            <br />
            <div class="mypageform">
                <br /><br />
                <h2>My Page</h2>
                <ul class="myinfo">
                    <li class="useridform">
                        <h2 class="user_id"><span style={{ color: "lightslategrey" }}>ID : </span><span>{User.email}</span></h2>
                    </li>
                    <li class="usernicknameform">
                        <h2 class="user_nickname"><span style={{ color: "lightslategrey" }}>Nickname : </span><span>{User.nickname}</span></h2>
                    </li>
                </ul>
            </div>

            <div class="commentform">
                <br />
                <h3 style={{ color: 'white' }}> My Comments </h3>
                <ul class="commentlist">
                    {UserComments.length === 0 ? '아직 평가가 없어요' : UserComments && UserComments.map(UserComment =>
                        <li class="user_comment">
                            <h4 style={{ float: 'center', display: 'inline-block', color: '#636e72' }}>
                                영화ID : {UserComment.movie_id},
                                평점 : {UserComment.score},
                                내용 : {UserComment.body}
                            </h4>
                            <button style={{ float: 'center', marginRight: '1%', marginLeft: '2%', backgroundColor: 'black', border: 'none' }}>
                                <a href={'/movie/' + UserComment.movie_id}>수정</a>
                            </button>
                            <button style={{ float: 'center', backgroundColor: 'black', border: 'none' }} onClick={() => DeleteComment(UserComment.movie_id)}>
                                <a href='#'>삭제</a>
                            </button>
                        </li>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default MyPage
