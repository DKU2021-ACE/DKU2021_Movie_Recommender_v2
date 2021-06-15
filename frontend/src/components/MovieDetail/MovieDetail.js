import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchMovieDetail } from '../../_actions/movie_action'
import NavBar from '../NavBar/NavBar'
import Comment from './Sections/Comment'
import MovieInfo from './Sections/MovieInfo'
import './MovieDetail.css'

function MovieDetail(props) {

    let movieId = props.match.params.movieId
    const dispatch = useDispatch()
    const [Movie, setMovie] = useState([])

    useEffect(() => {
        dispatch(fetchMovieDetail(movieId))
            .then(response => {
                console.log(response)
                setMovie(response.payload)
            })
    }, [])

    return (
        <div>
            <NavBar />
            <br /><br /><br /><br />
            {/* Header */}
            <div
                style={{
                    backgroundImage: `url('${Movie.img_url}')`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: '30%, 100%',
                    height: '600px',
                    position: 'relative'
                }}
            >
                <div>
                    <div style={{ position: 'absolute', maxWidth: '500px', bottom: '2rem', marginLeft: '50%' }}>
                        <h2 style={{ color: 'white' }}> {Movie.name}</h2>
                        <br />
                        <p style={{ color: 'white', fontSize: '1rem' }}>{Movie.description}</p>
                    </div>
                </div>
            </div>

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>

                {/* Movie Info */}
                <MovieInfo
                    title={Movie.name}
                    score={Movie.score}
                    genres={Movie.genres}
                    actors={Movie.actors}
                    opened_at={Movie.opened_at}
                />
                <br />

                {/* Comment Grid */}
                <div>
                    <Comment movieId={movieId} />
                </div>
            </div>
        </div>
    )
}

export default MovieDetail
