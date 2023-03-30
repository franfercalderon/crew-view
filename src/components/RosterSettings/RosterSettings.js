import { AppContext } from "../../context/AppContext"
import { useContext } from "react"
import { useEffect, useState } from "react"
import WidgetLoader from "../WidgetLoader/WidgetLoader"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from "@fortawesome/free-solid-svg-icons"
// import ActivityModels from "../../assets/rosters/activityModels"
import { getFirestore, collection, getDocs} from 'firebase/firestore'
import app from "../../fb"
import Select from 'react-select'


//Initialize firestore
const db = getFirestore(app)

export default function RosterSettings ({setRosterSettings}) {

    //CONTEXT
    const {addZero, capitalizeWords} = useContext(AppContext)

    //STATES
    const [allEmployees, setAllEmployees] = useState(null)
    // const [activityModels, setActivityModels] = useState(null)
    // const [rosterDate, setRosterDate] = useState(null)
    // const [employeeMatch, setEmployeeMatch] = useState(null)
    const [activeSection, setActiveSection] = useState('employee')
    const [employeeList, setEmployeeList] = useState(allEmployees)
    const [selectedUser, setSelectedUser] = useState(null)
    const [selectedDate, setSelectedDate] = useState({year:null, month: null})
    const [selectedAircrafts, setSelectedAircrafts] = useState([])
    const [aircrafts, setAircrafts] = useState(null)

    //VARIABLES
    const monthsOptions = [
        {value:'0', label: 'January'},
        {value:'1', label: 'February'},
        {value:'2', label: 'March'},
        {value:'3', label: 'April'},
        {value:'4', label: 'May'},
        {value:'5', label: 'June'},
        {value:'6', label: 'July'},
        {value:'7', label: 'August'},
        {value:'8', label: 'September'},
        {value:'9', label: 'October'},
        {value:'10', label: 'November'},
        {value:'11', label: 'December'}
    ]

    const yearsOptions = ()=>{

        //Gets current year based on current date
        const currentYear = new Date().getFullYear()

        return(
            [   
                {value: currentYear, label: `${currentYear}`},
                {value: currentYear+1, label: `${currentYear +1}`},
                {value: currentYear+2, label: `${currentYear +2}`}
            ]
        )
    }

    const selectStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            color: 'red',
            borderColor:  '#a4a4a4',
            boxShadow: state.isFocused && 'none',
            "&:hover": {
                boxShadow: "none"
            }
          })
    }
    
    //FUNCTIONS

    //Search input handler
    const handleInput = (e) =>{

        //Gets searched value from input
        const keyword = e.target.value

        if(keyword.length > 0){

            //Filters employee array looking for name/lastname or employeeId and returns coincidences
            const userMatch = allEmployees.filter(employee=>{
                return (employee.employeeId.includes(keyword) ||
                        employee.lastname.toLowerCase().startsWith(keyword.toLowerCase()) ||
                        employee.username.toLowerCase().startsWith(keyword.toLowerCase())
                        )
            })

            if(userMatch.length>0){
                //IF there are results matching, sets results in state
                setEmployeeList(userMatch)
            }
                
        }
        else{
            setEmployeeList(allEmployees)
        }
    }

    //Users section handlers

    const handleSelectUser = (user)=>{
        setSelectedUser(user)
        setActiveSection('dates')
    }

    const handleClearUser = () =>{
        setActiveSection('employee')
        setSelectedUser(null)
        setSelectedDate({month:null, year:null})
    }

    //Dates section handlers

    const handleClearDates = ()=>{
        setActiveSection('dates')
        setSelectedDate({month:null, year:null})
        setSelectedAircrafts([])
    }

    //Aircrafts section handlers
    const handleCheckbox = (e)=>{

        //Gets value from checkbox
        const aircraft = JSON.parse(e.target.value)
        const isChecked = aircraft.checked

        //Maps the current aircraft array and looks for a matching id. 
        const updatedArray = aircrafts.map(data=>{
            if(data.id === aircraft.id){
                //Changes 'checked' property to the opposite
                return{...data,checked: !isChecked}
            }
            //The rest of the items keep their data as it was
            return data
        })

        //Stores updates info in state
        setAircrafts(updatedArray)
    }
    
    //EFFECTS

    useEffect(()=>{

        //Updates active section when dates are complete
        if(selectedDate.month && selectedDate.year){
            setActiveSection('aircrafts')
        }
    },[selectedDate])

    useEffect(()=>{
        if (aircrafts){

            //Stores state with selected aircrafts 
            setSelectedAircrafts(aircrafts.filter(data=>data.checked===true))
        }


    },[aircrafts])

    useEffect( ()=>{

        //When component mounts, gets all users, aircrafts and activityModels from db and stores in local state
        const getAllUsers = async () =>{
            let usersArray = []

            const usersSnap = await getDocs(collection(db, 'users'))
            usersSnap.forEach(doc=>{
                usersArray.push(doc.data())
            })

            setAllEmployees(usersArray)
            setEmployeeList(usersArray)
            
        }

        const getAircrafts = async () =>{
            let aircraftArray = []
            const aircraftsSnap = await getDocs(collection(db, 'aircrafts'))
            aircraftsSnap.forEach(doc=>{
                aircraftArray = doc.data().data
            })
            //Adds id and checked properties to each element
            setAircrafts(aircraftArray.map((data, idx)=>{
                return({
                    ...data,
                    checked: false,
                    id: idx

                })
            }))

        }

        //Calls all above functions
        getAllUsers()
        getAircrafts()

    },[])

    return(
        
        <div className='builder-container-main col-10'>
            <h2>Roster Builder</h2>
            <div className="main row">
                <>
                    <div className="builder-setup-div">
                        <div className="options margined col-4">
                            <h5>Crew Member</h5>
                            <div className="body">
                                <input type='text' placeholder="Search by Name or Employee ID" onChange={handleInput} className='search-employee-input' disabled={activeSection==='employee'?false:true}/>
                                <div className="employee-list-container">   
                                {employeeList?
                                <ul>
                                    <>
                                        {employeeList.map((user, idx)=>{
                                            return(
                                                <li key={idx} className='' onClick={()=>handleSelectUser(user)}>
                                                    <p>{'Name: '+user.lastname + ', ' + user.username}</p>
                                                    <p>{'ID: '+ user.employeeId}</p>
                                                </li>
                                            )
                                            })
                                        }
                                    </>
                                </ul>
                                :
                                <WidgetLoader/>

                                }         
                                </div>
                            </div>
                        </div>
                        <div className="options margined col-4">
                            <h5>Period</h5>
                            <div className="body">
                                <div className='select-input-div'>
                                    <Select
                                    defaultValue={selectedDate.month}
                                    onChange={(selectedMonth)=> setSelectedDate({...selectedDate, month: selectedMonth.value})}
                                    isDisabled={activeSection==='dates' ? false: true}
                                    styles={selectStyles}
                                    options={monthsOptions}/>
                                </div>
                                <div className='select-input-div'>
                                <Select
                                    defaultValue={selectedDate.year}
                                    onChange={(selectedYear)=> setSelectedDate({...selectedDate, year: selectedYear.value})}
                                    isDisabled={activeSection==='dates' ? false: true}
                                    styles={selectStyles}
                                    options={yearsOptions()}/>
                                </div>
                            </div>
                        </div>
                        <div className="options col-4">
                            <h5>Aircrafts</h5>
                            <div className="body">
                                <div className="aircraft-list-div">
                                    {aircrafts&&
                                    <ul>
                                        {aircrafts.map((aircraft, idx)=>{
                                            return(
                                                <li key={idx} className='d-flex'>
                                                    <input type='checkbox' 
                                                    disabled={activeSection==='aircrafts'?false:true} 
                                                    checked={aircraft.checked}
                                                    value={JSON.stringify(aircraft)}
                                                    onChange={handleCheckbox} />
                                                    <label>{capitalizeWords(aircraft.manufacturer)+' '+aircraft.model+'-'+aircraft.series.toUpperCase()}</label>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="builder-selected-div">
                        <div className={`options arrow ${selectedUser && ' complete '}${activeSection==='employee'&& ' active '}`}> 
                            {!selectedUser?
                            <p>Select an employee</p>
                            :
                            <div className="d-flex justify-content-center align-items-center">
                                <p><b>Roster for: </b>{selectedUser.lastname+', '+ selectedUser.username}</p>
                                {activeSection==='dates'&&

                                    //User can clear this information only if it's working on the next section
                                    <button className="clear-selection-btn" onClick={handleClearUser}>
                                        <FontAwesomeIcon icon={faXmark}/>
                                    </button>
                                }
                            </div>
                            }

                        </div>
                        <div className={`options arrow ${selectedDate.year && selectedDate.month && ' complete '}${activeSection==='dates'&& ' active '} second`}> 
                            <>
                            {selectedUser&&
                            //If user was selected:
                                <>
                                {selectedDate.year && selectedDate.month?
                                    <div className="d-flex justify-content-center align-items-center">
                                        <p><b>Period: </b>{selectedDate.month? addZero(parseInt(selectedDate.month)+1):''}{selectedDate.year? ' / '+selectedDate.year : ''}</p>
                                        {selectedDate.month&& selectedDate.year&& activeSection==='aircrafts'&&
                                            <button className="clear-selection-btn" onClick={handleClearDates}>
                                                <FontAwesomeIcon icon={faXmark}/>
                                            </button>
                                        }
                                    </div>
                                :
                                <p>Select a Date</p>
                                }
                                </>
                            }
                            </>
                        </div>
                        <div className={`options  ${selectedAircrafts.length > 0 && ' complete '}${activeSection==='aircrafts'&& ' active '} second last`}>
                        <>
                            {selectedUser&& selectedDate.year && selectedDate.month &&
                            //IF all previous sections were completed
                                <>
                                {selectedAircrafts.length > 0 ?

                                //If user have selected at least one aircraft:
                                <button className="btn  btn-warning " 
                                onClick={()=>setRosterSettings({user: selectedUser, period: selectedDate, equipment: selectedAircrafts})}>
                                Confirm Settings
                                </button>
                                :
                                //If there are no selected aircrafts
                                <p>Select aircraft/s</p>
                                }
                                </>
                            }
                            </>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}