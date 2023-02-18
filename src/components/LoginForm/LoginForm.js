import { useState } from "react"
import Loader from "../Loader/Loader"
import Swal from 'sweetalert2'
import app from "../../fb"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'
import {getFirestore, setDoc, doc} from 'firebase/firestore'


//Initalize Firebase
const auth = getAuth(app)

//Initialize Cloud Firestore and get reference to the service
const db = getFirestore(app)

export default function LoginForm () {

    //STATES
    const [isLogging, setIsLogging] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    //FUNCTIONS
    const createUser = (user, password) => {

        //Calls Firebase function passing auth object and user data
        createUserWithEmailAndPassword(auth, user.email, password)
            .then(()=>{

                //Calls function to create user in Firestore db 
                createUserInDb(user)
            })
            .catch(err=>{

                setIsLoading(false)
                //Sweet alert for errors
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

        //Calls Firebase function to sign in
        signInWithEmailAndPassword(auth,email, password)
            .catch(err=>{

                //If error is catched, sets loader to false and shows error in alert
                setIsLoading(false)
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

        //Turns Loader on
        setIsLoading(true)

        //Gets information from form
        const email = e.target.email.value
        const password = e.target.password.value

        //Calls proper function depending on state
        if(!isLogging){

            //Gets values from form to create user object
            const username = e.target.username.value
            const lastname = e.target.lastname.value
            const employeeId = e.target.employeeId.value

            const user = {email, username, lastname, employeeId}
            createUser(user, password)

        }else{
            userLogin(email, password)
        }

    }

    const createUserInDb = (user) =>{

        //Creates doc for user with email as identifier
        setDoc(doc(db, 'users', user.email), user)

            //If error is thrown
            .catch(err=>{
                setIsLoading(false)
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


    return(
        <div className="login-main-container d-flex justify-content-center align-items-center">
            {isLoading && <Loader/>}

            <div className="col-4 login-form-container h-auto d-flex flex-column align-items-center">
                <>
                <h3>{isLogging ? 'Welcome' : 'Register'}</h3>
                <form className="login-form" onSubmit={submitHandler}>
                    <label>
                        <input type='text' placeholder='name@you.com' name="email" autoComplete="on"/>
                    </label>
                    <label>
                        <input type='password' placeholder='Password' name="password" autoComplete="current-password"/>
                    </label>
                    {!isLogging &&
                    <>
                    <label>
                        <input type='text' placeholder='Name' name="username"/>
                    </label>
                    <label>
                        <input type='text' placeholder='Lastname' name="lastname"/>
                    </label>
                    <label>
                        <input type='text' placeholder='Your Employee ID' name="employeeId"/>
                    </label>
                    </>
                    }
                    <button className="login-btn btn btn-primary">{isLogging ? 'Log In' : 'Sign Up'}</button>
                </form>
                <div className="login-footer">
                    <p>{isLogging ? 'Need an account?  ' : 'Already have an account?  '}</p>
                    <button className="btn btn-light" onClick={()=>{setIsLogging(!isLogging)}}>{isLogging ? 'Sign Up' : 'Log In'}</button>
                </div>

                </>  
            </div>
        </div>
    )
}