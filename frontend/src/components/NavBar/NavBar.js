import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../_actions/user_action'
import './NavBar.css'

function NavBar() {
    const dispatch = useDispatch();

    const onLogoutHandler = (e) => {
        dispatch(logoutUser())
            .then(response => {
                console.log(response)
                window.history.push('/')
            })
    }

    return (
        <header id="header" class="fixed-top">
            <div class="container">
                <h1><a class="logo" href="/">영화보러갈래?</a></h1>
                <nav class="topbar">
                    {localStorage.getItem("token") === null ?
                        <ul>
                            <li><a href="/movie">MovieList</a></li>
                            <li><a href="/login">Login</a></li>
                            <li><a href="/signup">SignUp</a></li>
                        </ul>
                        :
                        <ul>
                            <li><a href="/movie">MovieList</a></li>
                            <li><a href="/recommend">Recommend</a></li>
                            <li><a href="/mypage">MyPage</a></li>
                            <li><a href="#" onClick={onLogoutHandler}>LogOut</a></li>
                        </ul>
                    }
                </nav>
            </div>
        </header>

    )
}

export default NavBar