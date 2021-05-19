import React from 'react'
import { withRouter } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../_actions/user_action'
import './LandingPage.css';

function LandingPage() {
    const dispatch = useDispatch();

    const onLogoutHandler = (e) => {
        dispatch(logoutUser())
            .then(response => {
                console.log(response)
            })
    }

    return (
        <div>

            {localStorage.getItem("token") === null ?
                <nav class="menu">
                    <ul>
                        <li><a href="/signup">SignUp</a></li>
                        <li><a href="/login">SignIn</a></li>
                        <li><a href="/movie">MovieList</a></li>
                    </ul>
                </nav>
                :
                <nav class="menu">
                    <ul>
                        <li><a href="/mypage">MyPage</a></li>
                        <li><a href="#" onClick={onLogoutHandler}>Logout</a></li>
                        <li><a href="/movie">MovieList</a></li>
                    </ul>
                </nav>
            }
            <br /><br />
            <h1 class="hint">영화보러갈래?</h1>
            <p class="hint" >DKU2021-ACE 커피한잔팀 댓글 기반 영화추천 서비스</p>
        </div>
    )
}

export default withRouter(LandingPage)