import React from 'react';
import './MovieDetails.css';

const movieDetails = (props) => {
    return (
        <div className='movieDetails'>
            <img src={props.movie.poster_path} />
            <p><strong>Title:</strong> {props.movie.original_title}</p>
            <p><strong>Release date:</strong> {props.movie.release_date}</p>
            <p><strong>Raiting:</strong> {props.movie.vote_average}</p>
            <p><strong>Overview</strong></p>
            <p>{props.movie.overview}</p>
            {props.isFavorite ? <button className='fav-btn remove-btn' onClick={props.removeFromFavs} >Remove from Favs.</button>
                : <button className='fav-btn add-btn' onClick={props.addToFavs} >Add To Favs.</button>}
        </div>
    )
}

export default movieDetails;