import React, { useState } from 'react'
import MoviesList from '../../components/MoviesList/movies-list'
import NominatedMovies from '../../components/NominatedMovies/nominated-movies'

function Home() {
    const [nominatedMovies, setNominatedMovies] = useState(JSON.parse(localStorage.getItem("nominated")))
    return (
        <div style={{display:"flex",width:"1200px",margin:"60px auto"}}>
            <div style={{flex:"0 0 50%",maxWidth:"50%"}}>
                <MoviesList nominatedMovies={nominatedMovies} setNominatedMovies={setNominatedMovies} />
            </div>
            <div style={{flex:"0 0 50%",maxWidth:"50%"}}>
                <NominatedMovies nominatedMovies={nominatedMovies} setNominatedMovies={setNominatedMovies} />
            </div>
        </div>
    )
}

export default Home
