import express from 'express';
import cors from 'cors';
import session from 'express-session';
import dotenv from 'dotenv';
import db from './config/Database.js';

import SequelizeStore from 'connect-session-sequelize';
import FileUpload from 'express-fileupload';

import UserRoute from './routes/UserRoute.js';
import AuthRoute from './routes/AuthRoute.js';
/* import DataJabatanRoute from './routes/DataJabatanRoute.js';
import DataKehadiranRoute from './routes/DataKehadiranRoute.js';
import PotonganGajiRoute from './routes/PotonganGajiRoute.js';
import DataGajiRoute from './routes/DataGajiRoute.js';
import LaporanRoute from './routes/LaporanRoute.js'; */


const app = express();

const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
    db: db
});

/* (async() => {
    await db.sync();
})(); */

dotenv.config();

// Middleware
app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors ({
    credentials: true,
    origin: 'http://localhost:3000'
}));


app.use(express.json());

app.use(FileUpload());
app.use(express.static("public"));

app.use(UserRoute);
app.use(AuthRoute);
/* app.use(DataJabatanRoute);
app.use(DataKehadiranRoute);
app.use(PotonganGajiRoute);
app.use(DataGajiRoute);
app.use(LaporanRoute); */

// store.sync();

app.listen(process.env.APP_PORT, () => {
    console.log('Server up and running...');
});