import express from "express"
import cors from "cors"
import SwitchRouter from "./src/router/switch.js"

const app = express()

app.use(cors())
app.use(express.json())

app.use(SwitchRouter)

app.listen(process.env.PORT,()=>{
    console.log("Server running on port 3050")
})