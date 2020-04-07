const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { MongoClient } = require("mongodb");
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser());

const port = process.env.PORT;
const uri = process.env.DB_PATH;

//connection to mongo atlas
const client = new MongoClient(uri, { useNewUrlParser: true });

//welcome api
app.get('/', (req, res) => res.send('Hello Api!'))

//get all appointments
app.get('/appointments', (req, res) => {
    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("appointments");

        // perform actions on the collection object
        collection.find().toArray((err, documents) => {
           if(err) {
               console.log(err);
               res.status(500).send({message: err.message});
           }
           else{
               res.status(200).send(documents);
           } 
            
        })
        client.close();
    });
})

//add an appointment
app.post('/addAppointment', (req, res) => {
    const appointment = req.body;

    const client = new MongoClient(uri, { useNewUrlParser: true });

    client.connect(err => {
        const collection = client.db("doctorsPortal").collection("appointments");

        // perform actions on the collection object
        collection.insertOne(appointment, (err, documents) => {
           if(err) {
               console.log(err);
               res.status(500).send({message: err.message});
           }
           else{
               res.status(200).send(documents.ops[0]);
           } 
            
        })
        client.close();
    });
})

//add a prescription for a patiend
app.post('/addPrescription', (req, res) => {
    //const patiendId = req.body;
    res.send(req.body);
})


app.listen(port, () => console.log(`listening at http://localhost:${port}`))