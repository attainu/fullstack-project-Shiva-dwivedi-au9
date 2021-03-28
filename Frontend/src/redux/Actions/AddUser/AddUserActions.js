import axios from 'axios'
import AddUserType from './AddUserType'

const register = "https://corpenviro-backend.herokuapp.com/api/auth/register"

const AddUserSuccess =  ( addUser , history, setError ) => {

    return async (dispatch) => {

        try {

            const res = await axios.post(register , addUser)
            const { data } = res
            console.log("add",data)
            dispatch({ type:AddUserType.ADD_USER_SUCCESS , payload : data })
            // history.push("/home")
            setError(
                {
                    hasError:true,
                    message:data.err || data.succ
                }
            )
            history.push("/allEmployees")
        }
         catch (error) {
            if(error.response) {
                console.error(error.response.data.error)
                dispatch( { 
                    type:AddUserType.ADD_USER_FAIL ,
                    payload: error.response.data.error })
            }
        }
    }
}


export default AddUserSuccess