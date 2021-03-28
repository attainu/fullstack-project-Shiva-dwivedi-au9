import React, { useEffect, useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux'
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { LogoutAuthAction } from '../redux/Actions/Auth/AuthAction';
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions';

const token = localStorage.getItem("token")

function Navbar(props) {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory()

  const { user, logout, fetchUser } = props
  useEffect(() => {

    fetchUser()

},[])
  sessionStorage.setItem("role",user.department)
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <div className="AuthBtn">

          { token ?
          <div className="navData">
            <h5 className="username">Hello {user.name}</h5>
            <button onClick={() => {
              logout(history)
              sessionStorage.removeItem("date")
              localStorage.removeItem("username")
              localStorage.removeItem('password')
            }}><Link to="/login">Logout</Link></button>
          </div>
          :
          <div> <button className="register"><Link to="/register">Register</Link></button>
          <button className="login"><Link to="/login">Login</Link></button></div>
          }
         

          </div>
        
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path} target={item.target}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            { user.role === "HR" ? <div>
                <li  className="nav-text">
                      <Link to="/allEmployees">
                      <i class="fas fa-users"></i>
                        <span>View Employees</span>
                      </Link>
                </li>
                <li  className="nav-text">
                  <Link to="/leaves">
                  <i class="fas fa-sign-out-alt"></i>
                    <span>View Leaves</span>
                  </Link>
                </li>
                <li  className="nav-text">
                  <Link to="/register">
                  <i class="fas fa-user-plus"></i>
                    <span>Add User</span>
                  </Link>
                </li>
                </div>
                :<></> }
                { user.role === "TeamLead" ? <div>
                <li  className="nav-text">
                      <Link to="/CreateTask">
                      <i class="fas fa-tasks"></i>
                        <span>Create Task</span>
                      </Link>
                </li>
                <li  className="nav-text">
                  <Link to="/announcement">
                  <i class="fas fa-bullhorn"></i>
                    <span>Announcements</span>
                  </Link>
                </li>
                <li  className="nav-text">
                      <Link to="/allEmployees">
                      <i class="fas fa-users"></i>
                        <span>View Employees</span>
                      </Link>
                </li>
                </div>
                :<></> }
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

const mapStateToProps = state => {
  return {
      user : state.userProfile.user
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout : (history) => {
          dispatch(LogoutAuthAction(history))
      },

      fetchUser : () => dispatch(fetchUserSuccess())
  }
}


export default connect(mapStateToProps , mapDispatchToProps)(Navbar)
