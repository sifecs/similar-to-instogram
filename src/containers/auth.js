import React from 'react';
import Header from '../components/header';
import Photos from '../components/photos';
import ZoomPhoto from '../components/zoom-photo';
import spiner from '../assets/spiner.gif';
import {Route} from 'react-router-dom';
import {getToken, unsplash, getUser, getPhotos, likePhoto, unlikePhoto} from '../unsplash/unsplash';

class Auth extends React.Component {
  constructor(props) {
    super(props);

    const {loadUserInfo, loadUserPhotos} = props;
    const getUserData = async () => {
      await getToken(unsplash);
      let data = await getUser(unsplash);
      await loadUserInfo(data);
      let photos = await getPhotos(unsplash);
      await loadUserPhotos(photos);
    }
    getUserData();
  }

  componentDidMount() {
    window.addEventListener('scroll', this.debounce(this.lazyLoadingScrollPhoto.bind(this), 800));
  }

  likedPhoto(id) {
    const {likePhotoAction} = this.props;
    likePhoto(unsplash, id);
    likePhotoAction(id);
  }

  unlikedPhoto(id) {
    const {unlikePhotoAction} = this.props;
    unlikePhoto(unsplash, id);
    unlikePhotoAction(id);
  }

  addCurrentPhoto(id) {
    const {addCurrentPhotoAction} = this.props;
    addCurrentPhotoAction(id);
  }

  debounce(func, wait, immediate) {
    let timeout;
    return function() {
      let context = this, args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) {
        func.apply(context, args);
      }
    };
  };

  lazyLoadingScrollPhoto() {
      let heightBound = document.getElementById('photos').scrollHeight;
      if (heightBound - 480 < window.scrollY) {
        const loadPhoto = async () => {
          const amount = this.props.store.photos.length + 9;
          let spinerEl = document.createElement('img');
          spinerEl.classList.add('spiner');
          spinerEl.setAttribute('src', spiner);
          document.querySelector('.auth-page').appendChild(spinerEl);
          let getPhoto = await getPhotos(unsplash, amount);
          await this.props.loadUserPhotos(getPhoto)
          document.querySelector('.auth-page').removeChild(spinerEl)
        };
        loadPhoto();
      }
    };

  render() {
    const {user, photos, currentPhoto} = this.props.store;
    const {loadUserPhotos} = this.props;

    return(
      <div className="auth-page">

        <Photos
          photos={photos}
          loadUserPhotos={loadUserPhotos}
          addCurrentPhoto={this.addCurrentPhoto.bind(this)}
          likePhoto={this.likedPhoto.bind(this)}
          unlikePhoto={this.unlikedPhoto.bind(this)}
        />
        <Route
          path="/auth/:id"
          render={() => (
            <ZoomPhoto
              history={this.props.history}
              currentPhoto={currentPhoto}
              likePhoto={this.likedPhoto.bind(this)}
              unlikePhoto={this.unlikedPhoto.bind(this)}
            />
          )}
        />
      </div>
    )
  }
}

export default Auth;
