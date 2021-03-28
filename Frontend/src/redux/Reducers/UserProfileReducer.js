import axios from 'axios'
import UserActionType from '../Actions/UserProfile/UserActionType'

const userInfo = "https://corpenviro-backend.herokuapp.com/userinfo"
const token = localStorage.getItem("token")

const ProfileState = {
    loading : false,
    user : [],
    errors:""
}

export const UserProfileReducer = ( state = ProfileState , action  ) => {
    switch (action.type) {
       
        case UserActionType.FETCH_USER_SUCCESS:
            return {
                loading : false,
                user: action.payload,
                errors:''
            }

        case UserActionType.FETCH_USER_FAIL:
            return {
                loading:false,
                user:[],
                errors:action.payload
            }
    
        default:
            return state;
    }
}

