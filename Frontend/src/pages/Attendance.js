import React, { Component } from 'react'
import { connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'
import './Attendance.css'

const Attendance_url = "https://corpenviro-backend.herokuapp.com/api/auth/markAttendance"
const UserInfo = "https://corpenviro-backend.herokuapp.com/api/auth/userinfo"
const TL_Attendance = "https://corpenviro-backend.herokuapp.com/api/auth/employeattendence"
const create_TL = "https://corpenviro-backend.herokuapp.com/api/auth/markTLAttendance"
const token = localStorage.getItem("token")
const valid = sessionStorage.getItem("date")
const count_att = localStorage.getItem("count")

let today = new Date();
let 
date=today.getFullYear() +"-"+ parseInt(today.getMonth()+1) + "-"+ today.getDate() ;

const mapStateToProps = state => {
  return {
      user : state.userProfile.user
  }
}
const mapDispatchToProps = dispatch => {
  return {
      fetchUser : () => dispatch(fetchUserSuccess())
  }
}

export class Attendance extends Component {

  constructor(props){
    super(props)

    this.state={
      Attendance:"",
      marked:false,
      count:"",
      emp_count:""
    }

    this.props.fetchUser()
    this.submitAttendance = this.submitAttendance.bind(this)
    this.renderAttendance = this.renderAttendance.bind(this)
    this.createAttendance = this.createAttendance.bind(this)
  }

  submitAttendance(e){
    
    fetch(Attendance_url ,
      {
        method:"PATCH",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'x-access-token':token

        }
      })
      this.setState({marked:true})
  }

  createAttendance(e){
    // this.setState({count:this.state.count + 1})
    // localStorage.setItem("count" , this.state.count)
    fetch(create_TL ,
      {
        method:"PATCH",
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'x-access-token':token
        }
      })
  }

  renderAttendance =(data) => {
   
    if(data){
      const _date = this.props.user.attendance.find(_date_ => _date_.date == date)
      console.log(JSON.stringify(_date))
      sessionStorage.setItem("date" , JSON.stringify(_date))
      return (
        <h2 className="count">{(((data.attendance.length)/(count_att))*100).toFixed(2)}%</h2>
      )
    }
   
  }

  renderTLAttendance = (data) => {
    if(data) {
      return data.map((item => {
        return(
          <div>
            <h2>{item.Attendence.length}</h2>
            {localStorage.setItem("count" , item.Attendence.length )}
          </div>
        )
      }))
    }
  }

  render() {

    return (
      <div className="attendance">
      { this.props.user.role !== "TeamLead" ?
        <><div className="showCount">
            <h2>Your Current Attendance is:</h2>
           {this.renderAttendance(this.state.Attendance)}
           <h2>Total Created Attendance :{this.renderTLAttendance(this.state.count)}</h2>
        </div>

        <div className="markat">
        { valid !== null || valid !== undefined || this.state.marked ? 
        <div className="markedAttendance">
          <h2>You have already marked your attendance for the day</h2>
          <button disabled>Already Marked</button>
        </div> : 
        <div className="markAttendance">
          <h2 >Mark your attendance here</h2>
          <button onClick={this.submitAttendance}>Submit Attendance</button>
         </div> 
           }  
        </div></> : <div className="Create_attendance">
          <h2 className="TL_attendance">Create Attendance</h2>
          <button onClick={this.createAttendance}>Create Attendance</button>
          <h4 style={{color:"aliceblue"}}>Created attendance count : {this.renderTLAttendance(this.state.count)} </h4>
        </div>
      }
        
        
      </div>
    )
  }

  componentDidMount(){
    setInterval(() => {
      fetch(UserInfo, {
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
          'x-access-token':token
      }
       })
       .then((res) => res.json())
       .then(data => this.setState({Attendance:data}))
    }, 1000)
    
    setInterval(() => {
        fetch(TL_Attendance)
      .then( res => res.json())
      .then(data => this.setState({count:data}))
    }, 1000)

  }

}

export default connect(mapStateToProps,mapDispatchToProps)(Attendance)
