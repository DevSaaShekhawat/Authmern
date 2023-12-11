const mongoose = require("mongoose");

const DB = "mongodb+srv://devendraimg:devsaahkm@cluster0.f0ujxil.mongodb.net/Authusers"

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("DataBase Connected")).catch((err)=>{
    console.log(err);
})