import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchRecommendedMovies } from '../../_actions/movie_action'
import GridCards from '../commons/GridCards/GridCards'
import NavBar from '../NavBar/NavBar'

function RecommandPage() {
    const dispatch = useDispatch()

    const [RecommendedMovies, setRecommendedMovies] = useState([])

    // 페이지 렌더링되고 나서 바로 실행
    useEffect(() => {
        dispatch(fetchRecommendedMovies())
            .then(response => {
                console.log(response)
                setRecommendedMovies(response.payload)
            })
    }, [])

    return (
        <div>
            <NavBar />
            <br /><br /><br />
            <div style={{ width: '100%', margin: '0' }}>
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2 style={{ color: "white", display: "inline-block" }}> 추천 영화 목록 </h2>
                    <h5 style={{ color: "white", display: "inline-block", marginLeft: "1%" }}> 조금 걸릴 수 있습니다.. </h5>
                    <hr />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {RecommendedMovies && RecommendedMovies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards
                                    image={movie.img_url} /* img_url 뒤에 삼항 연산자로 기본 이미지 설정도 가능 (url 로) */
                                    movieId={movie.id}
                                    movieTitle={movie.name}
                                    key={index}
                                />
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <br />
            </div>
        </div >
    )
}

export default RecommandPage
