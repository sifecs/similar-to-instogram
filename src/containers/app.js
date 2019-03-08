import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import Index from '../components';
import Auth from './auth';

import {
  loadUserInfo,
  loadUserPhotos,
  likePhotoAction,
  unlikePhotoAction,
  addCurrentPhotoAction
    } from '../actions/index';

class App extends React.Component {

  render() {
    const {store, loadUserInfo, loadUserPhotos, likePhotoAction, unlikePhotoAction, addCurrentPhotoAction, history} = this.props;
    return(
      <div className="container">
        <Route
          path="/"
          exact
          render={() => <Index />}
        />
        <Route
          path="///"
          render={() => (
            <Auth
              loadUserInfo={loadUserInfo}
              loadUserPhotos={loadUserPhotos}
              likePhotoAction={likePhotoAction}
              unlikePhotoAction={unlikePhotoAction}
              addCurrentPhotoAction={addCurrentPhotoAction}
              store={store}
              history={history}
            />
          )}
        />
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    store: store,
    user: store.user,
    photos: store.photos,
    currentPhoto: store.currentPhoto,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadUserInfo: (res) => dispatch(loadUserInfo(res)),
    loadUserPhotos: (res) => dispatch(loadUserPhotos(res)),
    likePhotoAction: (id) => dispatch(likePhotoAction(id)),
    unlikePhotoAction: (id) => dispatch(unlikePhotoAction(id)),
    addCurrentPhotoAction: (id) => dispatch(addCurrentPhotoAction(id))
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
