import React, { useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import  {LoginAuthAction} from '../redux/Actions/Auth/AuthAction'
import ErrorHandler from '../components/errors/ErrorHandler'
import './Login.css'
import fetchUserSuccess from '../redux/Actions/UserProfile/UserActions'


function Login(props) {

    const { user , login, fetchUser } = props
    const [ errorHandler, setErrorHandler ] = useState({hasError : false , message:""})
    const [ userState, setUserState ] = useState({})
    const history = useHistory()

function email(event){
       
    const email = event.target.value
    setUserState({...userState , ...{email}})

}
function password(event){
    
    const password = event.target.value
    setUserState({...userState , ...{password}})
}

function Login(event){
   event.preventDefault()
    console.log(userState)
    console.log(user)
    login(userState , history , setErrorHandler)
    fetchUser()
}
    return (
        <div>
        <form onSubmit={Login}>
                    <div className="Logincontainer">
                        <h1>Welcome to CorpEnviro</h1>
                        
                        <input type="email" onChange={email}  placeholder="Enter Email" name="email" id="email" required />

                        <input type="password" onChange={password}  placeholder="Enter Password" name="psw" id="psw" required />

                        <ErrorHandler errorHandler={errorHandler} />
                        <hr/>

                        <button type="submit" className="Loginbtn">Login</button>
                    </div>
        </form>
    </div>
    )
}

const mapStateToProps =( state ) => {
    return {
        user : state.auth
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (userState, history , setErrorHandler) => {
            dispatch(LoginAuthAction(userState, history, setErrorHandler))
        },
        fetchUser :() => dispatch(fetchUserSuccess())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login)
