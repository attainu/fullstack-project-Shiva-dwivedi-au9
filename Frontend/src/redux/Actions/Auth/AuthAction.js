import AuthActionType from './Action_type'
import axios from 'axios'
import UserActionType from '../UserProfile/UserActionType'
import fetchUserSuccess from '../UserProfile/UserActions'

const Login_url = "https://corpenviro-backend.herokuapp.com/api/auth/login"

const LoginAuthAction =  ( userState , history, setErrorHandler ) => {

    return async (dispatch) => {

        try {

            const res = await axios.post(Login_url , userState)
            const { data } = res
            console.log(data)
            dispatch({ type:AuthActionType.LOGIN_SUCCESS , payload : data })
            history.push("/home")
            window.location.reload()
            localStorage.setItem("token" , data.token)
        }
         catch (error) {
            if(error.response) {
                console.error(error.response.data.error)
                dispatch( { 
                    type:AuthActionType.LOGIN_FAIL ,
                    payload: error.response.data.error })
            }
           setErrorHandler(
               {
                   hasError:true,
                   message:error.response.data.error
               }
           )
        }
    }
}

const LogoutAuthAction =  ( history) => {

    return (dispatch) => {

        try {
            dispatch({ type:AuthActionType.LOGOUT_SUCCESS , payload : {} })
            history.push("/login")

            localStorage.removeItem("token")
            localStorage.removeItem("auth")
            sessionStorage.removeItem("role")
            dispatch({ type: UserActionType.FETCH_USER_SUCCESS , payload:{} })
        } catch (error) {
            
            console.error(error)
            dispatch( { type:AuthActionType.LOGOUT_FAIL ,payload: {}})
        }
    }
}

export { LoginAuthAction , LogoutAuthAction }