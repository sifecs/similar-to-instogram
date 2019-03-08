import React from 'react';
import logo from '../assets/logo.png';

const Header = ({user}) => {
  return (
    <section id="header">
      <div className="row">
        <div className="col-md-12">
          <div className="auth-logo">
            <a href="https://skillbox.ru/">
              <img src={logo}></img>
            </a>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <div className="auth-avatar">
            <img src={user.image}></img>
          </div>
        </div>
        <div className="col-md-9">
          <div className="auth-panel">
            <div className="auth-nickname d-flex justify-content-start">
              <a href={user.link}>
                <h6>{`${user.lastName} ${user.firstName}`}</h6>
              </a>
              <p>{user.email ? user.email : ''}</p>
            </div>
            <div className="auth-statistic d-flex justify-content-between">
              <p>{`Total photos: ${user.total_photos}`}</p>
              <p>{`Total likes: ${user.total_likes}`}</p>
              <p>{`Biography: ${user.bio ? user.bio : 'Please tell about yourself'}`}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header;
