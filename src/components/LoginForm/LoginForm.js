import { useState } from "react"
import Swal from 'sweetalert2'
import app from "../../fb"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

//Initalize Firebase
const auth = getAuth(app)

export default function LoginForm () {

    //STATES
    const [isLogging, setIsLogging] = useState(true)


    //FUNCTIONS
    const createUser = (email, password) => {

        //Calls FIrebase function passing auth object and user data
        createUserWithEmailAndPassword(auth, email, password)
            .then(res=>{
                console.log(res.user)
            })
            .catch(err=>{
                Swal.fire({
                    title: 'Oops!',
                    text: err.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    buttonsStyling: false,
                    customClass:{
                        confirmButton: 'btn btn-primary alert-btn',
                        popup: 'alert-container'
                    }
                })
            })

    }

    const userLogin = (email, password) => {
        signInWithEmailAndPassword(auth,email, password)
            .catch(err=>{
                Swal.fire({
                    title: 'Oops!',
                    text: err.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                    buttonsStyling: false,
                    customClass:{
                        confirmButton: 'btn btn-primary alert-btn',
                        popup: 'alert-container'
                    }
                })
            })
    }

    const submitHandler = (e) => {

        //Prevents browser from refreshing
        e.preventDefault()

        //Gets information from form
        const email = e.target.email.value
        const password = e.target.password.value

        //Calls proper function depending on state
        if(!isLogging){
            createUser(email, password)
        }else{
            userLogin(email, password)
        }
    }

    return(
        <>
        <div className="login-main-container d-flex justify-content-center align-items-center">
            <div className="col-4 login-form-container h-auto d-flex flex-column align-items-center">
                <h3>{isLogging ? 'Welcome' : 'Register'}</h3>
                <form className="login-form" onSubmit={submitHandler}>
                    <label>
                        <input type='text' placeholder='name@you.com' name="email"/>
                    </label>
                    <label>
                        <input type='password' placeholder='Password' name="password"/>
                    </label>
                    <button className="login-btn btn btn-primary">{isLogging ? 'Log In' : 'Sign Up'}</button>
                </form>
                <div className="login-footer">
                    <p>{isLogging ? 'Need an account?  ' : 'Already have an account?  '}</p>
                    <button className="btn btn-light" onClick={()=>{setIsLogging(!isLogging)}}>{isLogging ? 'Sign Up' : 'Log In'}</button>
                </div>
            </div>
        </div>
        </>
    )
}