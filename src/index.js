
import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";
import { User } from "./models/user.model.js";

dotenv.config({
    path: './env'
})

connectDB() 

    




    .then(() => {
        app.listen(process.env.PORT || 4000 ,  () => {
            console.log(`Server Connect is port Run ${process.env.PORT}`);

        })
    })
    .catch((error) => {
        console.log('Mongodb Connect Failed', error);

    })