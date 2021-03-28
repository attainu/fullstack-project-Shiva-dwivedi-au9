import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import AOS from 'aos'
import 'aos/dist/aos.css';
import { FaConnectdevelop } from 'react-icons/fa';
import UserProfile from './UserProfile';

const token = localStorage.getItem("token")

function Home(props) {

  const { auth } = props

  return (
    <div className='home'>
    { auth.isLoggedIn ? <div>
      <UserProfile />
      </div> :<h2> login first</h2>}
       
    </div>
  );
}

const mapStateToProps =( state ) => {
  return {
      auth : state.auth
  }
}

export default connect(mapStateToProps)(Home);
