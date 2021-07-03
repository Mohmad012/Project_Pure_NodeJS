import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import storeRoute from "./route/store.route.js";
import bookRoute from "./route/book.route.js";
import dotenv from "dotenv"
dotenv.config();

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())


app.get('/' , (req , res) => {
	res.send("Hello Mohmad Setup Note app Is ready Now")
})


app.use("/api/v2", storeRoute)

app.use("/api/v3", bookRoute)

app.listen(process.env.PORT,() => {
	console.log("Server Start......................")
})