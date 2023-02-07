import { useState } from "react"
import Swal from 'sweetalert2'
import app from "../../fb"
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'

//Initalize Firebase
const auth = getAuth(app)

export default function LoginForm () {

    //STATES
    const [isLogging, setIsLogging] = useState(true)
    // const [userCreated, setUserCreated] = useState(null)


    //FUNCTIONS
    const createUser = (user) => {
        // const user = userCreated
        console.log(user)
        // console.log(user)
        //Calls FIrebase function passing auth object and user data
        createUserWithEmailAndPassword(auth, user.email, user.password)
            .then(res=>{
                // setUserCreated(res.user)
                fillUserData(user)
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
            .then(res=>{

                console.log(res)
                // console.log(setUserCreated())
                // setUserCreated(res)
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


    const submitHandler = (e) => {

        //Prevents browser from refreshing
        e.preventDefault()

        //Gets information from form
        const email = e.target.email.value
        const password = e.target.password.value

        //Calls proper function depending on state
        if(!isLogging){

            const username = e.target.username.value
            const lastname = e.target.lastname.value
            const employeeId = e.target.employeeId.value

            const user = {email, password, username, lastname, employeeId}
            // setUserCreated(user)
            createUser(user)

        }else{
            userLogin(email, password)
        }

        // sessionStorage.setItem('activeUser', JSON.stringify(userInfo))
    }

    const fillUserData = () =>{

        //Prevents browser from refreshing
        // e.preventDefault()

        //Gets information from form
        // const email = userCreated
        // const username = e.target.username.value
        // const lastname = e.target.lastname.value
        // const employeeId = e.target.employeeId.value

        // const userInfo ={email, username, lastname, employeeId}
        // console.log(userInfo)
        // sessionStorage.setItem('activeUser', JSON.stringify(userInfo))
        // const caca = sessionStorage.getItem('activeUser')
        // console.log(caca)

    }

    return(
        <>
        <div className="login-main-container d-flex justify-content-center align-items-center">
            <div className="col-4 login-form-container h-auto d-flex flex-column align-items-center">

                {/* {!userCreated ?  */}
                    <>
                    <h3>{isLogging ? 'Welcome' : 'Register'}</h3>
                    <form className="login-form" onSubmit={submitHandler}>
                        <label>
                            <input type='text' placeholder='name@you.com' name="email"/>
                        </label>
                        <label>
                            <input type='password' placeholder='Password' name="password"/>
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
                    {/* </> :
                    <>
                    <h3>Please enter your information</h3>
                    <form className="login-form" onSubmit={fillUserData}>
                        <label>
                            <input type='text' placeholder='Name' name="name"/>
                        </label>
                        <label>
                            <input type='text' placeholder='Lastname' name="lastname"/>
                        </label>
                        <label>
                            <input type='text' placeholder='Your Employee ID' name="employeeId"/>
                        </label>
                        <button className="login-btn btn btn-primary">Submit</button>
                    </form>
                    </>
                } */}
                    
            </div>
        </div>
        </>
    )
}