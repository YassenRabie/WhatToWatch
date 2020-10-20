import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL, POSTER_SIZE, BACKDROP_SIZE } from './../config'
import FilterSection from './FilterSection'
import MoviesList from './MoviesList'

const SearchMovies = () => {
    const [state, setState] = useState({
        movies: [],
        latestMovie: null,
        loading: false,
        currentPage: 0,
        totalPages: 0,
        searchTerm: '',
        tap: 'popular',
        filter: {
            genres: []
        }
    })

    useEffect(() => {
        const endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=1`
        fetchItems(endPoint)
    }, [])

    useEffect(() => {
        if (state.loading) {
            let endPoint = ``
            if (state.searchTerm === '') {
                endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=1`
            } else {
                endPoint = `${API_URL}search/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&query=${state.searchTerm}`
            }
            fetchItems(endPoint)
        }
    }, [state.loading])

    useEffect(() => {
        let endPoint = ``

        if (state.tap === 'popular') {
            endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=1`
        } else if (state.tap === 'top_ratied') {
            endPoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        } else {
            endPoint = `${API_URL}search/movie?api_key=${API_KEY}&sort_by=popularity.desc&language=en-US&query=${state.searchTerm}`
        }
        fetchItems(endPoint)
    }, [state.tap])

    // const updateFilterGenres = (id) => {
    //     let newGenres
    //     if (!state.filter.genres.includes(id)) {
    //         newGenres = [...state.filter.genres, id]
    //     } else {
    //         newGenres = state.filter.genres.filter(item => item !== id)
    //     }

    //     setState({
    //         ...state,
    //         filter: {
    //             ...state.filter,
    //             genres: newGenres
    //         }
    //     })
    //     console.log(id)
    // }

    const setSeachTerm = (searchTerm) => {
        setState({
            ...state,
            searchTerm
        })
    }

    const findMovies = (e) => {
        e.preventDefault()
        setState({
            ...state,
            movies: [],
            loading: true,
            tap: 'search'
        })
        if (state.searchTerm === '') {
            let endPoint = `${API_URL}movie/popular?api_key=${API_KEY}&page=1`
        }
    }

    const changeFetchTap = (tap) => {
        if (tap === state.tap) return
        setState({
            ...state,
            movies: [],
            tap
        })
    }

    const fetchItems = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setState({
                    ...state,
                    movies: [...state.movies, ...result.results],
                    loading: false,
                    currentPage: result.page,
                    totalPages: result.total_pages
                })
            })
            .catch(error => console.error('Error:', error))
    }

    const loadMoreMovies = () => {
        let endpoint = ''
        // setState(...state, { loading: true })

        if (state.tap === 'popular') {
            endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${state.currentPage + 1}`
        } else if (state.tap === 'top_ratied') {
            endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${state.currentPage + 1}`
        } else {
            endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${state.searchTerm}&page=${state.currentPage + 1}`
        }

        fetchItems(endpoint)
    }

    return (
        <div className="wraper">
            <form className="form" onSubmit={findMovies}>
                {/* <label className="label" htmlFor="query">Movie Name: </label> */}
                <input
                    className="input"
                    type="text"
                    name="query"
                    placeholder="i.e. Harry Potter..."
                    value={state.searchTerm || ''}
                    onChange={(e) => setSeachTerm(e.target.value)}
                />
                <button className="btn" type="submit">Search</button>
            </form>
            {/* <FilterSection updateFilterGenres={updateFilterGenres} /> */}
            <div className="taps">
                <button
                    className="btn"
                    onClick={() => changeFetchTap('popular')}
                    disabled={state.tap === 'popular' ? "true" : ""}
                >Popular</button>
                <button
                    className="btn"
                    onClick={() => changeFetchTap('top_ratied')}

                    disabled={state.tap === 'top_ratied' ? "true" : ""}
                >Top rated</button>
            </div>
            {state.movies.length === 0 && <p>There is no movies with this name...</p>}
            <div className="card-list">
                <MoviesList movies={state.movies} />
            </div>
            {(state.loading || state.movies.length === 0) || <button onClick={loadMoreMovies} className="btn load-more-btn">Load More...</button>}
            <p className="copyright">© 2020 <a href="https://yassenrabie.netlify.app/" target="_blank">Yassen</a> Rights Reserved, Powered by <a href="https://www.themoviedb.org" target="_blank">TMDB</a></p>
        </div>
    )
}

export default SearchMovies
