// #region npm imports
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import config from './config.js';
// #endregion

// #region local imports
import authRoutes from './routes/auth.js';
import tasksRoutes from './routes/tasks.js';
import userinfoRoutes from './routes/userinfo.js';
import adminRoutes from './routes/admin.js';
import setupDefaultAdmin from './utils/setupDefaultAdmin.js';
import categoriesRoutes from './routes/categories.js';

// #endregion
// #region express app setup
const app = express();
const PORT = config.port;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
// #endregion
// #region routes

app.use('/auth', authRoutes);

app.use('/tasks', tasksRoutes);

app.use('/user', userinfoRoutes);

app.use('/categories', categoriesRoutes);

app.use('/admin', adminRoutes);

app.get('/', (req, res) => {
    res.send('Todo alkalmazás szerver');
});
// #endregion
// #region server start

app.listen(PORT, () => {
    setupDefaultAdmin();
    console.log(`${PORT}-es porton fut a szerver`);
});
// #endregion