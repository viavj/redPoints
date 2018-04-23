import React from 'react';
import { Link } from 'react-router-dom';
import * as routes from '../../shared/Navigation/routes';
import * as UIExternalAssets from '../../shared/UI/externalAssets';
import './Movie.css';

const movie = React.forwardRef((props, ref) => {
    return (
        <div className={'base ' + props.className}>
            <Link to={`${routes.MOVIE_PAGE}/${props.movie.id}`}>
                <div onClick={props.toggleModal}>
                    <img src={props.movie.poster_path} />
                    <div className='description'>
                        <p>Title: {props.movie.original_title}</p>
                        <p>Release date: {props.movie.release_date}</p>
                        <p>Raiting: {props.movie.vote_average}</p>
                    </div>
                    {props.isFavorite ? <img className='favoriteIcon' src={UIExternalAssets.FAVORITE_ICON_URL}/> : null}
                </div>
            </Link>
            {props.isFavorite && props.renderForModal ? 
            <button className='fav-btn remove-btn' onClick={props.removeFromFavs} >Remove from Favs.</button>
                : null}
        </div>
    )
})

export default movie;