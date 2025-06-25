import express from "express"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()

app.get('/', (req, res) => {
    res.send("Server is working! 🚀");
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit : "20kb"}))
app.use(express.urlencoded({extended:true ,limit:"20kb"}))
app.use(express.static("Public"))
app.use(cookieParser())


import userRouter from "./routes/user.routes.js"

app.use("/api/v1/users" , userRouter)


export { app }