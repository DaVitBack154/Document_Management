
const express = require('express')
const cors = require("cors")
const app = express()
require('dotenv').config();
const mssql = require("mssql");
const databaseConfig = require("./config/db.connect");
const bodyParser = require('body-parser')
const router = require('./routes/index')
const path = require("path");


app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.json({ limit: "10mb" }));
app.use(bodyParser.json({ limit: '20mb' }))
app.use(cors({ origin: "http://localhost:3002", credentials: true }));


// app.use(
//     session({
//         name: "app.sid",
//         secret: "022222222222",
//         resave: false,
//         saveUninitialized: true,
//         cookie: {
//             httpOnly: false, // dont let browser javascript access cookie ever
//             secure: false, // only use cookie over https
//             SameSite: false, // only use cookie over https
//             maxAge: 30 * 24 * 60 * 60 * 1000 //1 month before expireผ
//         },
//     })
// );

app.use('/api', router)

mssql.connect(databaseConfig, (err) => {
    if (err) {
        console.log(err);
    }
    console.log("database connected");
});

const port = 5001
app.listen(port, () => {
    console.log("Server run", { port })
})


