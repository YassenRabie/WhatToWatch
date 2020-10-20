import React from 'react'

const SearchForm = ({ setSeachTerm, findMovies, searchTerm }) => {
    return (
        <form className="form" onSubmit={findMovies}>
            <label className="label" htmlFor="query">Movie Name: </label>
            <input
                className="input"
                type="text"
                name="query"
                placeholder="i.e. Harry Potter..."
                value={searchTerm}
                onChange={(e) => setSeachTerm(e.target.value)}
            />
            <button className="button" type="submit">Search</button>
        </form>
    )
}

export default SearchForm
