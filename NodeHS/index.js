const firebase = require ('firebase/app');
const {getDatabase, ref, onValue, query, limitToLast} = require ('firebase/database');

const express = require ("express")
const cors = require ("cors")
const port = 5000

const app = express()

var gName
var gTemperature

var gLatitude
var gLongitude

var highTemp = undefined
var lowTemp = undefined

app.use(cors())

var date_ob=new Date();
var date = ("0" + date_ob.getDate()).slice(-2) + '/' + ("0" + (date_ob.getMonth() + 1)).slice(-2) + '/' + date_ob.getFullYear();
var dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]
var diaSemana = dias[date_ob.getDay() % 7];
console.log(diaSemana, " ", date)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(port, ()=> {})

app.use(express.static(__dirname+"/template/static/"))

app.get('/getjson', (req, res)=> {
    if (gTemperature != undefined)
    {
        if ((gTemperature > highTemp) || (highTemp == undefined))
        {
            highTemp = gTemperature
        }

        if ((gTemperature < lowTemp) || (lowTemp == undefined))
        {
            lowTemp = gTemperature
        }

        res.send({'name' : gName, 'temperature' : gTemperature, 'highTemp' : highTemp, 'lowTemp' : lowTemp})
    }
})

app.get('/getjsonGPS', (req, res)=> {
    if (gLatitude != undefined)
        res.send({'latitude' : parseFloat(gLatitude), 'longitude' : parseFloat(gLongitude)})
})

app.get('/date', (req, res)=> {
    res.send({'date' : date, 'diaSemana' : diaSemana})
})

const firebaseApp = firebase.initializeApp ({
    apiKey: "AIzaSyDCNjoSmXJasSthJPlIiHoQ9dQjA8fJAck",  
    authDomain: "rubegoldberginths.firebaseapp.com",
    databaseURL: "https://rubegoldberginths-default-rtdb.firebaseio.com",
    projectId: "rubegoldberginths",
    storageBucket: "rubegoldberginths.appspot.com",
    messagingSenderId: "896241581822",
    appId: "1:896241581822:web:5bb3659d75acb3b85cafaf",
    measurementId: "G-XK9H6Z4XVN"
}, 'firebaseApp');

var db = getDatabase(firebaseApp);

const cafePronto = query(ref(db, '/'), limitToLast(1));
onValue(la, (snapshot) => {
  const data = snapshot.val();
  gLatitude = Object.values(data);
  console.log("Latitude: ", gLatitude);
});

/*
const la = query(ref(db, 'latitude/'), limitToLast(1));
onValue(la, (snapshot) => {
  const data = snapshot.val();
  gLatitude = Object.values(data);
  console.log("Latitude: ", gLatitude);
});

const lo = query(ref(db, 'longitude/'), limitToLast(1));
onValue(lo, (snapshot) => {
  const data = snapshot.val();
  gLongitude = Object.values(data);
  console.log("Longitude: ", gLongitude);
});

const temp = query(ref(db, 'temperatura/'), limitToLast(1));
onValue(temp, (snapshot) => {
  const data = snapshot.val();
  gTemperature = Object.values(data);
  console.log("temperatura: ", gTemperature);
});*/