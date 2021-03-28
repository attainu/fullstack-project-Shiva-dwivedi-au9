import React, { useEffect, useState } from 'react'
import {connect } from 'react-redux'
import './Team.css'

const role = sessionStorage.getItem("role")
const Emp_URL = "https://corpenviro-backend.herokuapp.com/api/auth/AllEmployees3?department=" + role

function Team(props) {

    const { user, fetchUser } = props
    const [team, setteam] = useState("")

    useEffect(() => {

        setInterval(()=> {
            fetch(Emp_URL)
            .then( res => res.json())
            .then( (data) =>{ setteam(data)})
        }, 500)
      
    },[])

    const renderTeams = (team) => {
        if(team) {
            return team.map((item => {
                return(
                    <tr>
                    { item._id !== user._id && <>
                          <td>{item.name}</td>
                              <td>{item.department}</td>
                              <td>{item.attendance.length}</td>
                              <td>{item.email}</td>
                              <td>{item.joining_Date}</td>
                              <td>{item.Employee_added_by}</td>
                              <td>{item.role}</td>
                              <td>{item.gender}</td>
                              <td>{item.contactnumber}</td></>
                    }</tr>
                )
            }))
        }
    }

    return (
        <>
         <div className="team">
                <h1>Team Diary</h1>
                <table class=" MyLeave table table-dark">
            <thead>
                            <tr>
                                <th scope="col">Name</th>
                                <th scope="col">Department</th>
                                <th scope="col">Attendance</th>
                                <th scope="col">E-mail</th>
                                <th scope="col">Joined on</th>
                                <th scope="col">Added By</th>
                                <th scope="col">Role</th>
                                <th scope="col">Gender</th>
                                <th scope="col">Contact Number</th>
                            </tr>

             </thead>
             <tbody>
                 {renderTeams(team)}
             </tbody>
             </table>
         </div>    
     </>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userProfile.user
    }
  }


export default connect(mapStateToProps)(Team)
