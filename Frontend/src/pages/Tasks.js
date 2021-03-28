import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions';

import './Task.css'

const DeptTask = "https://corpenviro-backend.herokuapp.com/api/auth/taskdetails1?Department="
const UpdateTask = "https://corpenviro-backend.herokuapp.com/api/auth/Taskstatus"
const TicketStatus = "https://corpenviro-backend.herokuapp.com/api/auth/taskdetails2?Status="
const token = localStorage.getItem("token")
const dept =  sessionStorage.getItem("role")

function Tasks(props) {

  const { user, fetchUser} = props
  const [ Task, setTask ] = useState("")
  const [ tickets, setTickets ] = useState("")
  const [ Remark , setRemark ] = useState("")
  const [ ticketstatus, setStatus ] = useState("")
  const id = Math.random() * (20000 - 10 + 1) + 10

  useEffect(() => {
 
         fetchUser()

         const taskByDept = DeptTask + dept
         setInterval(() => {

          fetch(taskByDept)
          .then(res => res.json())
          .then(data => setTask(data))

        }, 1000)
 
     },[])

     const remark = (e) => {
       setRemark(e.target.value)
     }

     const status = (e) => {
      const URL = TicketStatus + e.target.value
        fetch(URL)
      .then(res => res.json())
      .then(data => setTickets(data))
            
    }

    const deleteTask = (e) => {
      
      const delTaskURL = "https://corpenviro-backend.herokuapp.com/api/auth/Deletetask"
      fetch(delTaskURL, {
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
    }
  
  const renderTickets = (ticket) => {
    if(ticket) {
     return ticket.map((item=>{
       return(
         <div className="TL_Tickets">
         <div>
              <h4>{item.Task_name}</h4>
              <h5>Priority: {item.Priority}</h5>
              <h5>Deadline: {item.Deadline} Days</h5>
         </div>
          <div>
              <h5>Status: {item.Status}</h5>
              <h5>Completed By: {item.Task_completed_by}</h5>
              <h5>Department:{item.Department} </h5>
             {item.Remark? <h5>Remark: {item.Remark}</h5>:<h5>No Remarks Yet</h5>}
             <button value={item._id} onClick={deleteTask} className="deleteTaskBtn" ><i class="fas fa-trash-alt"></i></button>
          </div>
           
        
             
         </div>
       )
     }))
    }
  }

  const complete =(e) => {
    fetch(UpdateTask, {
      method: "PUT",
      headers:  {
            'Accept':'application/json',
            'Content-Type':'application/json',
            'x-access-token':token
         },
      body: JSON.stringify({
      _id:e.target.value,
      Task_completed_by: user.name,
      Remark:Remark,
      Status: "Completed",
      }),
  },1000)
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  
  const renderTasks = (task) =>{
    if(task){
      return task.map((item => {
        return(
          <div>
            {item.Status ==="Pending" && 
            
            <div className="task_details">
              <h5>#{item.id.toFixed(0)}</h5>
              <h4>{item.Task_name}</h4>
              <h5>Priority: {item.Priority}</h5>
              <h5>Created By : {item.Task_created_by}</h5>
              <h5>Deadline: {item.Deadline} Days</h5>
              <input onChange={remark} type="text" placeholder="Write your comment" />
              <button onClick={complete} value={item._id}>Mark as complete</button>
            </div>}
          </div>
        )
      }))
    }
    else{
      return( <center style={{color:"white"}}><h3>No Tickets For Now</h3></center>)
     
    }
  }

  return (
    <div className='tasks'>
      {user.role!=="TeamLead" ?<div>{renderTasks(Task)}</div>: 
      
      <div className="TL_Tasks">
        <h2>View All tickets here</h2>
        <select onChange={status} name="status" id="status" required> 
                                <option disabled selected>Ticket Status</option>
                                    <option value="Pending">Pending</option>
                                    <option value="Completed">Completed</option>
        </select>
        {renderTickets(tickets)}
      </div>}
      
    </div>
  );
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


export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
