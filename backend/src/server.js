import express from 'express';
import cors from 'cors';
import config from './config.js';



import registerUser from './routes/register.js';
import loginUser from './routes/login.js';
import addTask from './routes/addtask.js';

const app = express();
const cfg = config();
app.use(cors());
app.use(express.json());

app.use('/api/register', registerUser);
app.use('/api/login', loginUser);

app.listen(cfg.port, () => {
    console.log(`Server is running on port ${cfg.port}`);
});