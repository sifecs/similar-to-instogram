export const initialState = {
  user: {},
  photos: [],
  currentPhoto: {}
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOAD_USER_INFO':
      let userInfo = {
        id: action.id,
        nickname: action.nickname,
        link: action.link,
        firstName: action.firstName,
        lastName: action.lastName,
        image: action.image,
        email: action.email,
        total_likes: action.total_likes,
        total_photos: action.total_photos,
        bio: action.bio
      }
      console.log('userInfo: loaded');
      return {...state, user: userInfo}

    case 'LOAD_USER_PHOTOS':
      console.log('userPhotos: loaded');
      return {...state, photos: action.items}
      
    case 'LIKE_PHOTO':
      console.log('liked photo');
      let photosWithLike = state.photos.map(photo => {
        if (photo.id === action.id) {
          photo.liked_by_user = true;
          photo.likes += 1;
        }
        return photo;
      });
      return {...state, photos: photosWithLike}

    case 'UNLIKE_PHOTO':
      console.log('unliked photo');
      let photosWithUnlike = state.photos.map(photo => {
        if (photo.id === action.id) {
          photo.liked_by_user = false;
          photo.likes -= 1;
        }
        return photo;
      });
      return {...state, photos: photosWithUnlike}
    
    case 'ADD_CURRENT_PHOTO':
      console.log('add current photo in store')
      let currentPhoto = state.photos.filter(photo => photo.id === action.id);
      return {...state, currentPhoto: currentPhoto[0]}
      
    default:
      return state;
  }
}
