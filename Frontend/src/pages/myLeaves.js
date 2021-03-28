import React, {Component } from 'react'
import { connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'
import LeavePolicy from './LeavePolicy'
import "./myLeave.css"

const myLeaveURL = "https://corpenviro-backend.herokuapp.com/api/auth/Leavebyemployee?User_id="

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

export class MyLeaves extends Component {
    
    constructor(props){

        super(props)
        this.state = {
            myLeaves : "",
            allowed:""
        }
        this.props.fetchUser()
        
    }
    renderLeaves = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <>
                            <tr>
                            <td>{item.Employee_name}</td>
                            <td>{item.Employee_division}</td>
                            <td>{item.Employee_department}</td>
                            <td>{item.Reason_for_leave}</td>
                            <td>{item.Leave_status}</td>
                            </tr>
                    </>
                )
            }
                
            )
        }
    }
   
    renderAllowed =(data) => {
        if(data){

            return data.map((item) => {
                return(
                    <div className="allowed-sub">
                        <h4>You are allowed to have {item.leaves} leaves per annum</h4>
                    </div>
                )
            })
        }
    }
    render() {
        console.log("allowed" , this.state.allowed
        )
        return (
            <div className="myLeave">
                 <LeavePolicy />
                {this.state.myLeaves.length >0 ? 
                    <>
                        <h2>Your Current Leaves</h2>

                        <table class=" MyLeave table table-dark">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Division</th>
                            <th scope="col">Department</th>
                            <th scope="col">Reason</th>
                            <th scope="col">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                              {this.renderLeaves(this.state.myLeaves)}
                        </tbody>
                    </table>
                        <div className="allowed">
                            {this.renderAllowed(this.state.allowed)}
                        </div>
                    </> : 
                    <h2>No Data Found</h2>}
            </div>
        )
    }
    componentDidMount(){

        const URL = myLeaveURL + this.props.user._id
        setInterval(() => {
            fetch(URL)
            .then(res => res.json())
            .then(data =>  this.setState({myLeaves:data}) )
        }, 1000)

        const allowedURL = "https://corpenviro-backend.herokuapp.com/api/auth/allowedLeave?role="

        const role = this.props.user.role
        const URL2 = allowedURL + role
        fetch(URL2)
        .then(res => res.json())
        .then(data => this.setState({allowed:data}))
      
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MyLeaves)
