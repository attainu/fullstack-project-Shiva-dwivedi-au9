import axios from 'axios'
import AddUserType from '../Actions/AddUser/AddUserType'

const AddUserState = {
    loading : false,
    user : [],
    errors:""
}

export const AddUserReducer = ( state = AddUserState , action  ) => {
    switch (action.type) {
       
        case AddUserType.ADD_USER_SUCCESS:
            return {
                loading : false,
                user: action.payload,
                errors:''
            }

        case AddUserType.ADD_USER_FAIL:
            return {
                loading:false,
                user:[],
                errors:action.payload
            }
    
        default:
            return state;
    }
}

