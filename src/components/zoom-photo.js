import React from 'react';

const ZoomPhoto = ({currentPhoto, unlikePhoto, likePhoto, history}) => {
  let date = new Date(currentPhoto.created_at);
  let options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  return (
    <div className="popup" onClick={ev => {
      if (ev.target === document.querySelector('.popup')) {
        history.goBack();
      }
    }}>
      <div className="popup__block">
        <div className="popup__left-block">
          <div className="popup__photo">
            <img src={currentPhoto.urls.regular}></img>
          </div>
        </div>
        <div className="popup__right-block">
          <div className="popup__author-img">
            <div className="author-img">
              <img src={currentPhoto.user.profile_image.medium}></img>
            </div>
          </div>
          <div className="popup__author author">
            <a href={currentPhoto.user.links.html}>
              {currentPhoto.user.name}
            </a>
          </div>
          <div className="likes">
            <div className="likes__hearts">
              {
                currentPhoto.liked_by_user ? (
                  <a onClick={ev => {ev.preventDefault(); unlikePhoto(currentPhoto.id)}}>
                    <div className='unlike'></div>
                  </a>
                ) : (
                  <a onClick={ev => {ev.preventDefault(); likePhoto(currentPhoto.id)}}>
                    <div className='like'></div>
                  </a>
                )
              }
            </div>
            <p className="likes__count">{currentPhoto.likes}</p>
          </div>
          <hr></hr>
          <div className="popup-description">
            <h6>Description:</h6>
            <p className="author-date popup-author-date">{date.toLocaleString('en-US', options)}</p>
            <p>{
              currentPhoto.description ? currentPhoto.description : '...'
            }</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ZoomPhoto;
