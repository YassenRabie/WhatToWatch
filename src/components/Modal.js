import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from './../config'
import { faTable, faStar, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const MovieModal = ({ movie, movieModalOpen, closeMovieModal }) => {
    const [genres, setGenres] = useState([])

    useEffect(() => {
        let endpoint = `${API_URL}genre/movie/list?api_key=${API_KEY}&language=en-US`
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setGenres([
                    ...result.genres
                ])
            })
            .catch(error => console.error('Error:', error))
    }, [])

    return (
        <Modal
            isOpen={movieModalOpen}
            onRequestClose={closeMovieModal}
            closeTimeoutMS={200}
            className="modal"
        >
            {movie &&
                <>
                    <div className="modal-backdop" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${movie.backdrop_path})` }}>
                        <div className="close-modal-icon" onClick={closeMovieModal}>
                            <FontAwesomeIcon icon={faTimes} className="icon" />
                        </div>
                        <div className="black-effect">
                            <div className="modal-content">
                                <div className="poster-container">
                                    <div className="movie-poster" style={{ backgroundImage: `url(${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path})` }}></div>
                                </div>
                                <div className="movie-info">
                                    <h3>{movie.title}</h3>
                                    <p className="overview">{movie.overview}</p>
                                    <small><FontAwesomeIcon icon={faTable} /> {movie.release_date}</small>
                                    <small><FontAwesomeIcon icon={faStar} /> {movie.vote_average}</small>
                                    <small>Genres:
                                        <span> {movie.genre_ids.map(item1 => (
                                        <>{genres.map(item2 => {
                                            if (item2.id === item1) {
                                                return `${item2.name}, `
                                            }
                                        })}
                                        </>
                                    ))}</span>
                                    </small>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }
        </Modal>

    )
}

export default MovieModal
