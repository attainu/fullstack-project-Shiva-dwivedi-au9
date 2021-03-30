import React from 'react';
import './App.css';
import  { connect } from 'react-redux'
import Navbar from './components/Navbar';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './components/LandingPage'
import Attendance from './pages/Attendance';
import ApplyLeave from './pages/ApplyLeave';
import Tasks from './pages/Tasks';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import ViewEmployees from './pages/ViewEmployees';
import ViewLeaves from './pages/ViewLeaves';
import Team from './pages/Team';
import Support from './components/Support';
import CreateTask from './pages/CreateTask';
import Announcement from './pages/Announcement'
import fetchUserSuccess from './redux/Actions/UserProfile/UserActions';

const token =localStorage.getItem("token")

function App(props) {

  const  { auth, user } = props
  return (
    <>
     <BrowserRouter>
      { auth.isLoggedIn ? <Navbar /> :  <Header/> }
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />

          <Route path='/attendance' render={(props) => (
            <Attendance {...props} userdata={user} />
          )} />
          
          <Route path="/apply_leave" component={ApplyLeave} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/team" component={Team} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/allEmployees" component={ViewEmployees} />
          <Route path="/leaves" component={ViewLeaves} />
          <Route path="/support" component={Support} />
          <Route path="/CreateTask" component={CreateTask} />
          <Route path="/announcement" render={(props) => (
            <Announcement {...props} userdata={user} />
          )}/>
     </BrowserRouter>
    </>
  );
}

const mapStateToProps =( state ) => {
  return {
      auth : state.auth,
      user: state.userProfile.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
      fetchUser : () => dispatch(fetchUserSuccess())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
