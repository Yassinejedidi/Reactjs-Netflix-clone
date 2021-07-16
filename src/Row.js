import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');
    // A snippet of code which runs based on a specific condition/variable
    useEffect(() => {
        // effect
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            // `/discover/tv?api_key=${API_KEY}&with_networks=213`,
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);
    // if [], run once when the row loads, and don't run again
    // if [movie], will reload wheneven movie updated

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            console.log('movie?.name:', movie?.name);
            console.log('movie:', movie);
            movieTrailer(movie?.name || '')
                .then((url) => {
                    // https://www.youtube.com/watch?v=Qqx_wzMmFeA
                    console.log('url:', url);

                    const urlParams = new URLSearchParams(new URL(url).search);
                    console.log('test01:', urlParams.get('v'));

                    setTrailerUrl(urlParams.get('v'));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="row">
            {/* title */}
            <h2>{title}</h2>
            <div className="row__posters">
                {/* several row__poster(s) */}
                {movies.map((movie) => (
                    <img
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row__poster ${
                            isLargeRow && 'row__posterLarge'
                        }`}
                        src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                        }`}
                        alt={movie.name}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
}

export default Row;