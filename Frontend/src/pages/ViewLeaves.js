import React, {Component } from 'react'
import { connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'

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


const leaveReqURL = "https://corpenviro-backend.herokuapp.com/api/auth/leaverequests"
const updateStatusUrl = "https://corpenviro-backend.herokuapp.com/api/auth/updateleavestatus"
const token = localStorage.getItem("token")

class ViewLeaves extends Component {

    constructor(props){

        super(props)

        this.state = {

            leaveReq:""

        }
    }

    accept = (e) => {
        console.log(e.target.value)
        fetch(updateStatusUrl, {
            method: "PUT",
            headers:  {
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  'x-access-token':token
               },
            body: JSON.stringify({
            _id:e.target.value,
            Leave_status: "ACCEPTED",
            }),
        },1000)
            .then((response) => response.json())
            .then((json) => console.log(json));
        
    }

    reject = (e) => {
        console.log(e.target.value)
        fetch(updateStatusUrl, {
            method: "PUT",
            headers:  {
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  'x-access-token':token
               },
            body: JSON.stringify({
            _id:e.target.value,
            Leave_status: "CANCELLED",
            }),
        },1000)
            .then((response) => response.json())
            .then((json) => console.log(json));
    }

    renderAllLeaves =(data) =>{

        if(data){
            return data.map( item => {
              return(  <tr>
              { item.User_id !== this.props.user._id  && <>
                    <td>{item.Employee_name}</td>
                        <td>{item.Employee_division}</td>
                        <td>{item.Employee_department}</td>
                        <td>{item.Reason_for_leave}</td>
                        <td>{item.Leave_from}</td>
                        <td>{item.Leave_to}</td>
                        <td>
                        {item.Leave_status==="Pending" && <button value={item._id} onClick={this.accept} style={{backgroundColor:'green',color:'white',marginRight:'20px',marginTop:'6px',padding:'5px'}}>Accept</button>}
                        {item.Leave_status==="Pending" &&<button  value={item._id} onClick={this.reject} style={{backgroundColor:'red',color:'white',padding:'5px'}}>Reject</button>}
                        {item.Leave_status==="ACCEPTED" && <button  style={{backgroundColor:'green',color:'white',marginRight:'20px',marginTop:'6px',padding:'5px'}}>Accepted</button>}
                        {item.Leave_status==="CANCELLED" && <button  style={{backgroundColor:'red',color:'white',marginRight:'20px',marginTop:'6px',padding:'5px'}}>Cancelled</button>}
                        </td></>
              }  </tr>
              )
            })
        }
    }

    render() {

        return (
            <div className="myLeave">

            {this.state.leaveReq.length >0 ? 
                <>
                    <h2>All Leaves</h2>

                    <table class=" MyLeave table table-dark">
                    <thead>
                        <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Division</th>
                        <th scope="col">Department</th>
                        <th scope="col">Reason</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th className="action" scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                          {this.renderAllLeaves(this.state.leaveReq)}
                    </tbody>
                </table>
                </> : 
                <h2>No Data Found</h2>}
        </div>

        )
    }

    componentDidMount(){

        this.props.fetchUser()

        setInterval(() => {
            fetch(leaveReqURL)
            .then(res => res.json())
            .then(data =>  this.setState({leaveReq:data}) )
        }, 1000)
        
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ViewLeaves)