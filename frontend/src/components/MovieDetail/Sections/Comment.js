import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAnonyComments, fetchUserComments, submitComments } from '../../../_actions/comment_action'

function Comment(props) {

    let movieId = props.movieId;
    const dispatch = useDispatch()
    const [AnonyComments, setAnonyComments] = useState([])
    const [UserComments, setUserComments] = useState([])
    const [AnonyPage, setAnonyPage] = useState(1)
    const [UserPage, setUserPage] = useState(1) // 아직 사용 안하고 있음. 유저가 적으니깐
    const [Score, setScore] = useState(0)
    const [CommentToSubmit, setCommentToSubmit] = useState('')

    useEffect(() => {
        dispatch(fetchAnonyComments(movieId, AnonyPage))
            .then(response => {
                console.log(response)
                setAnonyComments(response.payload.results)
            })

        dispatch(fetchUserComments(movieId, UserPage))
            .then(response => {
                console.log(response)
                setUserComments(response.payload.results)
            })

    }, [AnonyPage, UserPage])


    const AnonyPageUp = () => {
        setAnonyPage(AnonyPage + 1)
    }

    const AnonyPageDown = () => {
        if (AnonyPage !== 1) {
            setAnonyPage(AnonyPage - 1)
        } else {
            setAnonyPage(1)
        }
    }

    const SubmitComment = (e) => {
        e.preventDefault();

        let commentData = {
            movie_id: movieId,
            score: Score,
            body: CommentToSubmit
        }

        dispatch(submitComments(commentData))
            .then(response => {
                console.log(response)
                window.location.reload()
            })
    }

    return (
        <div>
            ---------------------------------
            <div>
                익명 평가
                <br />
                {AnonyComments.length === 0 ? '아직 평가가 없어요' : null}
                {AnonyComments && AnonyComments.map(AnonyComment =>
                    <span>
                        <p>
                            닉네임 : 익명,
                        평점 : {AnonyComment.score},
                        감정 : {AnonyComment.calculated_label_emotion === 1 ? "긍정" : "부정"},
                        내용: {AnonyComment.body}
                        </p>
                    </span>
                )}
            </div>
            <button style={{ color: "black" }} onClick={AnonyPageDown}>Down</button>
            <button style={{ color: "black" }} onClick={AnonyPageUp}>Up</button>
            <br />
            ---------------------------------
            <div>
                유저 평가
                <br />
                {UserComments.length === 0 ? '아직 평가가 없어요' : null}
                {UserComments && UserComments.map(UserComment =>
                    <span>
                        <p>
                            닉네임 : {UserComment.nickname},
                            평점 : {UserComment.score},
                            내용: {UserComment.body}
                        </p>
                    </span>
                )}
            </div>
            ---------------------------------
            <div>
                평가 하기
                <div>
                    <ul>
                        <li style={{ float: 'left' }}>
                            <label for={Score}>평점</label>
                            <select style={{ color: "black" }} id={Score} onChange={(e) => setScore(parseInt(e.target.value))}>
                                <option style={{ color: "black" }} value={0}>0</option>
                                <option style={{ color: "black" }} value={1}>1</option>
                                <option style={{ color: "black" }} value={2}>2</option>
                                <option style={{ color: "black" }} value={3}>3</option>
                                <option style={{ color: "black" }} value={4}>4</option>
                                <option style={{ color: "black" }} value={5}>5</option>
                                <option style={{ color: "black" }} value={6}>6</option>
                                <option style={{ color: "black" }} value={7}>7</option>
                                <option style={{ color: "black" }} value={8}>8</option>
                                <option style={{ color: "black" }} value={9}>9</option>
                                <option style={{ color: "black" }} value={10}>10</option>
                            </select>
                        </li>
                        <li>
                            <textarea style={{ color: "black" }} cols="100" rows="4" onChange={(e) => setCommentToSubmit(e.target.value)}></textarea>
                        </li>
                    </ul>
                    <br />
                    <button style={{ color: "black" }} onClick={SubmitComment}>평가하기</button>
                </div>
            </div>
        </div>
    )
}

export default Comment
