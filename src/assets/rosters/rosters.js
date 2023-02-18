import app from "../../fb"
import {getFirestore, setDoc, doc} from 'firebase/firestore'

//Initialize Cloud Firestore and get reference to the service
const db = getFirestore(app)


export default function Rosters () {

    // const ahora = Date.now().toDateString
    // console.log(ahora)

    // const fecha = toDateString(ahora)

    // console.log('Fecha es '+fecha)

    // const publicaFecha = new Date(1675220400)
    // console.log(publicaFecha)

    const rosterOne = {
        "crewId": "0001",
        "published": new Date(2023,1,1),
        "activity": [
            {
                "active": false,
                "date": new Date(2023,1,1)
            },
            {
                "departure": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,2,23,55)
                },
                "arrival": {
                    "airportCode": "mad",
                    "city": "madrid",
                    "airport": "adolfo suarez intl.",
                    "time": new Date(2023,1,3,16,10)
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flight": "ar1132",
                "active": true,
                "flightActivity": true,
                "date": new Date(2023,1,2),
                "duration": {
                    "hours": 11,
                    "minutes": 55
                }
            },
            {
                "active": false,
                "date": new Date(2023,1,3)
            },
            {
                "active": false,
                "date": new Date(2023,1,4)
            },
            {
                "flightActivity": true,
                "active": true,
                "departure": {
                    "airportCode": "mad",
                    "city": "madrid",
                    "airport": "adolfo suarez intl.",
                    "time": new Date(2023,1,5,18,50)
                },
                "arrival": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,6,4,0)
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "duration": {
                    "minutes": 10,
                    "hours": 13
                },
                "date": new Date(2023,1,5),
                "flight": "ar1131"
            },
            {
                "date": new Date(2023,1,6),
                "active": false
            },
            {
                "duration": {
                    "hours": 11,
                    "minutes": 5
                },
                "flight": "ar1300",
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flightActivity": true,
                "departure": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,7,23,25)
                },
                "arrival": {
                    "airportCode": "jfk",
                    "airportName": "john f. kennedy intl.",
                    "city": "new york",
                    "time": new Date(2023,1,8,9,30)
                },
                "active": true,
                "date": new Date(2023,1,7)
            },
            {
                "active": false,
                "date": new Date(2023,1,8)
            },
            {
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flightActivity": true,
                "active": true,
                "duration": {
                    "hours": 10,
                    "minutes": 55
                },
                "departure": {
                    "airportCode": "jfk",
                    "airportName": "john f. kennedy intl.",
                    "city": "new york",
                    "time": new Date(2023,1,9,16,35)
                },
                "arrival": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,10,4,30)
                },
                "flight": "ar1301",
                "date": new Date(2023,1,9)
            },
            {
                "active": false,
                "date": new Date(2023,1,10)
            },
            {
                "date": new Date(2023,1,11),
                "flight": "ar1668",
                "equipment": {
                    "manufacturer" : "boeing",
                    "model" : "737-800 max",
                    "img" : "/images/aircrafts/b737m.jpeg"
                },
                "departure": {
                    "airportCode": "aep",
                    "airportName": "aeroparque j.newbery.",
                    "city": "buenos aires",
                    "time": new Date(2023,1,11,13,20)
                },
                "arrival": {
                    "airportCode": "brc",
                    "city": "bariloche",
                    "airport": "tte. Luis Candelaria intl.",
                    "time": new Date(2023,1,11,15,45)
                },
                "flightActivity": true,
                "active": true,
                "duration": {
                    "hours": 2,
                    "minutes": 25
                }
            },
            {
                "flightActivity": true,
                "date": new Date(2023,1,12),
                "departure": {
                    "airportCode": "brc",
                    "city": "bariloche",
                    "airport": "tte. Luis Candelaria intl.",
                    "time": new Date(2023,1,12,17,10)
                },
                "arrival": {
                    "airportCode": "aep",
                    "airportName": "aeroparque j.newbery.",
                    "city": "buenos aires",
                    "time": new Date(2023,1,11,19,15)
                },
                "flight": "ar1669",
                "equipment": {
                    "manufacturer" : "boeing",
                    "model" : "737-800 max",
                    "img" : "/images/aircrafts/b737m.jpeg"
                },
                "active": true,
                "duration": {
                    "minutes": 5,
                    "hours": 2
                }
            },
            {
                "active": false,
                "date": new Date(2023,1,13),
            },
            {
                "active": false,
                "date": new Date(2023,1,14),
            },
            {
                "date": new Date(2023,1,15),
                "active": true,
                "arrival": {
                    "airportCode": "fco",
                    "city": "rome",
                    "airport": "fiumicino intl.",
                    "time": new Date(2023,1,16,17,0)
                },
                "duration": {
                    "minutes": 20,
                    "hours": 13
                },
                "flight": "ar1140",
                "departure": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,15,22,40)
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flightActivity": true
            },
            {
                "active": false,
                "date": new Date(2023,1,16)
            },
            {
                "date": new Date(2023,1,17),
                "active": false
            },
            {
                "flight": "ar1141",
                "date": new Date(2023,1,18),
                "arrival": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,19,4,40)
                },
                "active": true,
                "flightActivity": true,
                "departure": {
                    "airportCode": "fco",
                    "city": "rome",
                    "airport": "fiumicino intl.",
                    "time": new Date(2023,1,18,18,15)
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "duration": {
                    "hours": 14,
                    "minutes": 25
                }
            },
            {
                "date": new Date(2023,1,19),
                "active": false
            },
            {
                "duty": {
                    "description": "recurrent",
                    "ends": new Date(2023,1,20,18,0),
                    "starts": new Date(2023,1,20,9,0)
                },
                "date": new Date(2023,1,20),
                "active": true,
                "flightActivity": false
            },
            {
                "duty": {
                    "description": "recurrent",
                    "ends": new Date(2023,1,21,18,0),
                    "starts": new Date(2023,1,21,9,0)
                },
                "date": new Date(2023,1,21),
                "active": true,
                "flightActivity": false
            },
            {
                "duty": {
                    "description": "recurrent",
                    "ends": new Date(2023,1,22,18,0),
                    "starts": new Date(2023,1,22,9,0)
                },
                "date": new Date(2023,1,22),
                "active": true,
                "flightActivity": false
            },
            {
                "active": false,
                "date": new Date(2023,1,23)
            },
            {
                "date": new Date(2023,1,24),
                "active": false
            },
            {
                "active": false,
                "date": new Date(2023,1,25),
            },
            {
                "active": false,
                "date": new Date(2023,1,26),
            },
            {
                "active": true,
                "date": new Date(2023,1,27),
                "flight": "ar1304",
                "arrival": {
                    "airportCode": "mia",
                    "city" : "miami",
                    "airport": "miami intl.",
                    "time": new Date(2023,1,27,14,40)
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flightActivity": true,
                "departure": {
                    "airportCode": "eze",
                    "city" : "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,27,7,30)
                },
                "duration": {
                    "minutes": 10,
                    "hours": 9
                }
            },
            {
                "date": new Date(2023,1,28),
                "departure": {
                    "airportCode": "mia",
                    "city" : "miami",
                    "airport": "miami intl.",
                    "time": new Date(2023,1,28,17,0)
                },
                
                "active": true,
                "arrival": {
                    "airportCode": "eze",
                    "city" : "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,2,1,4,0)
                },
                "flightActivity": true,
                "flight": "ar1303",
                "duration": {
                    "minutes": 0,
                    "hours": 9
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                }
            }
        ]
    }

    const postRoster =() =>{
        setDoc(doc(db, 'rosters', '0001_02_23'),rosterOne)
            .then(res=>console.log(res.data))
            .catch(err=>console.log(err))
    }
    return(
        <>  <button onClick={postRoster}>Agregar Rol</button>
                    {/* <input type='button'>Agregar Rol</input> */}

            {/* <input type='button' onClick={postRoster}>Agregar Rol</input> */}
        </>
    )
}
