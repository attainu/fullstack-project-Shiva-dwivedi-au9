import React , { useEffect } from 'react'
import {Link} from 'react-router-dom'
import { connect } from 'react-redux'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'
import './Profile.css'
import DisplayAnnouncement from './DisplayAnnouncement'
import FilterByGender from './FilterByGender'

function UserProfile(props) {

    const { user, fetchUser } = props

    useEffect(() => {
        
        fetchUser()

    },[])
    
    return  (

        <div>
            {/* <h1 className="UserTitle">User Profile</h1> */}
            <div className="profile">
                    <h4><span className="name">Name : </span>{user.name}</h4>
                    <h4><span className="gender">Gender :</span>{user.gender}</h4>
                    <h4><span className="dept">Department :</span>{user.department}</h4>
                    <h4><span className="added">Added by : </span>{user.Employee_added_by}</h4>
                    <h4><span className="joined">Joined on : </span>{user.joining_Date}</h4>
                    <h4><span className="contact">Contact info: </span>{user.contactnumber} </h4>
                    <h4><span className="role">Role :</span>{user.role} </h4>
                {/* <button><i class="fa fa-pencil"></i>Edit Profile</button> */}
             </div>
             <div className="display">
                 <FilterByGender />
                <h3>Important Announcements</h3>
                <DisplayAnnouncement/>
             </div>
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
        fetchUser : () => dispatch(fetchUserSuccess())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
