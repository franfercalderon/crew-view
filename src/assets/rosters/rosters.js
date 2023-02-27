import app from "../../fb"
import {getFirestore, collection, addDoc} from 'firebase/firestore'
import {v4 as uuidv4} from 'uuid'

//Initialize Cloud Firestore and get reference to the service
const db = getFirestore(app)

export default function Rosters () {


    const rosterOne = {
        'data':{
            "crewId": "0001",
            "published": new Date(2023,1,1),
            "activity": [
                {
                    "active": false,
                    "date": new Date(2023,1,1)
                },
                {
                    "departure": {
                        'fromHub': true,
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
                    'isOffered': false,
                    "active": true,
                    'flightId': uuidv4(),
                    "flightActivity": true,
                    'international':true,
                    "date": new Date(2023,1,2),
                    "duration": {
                        "minutes": 715
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "active": true,
                    "departure": {
                        'fromHub': false,
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
                        "minutes": 793
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
                        "minutes": 665
                    },
                    "flight": "ar1300",
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    },
                    "flightActivity": true,
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "departure": {
                        'fromHub': true,
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "active": true,
                    "duration": {
                        "minutes": 655
                    },
                    "departure": {
                        'fromHub': false,
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
                        'fromHub': true,
                        "airportCode": "aep",
                        "airportName": "aeroparque j.newbery",
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
                    'international':false,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "active": true,
                    "duration": {
                        "minutes": 145
                    }
                },
                {
                    "flightActivity": true,
                    'international':false,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "date": new Date(2023,1,12),
                    "departure": {
                        'fromHub': false,
                        "airportCode": "brc",
                        "city": "bariloche",
                        "airport": "tte. Luis Candelaria intl.",
                        "time": new Date(2023,1,12,17,10)
                    },
                    "arrival": {
                        "airportCode": "aep",
                        "airportName": "aeroparque j.newbery",
                        "city": "buenos aires",
                        "time": new Date(2023,1,12,19,15)
                    },
                    "flight": "ar1669",
                    "equipment": {
                        "manufacturer" : "boeing",
                        "model" : "737-800 max",
                        "img" : "/images/aircrafts/b737m.jpeg"
                    },
                    "active": true,
                    "duration": {
                        "minutes": 125
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
                        "minutes": 800
                    },
                    "flight": "ar1140",
                    "departure": {
                        'fromHub': true,
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
                    "flightActivity": true,
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "departure": {
                        'fromHub': false,
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
                        "minutes": 865
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "departure": {
                        'fromHub': true,
                        "airportCode": "eze",
                        "city" : "buenos aires",
                        "airport": "ministro pistarini intl.",
                        "time": new Date(2023,1,27,7,30)
                    },
                    "duration": {
                        "minutes": 550
                    }
                },
                {
                    "date": new Date(2023,1,28),
                    "departure": {
                        'fromHub': false,
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "flight": "ar1303",
                    "duration": {
                        "minutes": 540
                    },
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    }
                }
            ]
        }
    }

    const rosterTwo = {
        "crewId": "0001",
        "published": new Date(2023,2,1),
        "activity": [
            {
                "active": false,
                "date": new Date(2023,2,1)
            },
            {
                "departure": {
                    'fromHub': true,
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
                'flightId': uuidv4(),
                'isOffered': false,
                "flightActivity": true,
                'international':true,
                "date": new Date(2023,2,2),
                "duration": {
                    "minutes": 715
                }
            },
            {
                "active": false,
                "date": new Date(2023,2,3)
            },
            {
                "active": false,
                "date": new Date(2023,2,4)
            },
            {
                "flightActivity": true,
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false,
                "active": true,
                "departure": {
                    'fromHub': false,
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
                    "minutes": 793
                },
                "date": new Date(2023,2,5),
                "flight": "ar1131"
            },
            {
                "date": new Date(2023,2,6),
                "active": false
            },
            {
                "duration": {
                    "minutes": 665
                },
                "flight": "ar1300",
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flightActivity": true,
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false,
                "departure": {
                    'fromHub': true,
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
                "date": new Date(2023,2,7)
            },
            {
                "active": false,
                "date": new Date(2023,2,8)
            },
            {
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                },
                "flightActivity": true,
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false,
                "active": true,
                "duration": {
                    "minutes": 655
                },
                "departure": {
                    'fromHub': false,
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
                "date": new Date(2023,2,9)
            },
            {
                "active": false,
                "date": new Date(2023,2,10)
            },
            {
                "date": new Date(2023,2,11),
                "flight": "ar1668",
                "equipment": {
                    "manufacturer" : "boeing",
                    "model" : "737-800 max",
                    "img" : "/images/aircrafts/b737m.jpeg"
                },
                "departure": {
                    'fromHub': true,
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
                'international':false,
                'flightId': uuidv4(),
                'isOffered': false,
                "active": true,
                "duration": {
                    "minutes": 145
                }
            },
            {
                "flightActivity": true,
                'international':false,
                'flightId': uuidv4(),
                'isOffered': false,
                "date": new Date(2023,2,12),
                "departure": {
                    'fromHub': false,
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
                    "minutes": 125
                }
            },
            {
                "active": false,
                "date": new Date(2023,2,13),
            },
            {
                "active": false,
                "date": new Date(2023,2,14),
            },
            {
                "date": new Date(2023,2,15),
                "active": true,
                "arrival": {
                    "airportCode": "fco",
                    "city": "rome",
                    "airport": "fiumicino intl.",
                    "time": new Date(2023,1,16,17,0)
                },
                "duration": {
                    "minutes": 800
                },
                "flight": "ar1140",
                "departure": {
                    'fromHub': true,
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
                "flightActivity": true,
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false
            },
            {
                "active": false,
                "date": new Date(2023,2,16)
            },
            {
                "date": new Date(2023,2,17),
                "active": false
            },
            {
                "flight": "ar1141",
                "date": new Date(2023,2,18),
                "arrival": {
                    "airportCode": "eze",
                    "city": "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,19,4,40)
                },
                "active": true,
                "flightActivity": true,
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false,
                "departure": {
                    'fromHub': false,
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
                    "minutes": 865
                }
            },
            {
                "date": new Date(2023,2,19),
                "active": false
            },
            {
                "duty": {
                    "description": "recurrent",
                    "ends": new Date(2023,1,20,18,0),
                    "starts": new Date(2023,1,20,9,0)
                },
                "date": new Date(2023,2,20),
                "active": true,
                "flightActivity": false
            },
            {
                "duty": {
                    "description": "recurrent",
                    "ends": new Date(2023,1,21,18,0),
                    "starts": new Date(2023,1,21,9,0)
                },
                "date": new Date(2023,2,21),
                "active": true,
                "flightActivity": false
            },
            {
                "duty": {
                    "description": "recurrent",
                    "ends": new Date(2023,1,22,18,0),
                    "starts": new Date(2023,1,22,9,0)
                },
                "date": new Date(2023,2,22),
                "active": true,
                "flightActivity": false
            },
            {
                "active": false,
                "date": new Date(2023,2,23)
            },
            {
                "date": new Date(2023,2,24),
                "active": false
            },
            {
                "active": false,
                "date": new Date(2023,2,25),
            },
            {
                "active": false,
                "date": new Date(2023,2,26),
            },
            {
                "active": true,
                "date": new Date(2023,2,27),
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
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false,
                "departure": {
                    'fromHub': true,
                    "airportCode": "eze",
                    "city" : "buenos aires",
                    "airport": "ministro pistarini intl.",
                    "time": new Date(2023,1,27,7,30)
                },
                "duration": {
                    "minutes": 550
                }
            },
            {
                "date": new Date(2023,2,28),
                "departure": {
                    'fromHub': false,
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
                'international':true,
                'flightId': uuidv4(),
                'isOffered': false,
                "flight": "ar1303",
                "duration": {
                    "minutes": 540
                },
                "equipment": {
                    "manufacturer" : "airbus",
                    "model" : "330-300",
                    "img" : "/images/aircrafts/a330.jpeg"
                }
            },
            {
                "active": false,
                "date": new Date(2023,2,29),
            },
            {
                "active": false,
                "date": new Date(2023,2,30),
            },
            {
                "active": false,
                "date": new Date(2023,2,31),
            }
        ]
    }

    const rosterThree = {
        'data':{
            "crewId": "0002",
            "published": new Date(2023,1,1),
            "activity": [
                {
                    "active": false,
                    "date": new Date(2023,1,1)
                },
                {
                    "departure": {
                        'fromHub': true,
                        "airportCode": "eze",
                        "city": "buenos aires",
                        "airport": "ministro pistarini intl.",
                        "time": new Date(2023,1,2,22,40)
                    },
                    "arrival": {
                        "airportCode": "fco",
                        "city": "fco",
                        "airport": "fiumicino intl.",
                        "time": new Date(2023,1,3,17,0)
                    },
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    },
                    "flight": "ar1140",
                    'isOffered': false,
                    "active": true,
                    'flightId': uuidv4(),
                    "flightActivity": true,
                    'international':true,
                    "date": new Date(2023,1,2),
                    "duration": {
                        "minutes": 880
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "active": true,
                    "departure": {
                        'fromHub': false,
                        "airportCode": "fco",
                        "city": "rome",
                        "airport": "fiumincino intl.",
                        "time": new Date(2023,1,5,18,15)
                    },
                    "arrival": {
                        "airportCode": "eze",
                        "city": "buenos aires",
                        "airport": "ministro pistarini intl.",
                        "time": new Date(2023,1,6,4,40)
                    },
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    },
                    "duration": {
                        "minutes": 865
                    },
                    "date": new Date(2023,1,5),
                    "flight": "ar1141"
                },
                {
                    "date": new Date(2023,1,6),
                    "active": false
                },
                {
                    "duration": {
                        "minutes": 550
                    },
                    "flight": "ar1302",
                    "equipment": {
                        "manufacturer" : "airbus",
                        "model" : "330-300",
                        "img" : "/images/aircrafts/a330.jpeg"
                    },
                    "flightActivity": true,
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "departure": {
                        'fromHub': true,
                        "airportCode": "eze",
                        "city": "buenos aires",
                        "airport": "ministro pistarini intl.",
                        "time": new Date(2023,1,7,23,30)
                    },
                    "arrival": {
                        "airportCode": "mia",
                        "airportName": "miami intl.",
                        "city": "miami",
                        "time": new Date(2023,1,8,6,40)
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "active": true,
                    "duration": {
                        "minutes": 540
                    },
                    "departure": {
                        'fromHub': false,
                        "airportCode": "mia",
                        "airportName": "miami intl.",
                        "city": "miami",
                        "time": new Date(2023,1,9,17,0)
                    },
                    "arrival": {
                        "airportCode": "eze",
                        "city": "buenos aires",
                        "airport": "ministro pistarini intl.",
                        "time": new Date(2023,1,10,4,0)
                    },
                    "flight": "ar1303",
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
                        'fromHub': true,
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
                    'international':false,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "active": true,
                    "duration": {
                        "minutes": 145
                    }
                },
                {
                    "flightActivity": true,
                    'international':false,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "date": new Date(2023,1,12),
                    "departure": {
                        'fromHub': false,
                        "airportCode": "brc",
                        "city": "bariloche",
                        "airport": "tte. Luis Candelaria intl.",
                        "time": new Date(2023,1,12,17,10)
                    },
                    "arrival": {
                        "airportCode": "aep",
                        "airportName": "aeroparque j.newbery.",
                        "city": "buenos aires",
                        "time": new Date(2023,1,12,19,15)
                    },
                    "flight": "ar1669",
                    "equipment": {
                        "manufacturer" : "boeing",
                        "model" : "737-800 max",
                        "img" : "/images/aircrafts/b737m.jpeg"
                    },
                    "active": true,
                    "duration": {
                        "minutes": 125
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
                        "minutes": 800
                    },
                    "flight": "ar1140",
                    "departure": {
                        'fromHub': true,
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
                    "flightActivity": true,
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false
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
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "departure": {
                        'fromHub': false,
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
                        "minutes": 865
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
                    "flight": "ar1668",
                    "arrival": {
                        "airportCode": "brc",
                        "city" : "bariloche",
                        "airport": "tte. Luis Candelaria intl.",
                        "time": new Date(2023,1,27,15,45)
                    },
                    "equipment": {
                        "manufacturer" : "boeing",
                        "model" : "737-800 max",
                        "img" : "/images/aircrafts/b737m.jpeg"
                    },
                    "flightActivity": true,
                    'international':false,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "departure": {
                        'fromHub': true,
                        "airportCode": "aep",
                        "city" : "buenos aires",
                        "airport": "aeroparque j. newbery",
                        "time": new Date(2023,1,27,13,20)
                    },
                    "duration": {
                        "minutes": 145
                    }
                },
                {
                    "date": new Date(2023,1,28),
                    "departure": {
                        'fromHub': false,
                        "airportCode": "brc",
                        "city" : "bariloche",
                        "airport": "tte. Luis Candelaria intl.",
                        "time": new Date(2023,1,28,17,10)
                    },
                    
                    "active": true,
                    "arrival": {
                        "airportCode": "aep",
                        "city" : "buenos aires",
                        "airport": "aeroparque j.newbery",
                        "time": new Date(2023,1,28,19,15)
                    },
                    "flightActivity": true,
                    'international':true,
                    'flightId': uuidv4(),
                    'isOffered': false,
                    "flight": "ar1669",
                    "duration": {
                        "minutes": 125
                    },
                    "equipment": {
                        "manufacturer" : "boeing",
                        "model" : "737-800 max",
                        "img" : "/images/aircrafts/b737m.jpeg"
                    }
                }
            ]
        }
    }

    
    console.log(rosterTwo, rosterOne)

    // const postRoster =() =>{

    //     // const dbRef = collection()
    //     setDoc(doc(db, 'rosters', '0001_02_23'),rosterOne)
    //         .then(res=>console.log(res.data))
    //         .catch(err=>console.log(err))
    // }
    const postRoster =() =>{
        const dbRef = collection(db, 'rosters')

        addDoc(dbRef,rosterThree)
            .then(res=>console.log(res.id))
            // .then(res=>{
            //     console.log(res.data)
            //     console.log(res.id)
            // })
            .catch(err=>console.log(err))
        // const dbRef = collection()
        // setDoc(doc(db, 'rosters', '0001_02_23'),rosterOne)
    }
    return(
        <>  <button onClick={postRoster}>Agregar Rol</button>
                    {/* <input type='button'>Agregar Rol</input> */}

            {/* <input type='button' onClick={postRoster}>Agregar Rol</input> */}
        </>
    )
}
