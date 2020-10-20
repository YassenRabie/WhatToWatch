import React from 'react'
import './styles/_base.css'
import Header from './components/Header'
import SearchMovies from './components/SearchMovies'

function App() {
    return (
        <div className="App">
            <Header />
            <SearchMovies />
        </div>
    )
}

export default App
