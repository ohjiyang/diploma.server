import express from "express"
import cors from "cors"

const app = express()
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("hello world")
})

app.listen(4444, (err) => {
    if (err) {
        console.log(err)
    }
    console.log("server OK")
})