// #region npm imports
import express from 'express';
import cors from 'cors';
import config from './config.js';
// #endregion

// #region local imports
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import userinfoRoutes from './routes/userinfo.js';

// #endregion
const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);

app.use('/tasks', tasksRoutes);

app.use('/userinfo', userinfoRoutes);



app.listen(PORT, () => {
    console.log(`${PORT}-es porton fut a szerver`);
});