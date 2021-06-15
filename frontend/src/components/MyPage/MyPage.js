import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteComment } from '../../_actions/comment_action'
import { fetchUserInfo } from '../../_actions/user_action'
import NavBar from '../NavBar/NavBar'
import CommentItem from './Sections/CommentItem'
import './MyPage.css'

function MyPage() {

    const dispatch = useDispatch()

    const [User, setUser] = useState([])

    const [UserComments, setUserComments] = useState([])

    useEffect(() => {
        dispatch(fetchUserInfo())
            .then(response => {
                console.log(response)
                setUser(response.payload)
                setUserComments(response.payload.comments)
            })
    }, [])



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
                    {UserComments.length === 0 ? '아직 평가가 없어요' : UserComments && UserComments.map((UserComment, index) =>
                        <React.Fragment key={index}>
                            <CommentItem
                                movie_id={UserComment.movie_id}
                                score={UserComment.score}
                                body={UserComment.body}
                                key={index}
                            />
                        </React.Fragment>
                    )}
                </ul>
            </div>

        </div>
    )
}

export default MyPage
