import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY } from './../config'

const FilterSection = ({ updateFilterGenres }) => {
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
        <div>
            {genres.map((genra) => (
                <button onClick={() => updateFilterGenres(genra.id)}>{genra.name}</button>
            ))}
        </div>
    )
}

export default FilterSection
