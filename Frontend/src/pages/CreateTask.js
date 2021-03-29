import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import './CreateTask.css'

import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'

const TaskURL = "https://corpenviro-backend.herokuapp.com/api/auth/createtask"
const token = localStorage.getItem("token")

function CreateTask(props) {

    const { user, fetchUser} = props
    const [ addTask , setAddTask ] =useState({})

    useEffect(() => {

        fetchUser()

    },[])

    const name = ( event) => {
        const Task_name = event.target.value
        setAddTask({...addTask , ...{Task_name}})
    }

    const createdBy = (event) => {
        const Task_created_by = event.target.value
        setAddTask({...addTask, ...{Task_created_by}})
    }

    const department = (event) =>{
        const Department = event.target.value
        setAddTask({...addTask, ...{Department}})
    }

    const deadline = (event) => {
        const Deadline = event.target.value
        setAddTask({...addTask, ...{Deadline}})
    }

    const priority = (event) => {
        const Priority = event.target.value
        setAddTask({...addTask, ...{Priority}})
    }

    const createTask =(e) => {
        e.preventDefault()
        axios.post(TaskURL , addTask, {
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
                'x-access-token':token
            }
           })
           
           .then((res) => console.log(res))
           alert("Task has been created successfully")
           addTask({})
    }

    return (
        <div className="create_task">
            { user.role === "TeamLead" ? <div className="createTask">
                <form onSubmit={createTask}>

                    <div>
                    <label htmlFor="Task_name">Task Name</label>
                    <input type="text" onChange={name} placeholder="Tagline for Task" name="Task_name" id="Task_name" required />
                    </div>
                   
                    <div>
                    <label htmlFor="Task_created_by">Task Created By</label>
                    <input type="text" onChange={createdBy} placeholder="Who's creating the Task" name="Task_created_by" id="Task_created_by" required />
                    </div>
                   

                    <select onChange={department} name="Department" id="Department" required> 
                                <option disabled selected>Choose Department</option>
                                    <option value="IT">IT</option>
                                    <option value="HR">HR</option>
                                    <option value="Frontend">Frontend</option>
                                    <option value="Backend">Backend</option>
                    </select>

                    <div>
                    <label htmlFor="Deadline">Deadline in Days</label>
                    <input type="number" onChange={deadline} placeholder="Deadline?" name="Deadline" id="Deadline" required />
                    </div>
                    

                    <select onChange={priority} name="Priority" id="Priority" required> 
                                <option disabled selected>Choose Priority</option>
                                    <option value="Urgent">URGENT</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Normal">Normal</option>
                    </select>

                    <div>
                    <button type="submit">Create Task</button>
                    </div>
                   
                </form>
            </div>
             : <center><h2 style={{color:'white'}} >You don't have access to this page</h2></center> }
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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CreateTask)
