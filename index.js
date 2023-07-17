const express = require("express");
const { default: mongoose } = require("mongoose");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes")
const cors = require("cors")
require("dotenv").config();
const app = express();
app.use(express.json());

app.get("/",(req,res)=>{

    res.send("welcome to the server")
})
// sdsdgvsdgvfsdfgvggfv
app.use("/users",userRoute);

app.use("/posts",postRoute)

app.use(cors({ origin: 'http://localhost:3000' }));

const connection = async () => {

    try {

        await mongoose.connect(process.env.MOGO_URL);

        console.log("connected")
    } catch (error) {

        console.log(error)
    }
}

app.listen(process.env.PORT, () => {

    connection();

    console.log("listen")

})