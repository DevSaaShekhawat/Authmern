const express = require("express");
require("./db/conn");
const router = require("./routes/router");
const cors = require("cors");
const cookiParser = require("cookie-parser");
const app = express();
const port = 8009;


// app.get("/", (req,res)=> {
//     res.status(201).json("server created")
// });

app.use(express.json());
app.use(cors());
app.use(cors());
app.use(router);

app.listen(port, ()=> {
    console.log(`Server start at port no : ${port}`);
})