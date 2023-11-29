// import express, {Request, Response} from "express";
// import mongoose from "mongoose";
// // import transport from "./transport.model";
// import bodyParser from "body-parser";

// const cors = require('cors');
// const multer = require('multer');
// const path = require ('path');


// const app = express();
// app.use(cors());
// app.use('/images', express.static(path.join(__dirname, '../transports')));
// const PORT = process.env.PORT || 3000;
// const eurekaHelper = require('./eureka-helper');

// app.listen(PORT, () =>{
//     console.log("transport-server on 3000");
// });

// eurekaHelper.registerWithEureka('transport-server', PORT);
// app.use(bodyParser.json());

// const uri = "mongodb://127.0.0.1:27017/Flyware";
// mongoose.connect(uri, (err) => {
//     if (err) console.log(err);
//     else console.log("Mongo Database connected successfully");
// });


// const storage = multer.diskStorage({
//     destination: (req:Request, file:any, cb:any) => {
//       cb(null, 'flights');
//     },
//     filename: (req:Request, file:any, cb:any) => {
//       cb(null, `${Date.now()}_${file.originalname}`); // Rename the file if necessary
//     },
//   });

// const upload = multer({ storage: storage }).single('image');
// app.post('/transports', upload, (req, res) => {
//   console.log(req.file?.filename);

//   const { duration,date,returnDate, departure, destination, price,nbBuisPlaces,nbEcoPlaces } = req.body;


//   const newTransport = new Transport({
//     duration,
//     date,
//     returnDate,
//     departure,
//     destination,
//     price,
//     nbBuisPlaces,
//     nbEcoPlaces,
//     imagePath,
//   });
