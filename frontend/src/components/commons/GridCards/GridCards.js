import React from 'react'

function GridCards(props) {
    return (
        <div style={{ width: '24%', height: '100%', margin: '0.3%' }}>
            <a href={`/movie/${props.movieId}`}>
                <img style={{ width: '100%', height: '100%' }} src={props.image} alt={props.movieName} />
            </a>
        </div>
    )
}

export default GridCards
