import React from 'react';
import {NavLink} from 'react-router-dom';

const Photo = ({photo, likePhoto, unlikePhoto, addCurrentPhoto}) => {
  let date = new Date(photo.created_at);
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return (
    <div className="photo-wrap">
      <div className="photo-wrap__header">
        <div className="photo-wrap__header_left">
          <div className="author-img">
            <img src={photo.user.profile_image.small}></img>
          </div>
          <div className="author"><a href={photo.user.links.html}>{photo.user.username}</a></div>
        </div>
        <div className="photo-wrap__header_right">
          <p className="author-date">{date.toLocaleString('en-US', options)}</p>
        </div>
      </div>
      <hr></hr>
      <div className="photo-item" onClick={ev => addCurrentPhoto(photo.id)}>

        <NavLink to={'/auth/'+photo.id}>
          <img src={photo.urls.small}></img>
        </NavLink>
      </div>
      <div className="likes">
        <div className="likes__hearts">
          {
            photo.liked_by_user ? (
              <a onClick={ev => {ev.preventDefault(); unlikePhoto(photo.id)}}>
                <div className='unlike'></div>
              </a>
            ) : (
              <a onClick={ev => {ev.preventDefault(); likePhoto(photo.id)}}>
                <div className='like'></div>
              </a>
            )
          }
        </div>
        <p className="likes__count">{photo.likes}</p>
      </div>
    </div>
  )
}

export default Photo;
