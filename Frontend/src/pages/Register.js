import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import ErrorHandler from '../components/errors/ErrorHandler'
import AddUserSuccess from '../redux/Actions/AddUser/AddUserActions'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'

import './Register.css'

function Register(props) {

    const { user, AddUser, fetchUser } = props
    const [ errorHandler , setError ] = useState({hasError: false , message:""})
    const [ addUser , setAddUser ] =useState({})
    const history = useHistory()
    
    useEffect(() => {

        fetchUser()

    },[])

    const name = ( event) => {
        const name = event.target.value
        setAddUser({...addUser , ...{name}})
    }
    const email = (event ) => {
        const email = event.target.value
        setAddUser({...addUser , ...{email}})
    }
    const password = (event ) => {
        const password = event.target.value
        setAddUser({...addUser , ...{password}})
    }
    const role = (event ) => {
        const role = event.target.value
        setAddUser({...addUser , ...{role}})
    }

    const department = (event) => {
        const department = event.target.value
        setAddUser({...addUser, ...{department}})
    }

    const onValueChange = (event)=> {
        const gender = event.target.value
        setAddUser({
          ...addUser , ...{gender}
        });
      }

    const number = (event) => {
        const contactnumber = event.target.value
        setAddUser({...addUser, ...{contactnumber}})
    }
    
    const who = (event) => {
        const Employee_added_by = event.target.value
        setAddUser({...addUser, ...{Employee_added_by}})
    }
    const date = (event) => {
        const joining_Date = event.target.value
        setAddUser({...addUser, ...{joining_Date}})
    }
    const register = (event ) => {
        console.log("adding",addUser)
        event.preventDefault()
        AddUser( addUser,history,setError )
    }
    return (
        
        <div>
            { user.role == "HR" ? 
            <form onSubmit={register}>
                            <div className="register">
                            
                                <input type="text" onChange={name} placeholder="Enter Name" name="name" id="name" required />
                                <input type="email" onChange={email} placeholder="Enter Email" name="email" id="email" required />
                                <input type="password" onChange={password} placeholder="Enter Password" name="password" id="password" required />
                            
                                <select onChange={role} name="role" id="role">
                                    <option disabled selected>Choose Role</option>
                                    <option value="User">User</option>
                                    <option value="HR">HR</option>
                                    <option value="TeamLead">TeamLead</option>
                                </select>

                                <select onChange={department} name="department" id="department"> 
                                <option disabled selected>Choose Department</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                </select>

                                <div className="Gender">
                                <p>Please select the gender:</p>
                                    <input type="radio" id="male" name="gender" value="male" onChange={onValueChange} />
                                    <label for="male">Male</label><br/>
                                    <input type="radio" id="female" name="gender" value="female" onChange={onValueChange} />
                                    <label for="female">Female</label><br/>
                                    <input type="radio" id="other" name="gender" value="other" onChange={onValueChange} />
                                    <label for="other">Other</label>
                                    <br/>
                                </div>
                               

                                <input onChange={number} type="number" placeholder="Enter contact number" name="contactnumber" id="contactnumber" required />
                                <input onChange={date} type="date" placeholder="Enter Joining Date" name="joining_Date" id="joining_Date" />
                                <input onChange={who} type="text" placeholder="Who's adding the employee?" name="Employee_added_by" id="Employee_added_by"/>
                                
                                <ErrorHandler errorHandler = {errorHandler} />
                                <button type="submit" class="registerbtn">Add User</button>
                            </div>

                            <div class="container signin">
                            </div>
                </form> :
                <h2>You don't have access to add a user</h2>
             }
             
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
        fetchUser : ( )=> dispatch(fetchUserSuccess()),
        AddUser : (addUser , history , setError) => dispatch(AddUserSuccess(addUser , history , setError ))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Register)
