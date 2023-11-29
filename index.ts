import express from 'express';
import transportApi from './routes/transport';
import cors from 'cors';
import './config/connect'; // Assuming this file handles the mongoose connection

const PORT = 3000;
const HOST_NAME = '127.0.0.1';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/transport', transportApi);

app.listen(PORT, HOST_NAME, () => {
    console.log(`Server running at ${HOST_NAME}:${PORT}`);
});
