import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'
import axios from 'axios'
import './leave.css'
import MyLeaves from './myLeaves'

const applyLeaveURL = "https://corpenviro-backend.herokuapp.com/api/auth/Applyforleave"
const token = localStorage.getItem("token")

function ApplyLeave(props) {

    const { user, fetchUser } = props
    const userid = user._id
    const [ leaveData, setLeave ] = useState({
        User_id : user._id,
        Employee_department : user.department,
        Employee_division : user.role,
        Employee_name : user.name
    })

    useEffect(() => {

        fetchUser()

    },[])

    const name = (e) => {

        const Employee_name = e.target.value
        setLeave({...leaveData , ...{Employee_name}})

    }

    const division = (e) => {

        const Employee_division = e.target.value
        setLeave({...leaveData , ...{Employee_division}})
        
    }

    const department = (e) => {

        const Employee_department = e.target.value
        setLeave({...leaveData , ...{Employee_department}})
        
    }

    const reason = (e) => {

        const Reason_for_leave = e.target.value
        setLeave({...leaveData , ...{Reason_for_leave}})
        
    }

    const leaveFrom = (e) => {

        const Leave_from = e.target.value
        setLeave({...leaveData , ...{Leave_from}})
        
    }

    const leaveTo = (e) => {

        const Leave_to = e.target.value
        setLeave({...leaveData , ...{Leave_to}})
        
    }

    const userID = (e) => {

        const User_id = e.target.value
        setLeave({...leaveData , ...{User_id}})
        
    }

    console.log("leavedata" , leaveData)

    const ApplyLeave = (e) => {

        e.preventDefault()
       console.log("leavedata" , leaveData)

       axios.post(applyLeaveURL , leaveData, {
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json',
            'x-access-token':token
        }
       })
       .then((res) => console.log(res))
       setLeave("")
    }


    return (
        <div>

            <MyLeaves />
            <form onSubmit={ApplyLeave}>

                            <div className="applyLeave">

                                <h2>Apply for Leave</h2>

                            <div>

                                <input type="text" onLoad={name} placeholder="Enter Name" value={user.name} name="Employee_name" id="Employee_name" required />

                                <input type="text" onSubmit={division} placeholder="Enter your division" defaultValue={user.role} name="Employee_division" id="Employee_division" required />

                                <input type="text" onSubmit={department} placeholder="Enter your department" defaultValue = {user.department} name="Employee_department" id="Employee_department" required />

                                <label htmlFor="From?">From?</label>
                                <input type="date" onChange={leaveFrom} placeholder="From?" name="Leave_from" id="Leave_from" required />

                                <label htmlFor="To?">To?</label>
                                <input type="date" onChange={leaveTo} placeholder="To?" name="Leave_to" id="Leave_to" required />

                                <input type="text" onSubmit={userID} placeholder="Enter your userID" defaultValue={user._id} name="User_id" id="User_id" required />
                            
                            </div>

                                <input type="text" height="100" width="500" onChange={reason} placeholder="Enter your Reason for applying the leave"  name="Reason_for_leave" id="Reason_for_leave" required />
                                
                                <button type="submit" class="leaveBtn">Apply for Leave</button>
                           
                            </div>

                </form>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        user : state.userProfile.user
    }
}
const mapDispatchToProps = dispatch => {
    return {
        fetchUser : ( )=> dispatch(fetchUserSuccess())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ApplyLeave)
