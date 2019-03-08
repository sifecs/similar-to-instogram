import React from 'react';
import { authenticationUnsplash, unsplash } from '../unsplash/unsplash';

class Index extends React.Component {

  render() {
    return(
      <div className="authorize-block text-center">
          <button className="btn btn-success" onClick={ev => {authenticationUnsplash(unsplash)}}>Authorize</button>
      </div>
    )
  }

}

export default Index;
