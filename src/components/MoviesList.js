import React, { useState } from 'react'
import MovieCard from './MovieCard'
import MovieModal from './Modal'

const MoviesList = ({ movies }) => {
    const [movieModalOpen, setMovieModalOpen] = useState(false)
    const [currentMovie, setCurrentMovie] = useState()

    const showMovieModal = (movie) => {
        setCurrentMovie(movie)
        setMovieModalOpen(true)
    }
    const closeMovieModal = () => {
        setMovieModalOpen(false)
    }

    return (
        <>
            <MovieModal movieModalOpen={movieModalOpen} closeMovieModal={closeMovieModal} movie={currentMovie} />
            {movies.filter(movie => movie.poster_path).map(movie => (
                <MovieCard key={movie.id} movie={movie} showMovieModal={showMovieModal} />
            ))}
        </>
    )
}

export default MoviesList
