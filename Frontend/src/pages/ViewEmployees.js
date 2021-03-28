import React, { useEffect, useState } from 'react'
import {connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'
import './ViewEmp.css'
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';


const Emp_URL = "https://corpenviro-backend.herokuapp.com/api/auth/Allemployees"
const token = localStorage.getItem("token")
const updateURL = "https://corpenviro-backend.herokuapp.com/api/auth/updateemployeedetails"

function ViewEmployees(props) {

    const { user, fetchUser } = props
    const [employee, setEmployee] = useState("")
    const [open, setOpen] = useState(false);
    const [ emp, setEmp] = useState({})
    
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    useEffect(() => {

        fetchUser()
        setInterval(() => {
            fetch(Emp_URL)
            .then( res => res.json())
            .then( (data) =>{ setEmployee(data)})
    
        }, 1000)
        
    },[])

    const name = ( event) => {
        const name = event.target.value
        setEmp ({...emp , ...{name}})
    }
    const email = (event ) => {
        const email = event.target.value
        setEmp ({...emp , ...{email}})
    }
   
    const role = (event ) => {
        const role = event.target.value
        setEmp ({...emp , ...{role}})
    }

    const department = (event) => {
        const department = event.target.value
        setEmp ({...emp, ...{department}})
    }

    const number = (event) => {
        const contactnumber = event.target.value
        setEmp ({...emp, ...{contactnumber}})
    }
    
    const update = (event ) => {
        console.log("adding",emp)
        event.preventDefault()
        fetch(updateURL, {
            method: "PUT",
            headers:  {
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  'x-access-token':token
               },
            body: JSON.stringify(emp),
        },1000)
            .then((response) => response.json())
            .then((json) => console.log(json));
            onCloseModal()
    }

    const edit = (e) => {
        const empURL = "https://corpenviro-backend.herokuapp.com/api/auth/Allemployees2?_id=" + e.target.value
        console.log(empURL)
        fetch(empURL)
        .then(res => res.json())
        .then((data) => {setEmp(data)})
        onOpenModal()
    }

    const deleted = (e) => {
        const delURL = "https://corpenviro-backend.herokuapp.com/api/auth/Deleteemployee"
                fetch(delURL, {
                method: "DELETE",
                headers:  {
                      'Accept':'application/json',
                      'Content-Type':'application/json',
                      'x-access-token':token
                   },
                body: JSON.stringify({
                    _id:e.target.value
                }),
            },1000)
                 alert("Do you really want to delete this user?")

    }

    

    const renderEmployees = (employee) => {
        if(employee) {
        
            return employee.map((item => {
                return(
                    <tr>
                    { item._id !== user._id && <>
                          <td>{item.name}</td>
                              <td>{item.department}</td>
                              <td>{item.attendance.length}</td>
                              <td>{item.email}</td>
                              <td>{item.Employee_added_by}</td>
                              <td>{item.role}</td>
                              <td>{item.gender}</td>
                              <td>{item.contactnumber}</td>
                              <td>
                                <button value={item._id} onClick={edit} className="edit"><i class="fas fa-user-edit"></i></button>
                                <button value={item._id} onClick={deleted} className="delete"><i class="fas fa-trash-alt"></i></button>
                              </td></>
                    }  </tr>
                )
            }))
        }
    }

    return (
        <>
        { user.role === "HR" || user.role=== "TeamLead"?  <div className="employee">
        <table class=" MyLeave table table-dark">
            <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Department</th>
                            <th scope="col">Attendance</th>
                            <th scope="col">E-mail</th>
                            <th scope="col">Added By</th>
                            <th scope="col">Role</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Contact Number</th>
                            <th className="action" scope="col">Action</th>
                            </tr>

             </thead>
             <tbody>
                 {renderEmployees(employee)}
             </tbody>
        </table>
        <Modal open={open} onClose={onCloseModal} center>
        <form onSubmit={update}>
                            <div className="update">
                                <h2>Update a User</h2>
        
                                <input type="text" onChange={name} placeholder="Enter Name" value={emp.name} name="name" id="name" required />
                                <input type="email" onChange={email} value={emp.email} placeholder="Enter Email" name="email" id="email" required />
                                <select value={emp.role} onChange={role} name="role" id="role">
                                    <option disabled selected>Choose Role</option>
                                    <option value="User">User</option>
                                    <option value="HR">HR</option>
                                    <option value="TeamLead">TeamLead</option>
                                </select>

                                <select value={emp.department} onChange={department} name="department" id="department"> 
                                <option disabled selected>Choose Department</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                                </select>

                                <input onChange={number} value={emp.contactnumber} type="number" placeholder="Enter contact number" name="contactnumber" id="contactnumber" required />
                                {/* <ErrorHandler errorHandler = {errorHandler} /> */}
                                <button type="submit" class="registerbtn">Update User</button>
                            </div>

                            <div class="container signin">
                            </div>
                </form> 
      </Modal>
    </div>:<h2>You don't have access to this page</h2>}
       </>
    )
}

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

export default connect(mapStateToProps,mapDispatchToProps)(ViewEmployees)
