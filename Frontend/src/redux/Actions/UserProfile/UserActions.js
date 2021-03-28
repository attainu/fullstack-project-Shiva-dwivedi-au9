import axios from 'axios'
import UserActionType from './UserActionType'

const userInfo = "https://corpenviro-backend.herokuapp.com/api/auth/userinfo"
const token = localStorage.getItem("token")

const fetchUserSuccess = (user) => {
    return async(dispatch) => {

        try {
            
            const res = await axios.get( userInfo , {
                headers:{
                  'Accept':'application/json',
                  'Content-Type':'application/json',
                  'x-access-token':token
              }
               })
               const { data } = res
               dispatch({type: UserActionType.FETCH_USER_SUCCESS , payload:data})
        } 
        catch (error) {
            if(error.response){
                dispatch( {
                    type : UserActionType.FETCH_USER_FAIL,
                    payload:error.response
                })
            }
        }
    }
}

// const fetchUserFail = error => {
//     return {
//         type : UserActionType.FETCH_USER_FAIL,
//         payload: error
//     }
// }

export default fetchUserSuccess