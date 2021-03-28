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

const token =localStorage.getItem("token")

function App(props) {

  const  { auth } = props
  return (
    <>
     <BrowserRouter>
      { auth.isLoggedIn ? <Navbar /> :  <Header/> }
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path='/attendance' component={Attendance} />
          <Route path="/apply_leave" component={ApplyLeave} />
          <Route path="/tasks" component={Tasks} />
          <Route path="/team" component={Team} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/allEmployees" component={ViewEmployees} />
          <Route path="/leaves" component={ViewLeaves} />
          <Route path="/support" component={Support} />
          <Route path="/CreateTask" component={CreateTask} />
          <Route path="/announcement" component={Announcement}/>
     </BrowserRouter>
    </>
  );
}

const mapStateToProps =( state ) => {
  return {
      auth : state.auth
  }
}

export default connect(mapStateToProps)(App);
