import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovies } from '../../_actions/movie_action'
import GridCards from '../commons/GridCards/GridCards'
import NavBar from '../NavBar/NavBar'


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
    }, [])

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
    const filterMovies = () => {
        setCurrentPage(2);
        setMovies([]);
        dispatch(fetchMovies(CurrentPage, Title, Genre, Score))
            .then(response => {
                console.log(response)
                setMovies([...Movies, ...response.payload.results])
            })
    }

    return (
        <div>
            <NavBar />
            <br />
            <br />
            <br />
            {/* <div style={{ margin: 'auto', textAlign: 'center' }}>
                평점 선택
                <select style={{ color: 'black', marginLeft: '1%', marginRight: '1%' }} onChange={(e) => setScore(parseInt(e.target.value))} >
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

                <input type='text' placeholder='영화 제목' onChange={onTitleHandler} style={{ color: 'black' }} />
                <button style={{ backgroundColor: 'black' }} onClick={filterMovies}>검색</button>
            </div> */}

            <div style={{ width: '100%', margin: '0' }}>
                <div style={{ width: '85%', margin: '1rem auto' }}>
                    <h2 style={{ color: "white" }}> 영화 목록 </h2>
                    <hr />
                    <br />
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
                        {Movies && Movies.map((movie, index) => (
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button style={{ color: 'black' }} onClick={loadMoreMovies}> 더 불러오기 </button>
                </div>
                <br />
            </div>
        </div >
    )
}

export default MovieListPage
