import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../_actions/user_action'
import { withRouter } from 'react-router-dom'
import './RegisterPage.css'
import NavBar from '../NavBar/NavBar'

function RegisterPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Nickname, setNickname] = useState("")
    const [Password, setPassword] = useState("")
    const [Password_Confirm, setPassword_Confirm] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onNicknameHandler = (e) => {
        setNickname(e.currentTarget.value)
    }

    const onPasswordHandler = (e) => {
        setPassword(e.currentTarget.value)
    }

    const onPassword_ConfirmHandler = (e) => {
        setPassword_Confirm(e.currentTarget.value)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();

        if (Password !== Password_Confirm) {
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email: Email,
            nickname: Nickname,
            password: Password,
            password_confirm: Password_Confirm
        }

        dispatch(registerUser(body))
            .then(response => {
                console.log(response)
                if (response.payload.result) {
                    alert('회원가입 되었습니다 !')
                    props.history.push('/login')
                } else {
                    alert(response.payload.error_message)
                }
            })
    }

    return (
        <div>
            <NavBar />
            <form class="registerForm">

                <h2 style={{ color: 'white' }}>SignUp</h2>

                <div class="idForm">
                    <input type="text" class="id" placeholder="Email" value={Email} onChange={onEmailHandler} />
                </div>

                <div class="nicknameForm">
                    <input type="text" class="nickname" placeholder="Nickname" value={Nickname} onChange={onNicknameHandler} />
                </div>

                <div class="passForm">
                    <input type="password" class="pw" placeholder="PW" value={Password} onChange={onPasswordHandler} />
                </div>

                <div class="passcheck">
                    <input type="password" class="pwcheck" placeholder="PW check" value={Password_Confirm} onChange={onPassword_ConfirmHandler} />
                </div>

                <button type="button" class="btn" onClick={onSubmitHandler}>
                    SIGN UP
                </button>

                <div class="bottomText">
                    <br />
                    <p style={{ fontsize: '10pt' }}>
                        Already have your account? <br />
                        <a href="/login">Log In</a>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default withRouter(RegisterPage)