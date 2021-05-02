import React, { useEffect, useState } from 'react'
import "./nominated-movies.css"

function NominatedMovies(props) {
    // const [nominatedMovies, setNominatedMovies] = useState(JSON.parse(localStorage.getItem("nominated")))
    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem("nominated"))
        props.setNominatedMovies(movies)
    }, [])
    return (
        <div className="nominated-movies_container">
            <h5 className="nominated-movies_header">Nominated Movies</h5>
            {
                props.nominatedMovies && props.nominatedMovies.length?
                <div className="nominated-movies">
                    {
                        props.nominatedMovies.map(movie=>{
                            return(
                                <div className="nominated-movie">
                                    <h5 className="nominated-title">{movie.Title}</h5>
                                    <h5 className="nominated-year">{movie.Year}</h5>
                                    <button className="remove-nominate"
                                    onClick={
                                        ()=>{
                                            let nominated_movies = JSON.parse(localStorage.getItem("nominated"))
                                                const newArr = props.nominatedMovies.filter(data=> movie.imdbID !== data.imdbID)
                                                props.setNominatedMovies(newArr)
                                                localStorage.setItem("nominated",JSON.stringify(newArr))
                                        }
                                    }
                                    >Remove From Nomination</button>
                                </div>
                            )
                        })
                    }
                </div>
                :<p>No Nominated Movies</p>
            }
        </div>
    )
}

export default NominatedMovies
