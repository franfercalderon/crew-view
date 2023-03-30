import app from "../../fb"
import {getFirestore, collection, addDoc, setDoc, doc} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'

//Initialize Cloud Firestore and get reference to the service
const db = getFirestore(app)

export default function ActivityModels (){

    const flightModels = {
    
        ezemad: {
                    "departure": {
                        'fromHub': true,
                        "airportCode": "eze",
                        "city": "buenos aires",
                        "airport": "ministro pistarini intl.",
                        "time": '23:55',
                    },
                    "arrival": {
                        "airportCode": "mad",
                        "city": "madrid",
                        "airport": "adolfo suarez intl.",
                    },
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    },
                    "flight": "ar1132",
                    "active": true,
                    'isOffered': false,
                    "flightActivity": true,
                    'international':true,
                    "duration": {
                        "minutes": 715
                    }
                },

            
        madeze: 
                {
                    "flightActivity": true,
                    'international':true,
                    'isOffered': false,
                    "active": true,
                    "departure": {
                        'fromHub': false,
                        "airportCode": "mad",
                        "city": "madrid",
                        "airport": "adolfo suarez intl.",
                        "time": '18:50'
                    },
                    "arrival": {
                        "airportCode": "eze",
                        "city": "buenos aires",
                        "airport": "ministro pistarini intl."
                    },
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    },
                    "duration": {
                        "minutes": 793
                    },
                    "flight": "ar1131"
                }
        
        }
        const postModel =() =>{
            const docRef = doc(db, 'activityModels', 'flightActivity')
            setDoc(docRef,flightModels)
        }
        return(
             <button onClick={postModel}>Agregar Modelo</button>
        )
    }



    

// const ezemad = (year,monthIndex, date) =>{

//     return(
//         {
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex,date,23,55)
//             },
//             "arrival": {
//                 "airportCode": "mad",
//                 "city": "madrid",
//                 "airport": "adolfo suarez intl.",
//                 "time": new Date(year,monthIndex,date+1,16,10)
//             },
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "flight": "ar1132",
//             "active": true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "flightActivity": true,
//             'international':true,
//             "date": new Date(year,monthIndex,date),
//             "duration": {
//                 "minutes": 715
//             }
//         }
//     )
// }

// const madeze = (year,monthIndex, date) =>{
//     return(
//         {
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "mad",
//                 "city": "madrid",
//                 "airport": "adolfo suarez intl.",
//                 "time": new Date(year,monthIndex, date,18,50)
//             },
//             "arrival": {
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date+1,4,0)
//             },
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "duration": {
//                 "minutes": 793
//             },
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1131"
//         }
//     )
// }

// const ezejfk = (year,monthIndex, date) =>{
//     return(
//         {
//             "duration": {
//                 "minutes": 665
//             },
//             "flight": "ar1300",
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date,23,25)
//             },
//             "arrival": {
//                 "airportCode": "jfk",
//                 "airport": "john f. kennedy intl.",
//                 "city": "new york",
//                 "time": new Date(year,monthIndex, date+1,9,30)
//             },
//             "active": true,
//             "date": new Date(year,monthIndex, date)
//         }
//     )
// }

// const jfkeze = (year,monthIndex, date) =>{
//     return(
//         {
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 655
//             },
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "jfk",
//                 "airport": "john f. kennedy intl.",
//                 "city": "new york",
//                 "time": new Date(year,monthIndex, date,16,35)
//             },
//             "arrival": {
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date+1,4,30)
//             },
//             "flight": "ar1301",
//             "date": new Date(year,monthIndex, date)
//         }
        
//     )
// }

// const ezefco =  (year,monthIndex, date) =>{
//     return(
//         {
//             "date": new Date(year,monthIndex, date),
//             "active": true,
//             "arrival": {
//                 "airportCode": "fco",
//                 "city": "rome",
//                 "airport": "fiumicino intl.",
//                 "time": new Date(year,monthIndex, date+1,17,0)
//             },
//             "duration": {
//                 "minutes": 800
//             },
//             "flight": "ar1140",
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date,22,40)
//             },
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false
//         }
//     )
// }

// const fcoeze =  (year,monthIndex, date) =>{
//     return(
//         {
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "fco",
//                 "city": "rome",
//                 "airport": "fiumincino intl.",
//                 "time": new Date(year,monthIndex, date,18,15)
//             },
//             "arrival": {
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date+1,4,40)
//             },
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "duration": {
//                 "minutes": 865
//             },
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1141"
//         }
//     )
// }

// const aeplim = (year,monthIndex, date) =>{
//     return(
//         {
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 290
//             },
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "aep",
//                 "city": "buenos aires",
//                 "airport": "aeroparque j.newbery",
//                 "time": new Date(year,monthIndex, date,18,45)
//             },
//             "arrival": {
//                 "airportCode": "lim",
//                 "airport": "jorge chavez intl.",
//                 "city": "lima",
//                 "time": new Date(year,monthIndex, date,21,35)
//             },
//             "flight": "ar1364",
//             "date": new Date(year,monthIndex, date)
//         }
        
//     )
// }

// const limaep = (year,monthIndex, date) =>{
    
//     return(
//         {
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 260
//             },
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "lim",
//                 "airport": "jorge chavez intl.",
//                 "city": "lima",
//                 "time": new Date(year,monthIndex, date,22,50)
//             },
//             "arrival": {
//                 "airportCode": "aep",
//                 "city": "buenos aires",
//                 "airport": "aeroparque j.newbery",
//                 "time": new Date(year,monthIndex, date+1,5,10)
//             },
//             "flight": "ar1365",
//             "date": new Date(year,monthIndex, date)
//         }
        
//     )
// }

// const aepmdz = (year,monthIndex, date) =>{

//     return(
//         {
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1400",
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "aep",
//                 "airport": "aeroparque j.newbery.",
//                 "city": "buenos aires",
//                 "time": new Date(year,monthIndex, date,5,55)
//             },
//             "arrival": {
//                 "airportCode": "mdz",
//                 "city": "mendoza",
//                 "airport": "el plumerillo intl.",
//                 "time": new Date(year,monthIndex, date,7,50)
//             },
//             "flightActivity": true,
//             'international':false,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 115
//             }
//         }
//     )
// }

// const mdzaep = (year,monthIndex, date) =>{
//     return(
//         {
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1401",
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "mdz",
//                 "city": "mendoza",
//                 "airport": "el plumerillo intl.",
//                 "time": new Date(year,monthIndex, date,8,40)
//             },
//             "arrival": {
//                 "airportCode": "aep",
//                 "airport": "aeroparque j.newbery.",
//                 "city": "buenos aires",
//                 "time": new Date(year,monthIndex, date,10,15)
//             },
//             "flightActivity": true,
//             'international':false,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 95
//             }
//         }
//     )
// }

// const aepbrc = (year,monthIndex, date) =>{
//     return(
//         {
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1668",
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "aep",
//                 "airport": "aeroparque j.newbery.",
//                 "city": "buenos aires",
//                 "time": new Date(year,monthIndex, date,13,20)
//             },
//             "arrival": {
//                 "airportCode": "brc",
//                 "city": "bariloche",
//                 "airport": "tte. Luis Candelaria intl.",
//                 "time": new Date(year,monthIndex, date,15,45)
//             },
//             "flightActivity": true,
//             'international':false,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 145
//             }
//         }
//     )
// }

// const brcaep = (year,monthIndex, date) =>{
//     return(
//         {
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1669",
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "brc",
//                 "city": "bariloche",
//                 "airport": "tte. Luis Candelaria intl.",
//                 "time": new Date(year,monthIndex, date,17,10)
//             },
//             "arrival": {
//                 "airportCode": "aep",
//                 "airport": "aeroparque j.newbery.",
//                 "city": "buenos aires",
//                 "time": new Date(year,monthIndex, date,19,15)
//             },
//             "flightActivity": true,
//             'international':false,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 125
//             }
//         }
//     )
// }

// const ezegig = (year,monthIndex, date) =>{
//     return(
//         {
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 180
//             },
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date,6,30)
//             },
//             "arrival": {
//                 "airportCode": "gig",
//                 "airport": "galeao intl.",
//                 "city": "rio de janeiro",
//                 "time": new Date(year,monthIndex, date,9,30)
//             },
//             "flight": "ar1260",
//             "date": new Date(year,monthIndex, date)
//         }
//     )
// }

// const gigeze = (year,monthIndex, date) =>{
//     return(
//         {
//             "equipment": {
//                 "manufacturer" : "boeing",
//                 "model" : "737-800 max",
//                 "img" : "/images/aircrafts/b737m.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "active": true,
//             "duration": {
//                 "minutes": 200
//             },
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "gig",
//                 "airport": "galeao intl.",
//                 "city": "rio de janeiro",
//                 "time": new Date(year,monthIndex, date,10,40)
//             },
//             "arrival": {
//                 "airportCode": "eze",
//                 "city": "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date,14,0)
//             },
//             "flight": "ar1261",
//             "date": new Date(year,monthIndex, date)
//         }
//     )
// }

// const ezemia = (year,monthIndex, date) =>{
//     return(
//         {
//             "active": true,
//             "date": new Date(year,monthIndex, date),
//             "flight": "ar1304",
//             "arrival": {
//                 "airportCode": "mia",
//                 "city" : "miami",
//                 "airport": "miami intl.",
//                 "time": new Date(year,monthIndex, date,14,40)
//             },
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "departure": {
//                 'fromHub': true,
//                 "airportCode": "eze",
//                 "city" : "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date,7,30)
//             },
//             "duration": {
//                 "minutes": 550
//             }
//         }
//     )
// }

// const miaeze = (year,monthIndex, date) =>{
//     return(
//         {
//             "date": new Date(year,monthIndex, date),
//             "departure": {
//                 'fromHub': false,
//                 "airportCode": "mia",
//                 "city" : "miami",
//                 "airport": "miami intl.",
//                 "time": new Date(year,monthIndex, date,17,0)
//             },
            
//             "active": true,
//             "arrival": {
//                 "airportCode": "eze",
//                 "city" : "buenos aires",
//                 "airport": "ministro pistarini intl.",
//                 "time": new Date(year,monthIndex, date+1,4,0)
//             },
//             "flightActivity": true,
//             'international':true,
//             'flightId': uuidv4(),
//             'isOffered': false,
//             "flight": "ar1303",
//             "duration": {
//                 "minutes": 540
//             },
//             "equipment": {
//                 "manufacturer" : "airbus",
//                 "model" : "330-300",
//                 "img" : "/images/aircrafts/a330.jpeg"
//             }
//         }
//     )
// }

// const off = (year,monthIndex, date) =>{
//     return(
//         {
//             "active": false,
//             "date": new Date(year,monthIndex, date)
//         }
//     )
// }

// const recurrent = (year,monthIndex, date) =>{
//     return(
//         {
//             "duty": {
//                 "description": "recurrent",
//                 "ends": new Date(year,monthIndex, date,18,0),
//                 "starts": new Date(year,monthIndex, date,9,0)
//             },
//             "date": new Date(year,monthIndex, date),
//             "active": true,
//             "flightActivity": false
//         }
//     )
// }

