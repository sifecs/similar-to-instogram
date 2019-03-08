import React from 'react';
import Photo from './photo';

const Photos = ({photos, likePhoto, unlikePhoto, addCurrentPhoto}) => {



  return (
    <section id="photos" onScroll={() => lazyLoadingScrollPhoto()}>
      <div className="col-md-12">
        <div className="photos-block">
          {
            photos.map((photo, index) => {
              return (
                <Photo
                  photo={photo}
                  key={index}
                  likePhoto={likePhoto.bind(this)}
                  unlikePhoto={unlikePhoto.bind(this)}
                  addCurrentPhoto={addCurrentPhoto.bind(this)}
                />
              )
            })
          }
        
        </div>
      </div>
    </section>
  )
}

export default Photos;
