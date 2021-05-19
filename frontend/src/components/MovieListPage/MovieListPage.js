import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovies } from '../../_actions/movie_action'
import GridCards from '../commons/GridCards/GridCards'
import NavBar from '../NavBar/NavBar'
import './MovieListPage.css'

function MovieListPage() {
    const dispatch = useDispatch()

    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(2)
    const [Title, setTitle] = useState("")
    const [Genre, setGenre] = useState("")
    const [Score, setScore] = useState(0)

    // 페이지 렌더링되고 나서 바로 실행
    useEffect(() => {
        dispatch(fetchMovies(1, Title, Genre, Score))
            .then(response => {
                console.log(response)
                setMovies(response.payload.results)
            })
    }, [Score, Genre, Title])

    const onTitleHandler = (e) => {
        setTitle(e.currentTarget.value)
    }

    // 더 불러오기 버튼 누를 시
    const loadMoreMovies = () => {
        setCurrentPage(CurrentPage + 1);
        dispatch(fetchMovies(CurrentPage, Title, Genre, Score))
            .then(response => {
                setMovies([...Movies, ...response.payload.results])
            })
    }

    // 영화 필터링 시
    // const filterMovies = () => {
    //     setCurrentPage(2);
    //     setMovies([]);
    //     dispatch(fetchMovies(CurrentPage, Title, Genre, Score))
    //         .then(response => {
    //             console.log(response)
    //             setMovies([...Movies, ...response.payload.results])
    //         })
    // }

    return (
        <div>
            <NavBar />
            <br /><br /><br /><br /><br />
            <section style={{ margin: 'auto', textAlign: 'center' }}>
                장르 선택
                <select style={{ color: 'black', marginLeft: '1%', marginRight: '1%', width: "7rem", height: "2rem" }}
                    onChange={(e) => setGenre(e.target.value)} >
                    <option style={{ color: 'black' }} value={""}>없음</option>
                    <option style={{ color: 'black' }} value={1}>드라마</option>
                    <option style={{ color: 'black' }} value={2}>판타지</option>
                    <option style={{ color: 'black' }} value={3}>서부</option>
                    <option style={{ color: 'black' }} value={4}>공포</option>
                    <option style={{ color: 'black' }} value={5}>멜로/로맨스</option>
                    <option style={{ color: 'black' }} value={6}>모험</option>
                    <option style={{ color: 'black' }} value={7}>스릴러</option>
                    <option style={{ color: 'black' }} value={8}>느와르</option>
                    <option style={{ color: 'black' }} value={9}>컬트</option>
                    <option style={{ color: 'black' }} value={10}>다큐멘터리</option>
                    <option style={{ color: 'black' }} value={11}>코미디</option>
                    <option style={{ color: 'black' }} value={12}>가족</option>
                    <option style={{ color: 'black' }} value={13}>미스터리</option>
                    <option style={{ color: 'black' }} value={14}>전쟁</option>
                    <option style={{ color: 'black' }} value={15}>애니메이션</option>
                    <option style={{ color: 'black' }} value={16}>범죄</option>
                    <option style={{ color: 'black' }} value={17}>뮤지컬</option>
                    <option style={{ color: 'black' }} value={18}>SF</option>
                    <option style={{ color: 'black' }} value={19}>액션</option>
                    <option style={{ color: 'black' }} value={20}>무협</option>
                    <option style={{ color: 'black' }} value={21}>에로</option>
                    <option style={{ color: 'black' }} value={22}>서스펜스</option>
                    <option style={{ color: 'black' }} value={23}>서사</option>
                    <option style={{ color: 'black' }} value={24}>블랙코미디</option>
                    <option style={{ color: 'black' }} value={25}>실험</option>
                    <option style={{ color: 'black' }} value={29}>공연실황</option>
                </select>
                평점 선택
                <select style={{ color: 'black', marginLeft: '1%', marginRight: '1%', width: "3rem", height: "2rem" }}
                    onChange={(e) => setScore(e.target.value)} >
                    <option style={{ color: 'black' }} value={0}>0</option>
                    <option style={{ color: 'black' }} value={1}>1</option>
                    <option style={{ color: 'black' }} value={2}>2</option>
                    <option style={{ color: 'black' }} value={3}>3</option>
                    <option style={{ color: 'black' }} value={4}>4</option>
                    <option style={{ color: 'black' }} value={5}>5</option>
                    <option style={{ color: 'black' }} value={6}>6</option>
                    <option style={{ color: 'black' }} value={7}>7</option>
                    <option style={{ color: 'black' }} value={8}>8</option>
                    <option style={{ color: 'black' }} value={9}>9</option>
                    <option style={{ color: 'black' }} value={10}>10</option>
                </select>

                <input type='text' placeholder='영화 제목' onChange={onTitleHandler}
                    style={{ color: 'black', width: "10rem", height: "2rem", textAlign: "start", marginLeft: "2%" }} />
            </section>

            <div style={{ width: '100%', marginTop: '2rem' }}>
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h4 class="mv_list" style={{ color: "white" }}> 영화 목록 </h4>
                    <hr />
                    <br />
                    <div class="movielist" style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {Movies && Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards class="moviecards"
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{ color: 'white', backgroundColor: 'black', border: 'none' }} onClick={loadMoreMovies}> 더 불러오기 </button>
                </div>
                <br />
            </div>
        </div >
    )
}

export default MovieListPage