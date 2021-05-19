import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import './LoginPage.css'
import NavBar from '../NavBar/NavBar'

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const onChangeEmail = (e) => {
        setEmail(e.currentTarget.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                console.log(response)
                if (response.payload.result) {
                    // alert('로그인 되었습니다 !')
                    localStorage.setItem("token", response.payload.auth_token)
                    props.history.push('/')
                    window.location.reload()
                } else {
                    alert(response.payload.error_message)
                }
            })
    }

    return (
        <div>
            <NavBar />
            <form class="loginForm">

                <h2 style={{ color: 'white' }}>Login</h2>

                <div class="idForm">
                    <input type="text" class="id" placeholder="Email" value={Email} onChange={onChangeEmail} />
                </div>

                <div class="passForm">
                    <input type="password" class="pw" placeholder="PW" value={Password} onChange={onChangePassword} />
                </div>

                <button type="button" class="btn" onClick={onSubmitHandler}>
                    LOG IN
                 </button>


                <div class="bottomText">
                    <br />
                    <p style={{ fontsize: '10pt' }}>
                        Don't you have ID? <br />
                        <a href="/signup">Sign Up</a>
                    </p>
                </div>

            </form>

        </div>


    );
};

export default withRouter(LoginPage)