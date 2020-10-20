import React from 'react'
import { faTable, faStar } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MovieCard = ({ movie, showMovieModal }) => {

    console.log(movie)
    return (
        <>
            <div className="card" onClick={() => showMovieModal(movie)} style={{ backgroundImage: `url(https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path})` }}>
                <div className="card--content">
                    <div className="info">
                        <h3 className="card--title">{movie.title}</h3>
                        <p><small><FontAwesomeIcon icon={faTable} /> {movie.release_date}</small></p>
                        <p><small><FontAwesomeIcon icon={faStar} /> {movie.vote_average}</small></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieCard
