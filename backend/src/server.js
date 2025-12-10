// #region npm imports
import express from 'express';
import cors from 'cors';
import config from './utils/config.js';
import cookieParser from 'cookie-parser';
// #endregion

// #region route imports

import registerUser from './routes/register.js';
import loginUser from './routes/login.js';
import addTask from './routes/addtask.js';
import listtask from './routes/listtask.js';
import listusers from './routes/listusers.js';
// #endregion

// #region express app setup
const app = express();
const cfg = config();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// #endregion

// #region route setup


app.use('/api/register', registerUser);
app.use('/api/login', loginUser);
app.use('/api/addtask', addTask);
app.use('/api/listtask', listtask);
app.use('/api/listusers', listusers);
// #endregion

// #region server start
import adminSetup from './utils/adminsetup.js';
app.listen(cfg.port, async () => {
    adminSetup();
    console.log(`Szerver fut a következő porton: ${cfg.port}`);
}
);