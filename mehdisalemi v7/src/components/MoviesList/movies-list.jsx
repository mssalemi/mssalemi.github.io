import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {FaSearch} from "react-icons/fa"
import "./movie-list.css"

function MoviesList(props) {
    const [moviesList, setMoviesList] = useState([])
    const [query, setQuery] = useState('')
    const searchMovie = () => {
        axios.get(`http://www.omdbapi.com/?apikey=9928c885&s=${query}`)
        .then(res=>{
            console.log("movie",res)
            setMoviesList(res.data.Search)
        })
    }

    useEffect(() => {
        if(!localStorage.getItem("nominated")){
            localStorage.setItem("nominated",JSON.stringify([]))
        }
    }, [])
    return (
        <div className="movies-list_container">
            <div className="search-bar_container">
                <input type="text"
                onChange={
                    e=>{
                        setQuery(e.target.value)
                    }
                }
                />
                <i class="fa fa-search" aria-hidden="true"
                onClick={
                    ()=>{
                        searchMovie()
                    }
                }
                ></i>
            </div>
            {
                moviesList && moviesList.length?
                <div className="movies">
                    {
                        moviesList.map(movie=>{
                            const index = props.nominatedMovies.findIndex(val=> val.imdbID == movie.imdbID)
                            return(
                                <div className="movie-box">
                                    <div className="poster_container">
                                        <img src={movie.Poster} alt="" className="movie-poster"/>
                                    </div>
                                    <div className="movie-data_container">
                                        <h5 className="movie-title">{movie.Title}</h5>
                                        <h5 className="release-date">{movie.Year}</h5>
                                        <h5 className="type">{movie.Type}</h5>
                                        <button className="nominate-button"
                                        disabled={index>-1}
                                        onClick={
                                            ()=>{
                                                let nominated_movies = JSON.parse(localStorage.getItem("nominated"))
                                                    nominated_movies.push(movie)
                                                    props.setNominatedMovies(nominated_movies)
                                                    localStorage.setItem("nominated",JSON.stringify(nominated_movies))
                                            }
                                        }
                                        >Nominate</button>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                :
                <p className="no-data">No Data To Show</p>
            }
        </div>
    )
}

export default MoviesList
