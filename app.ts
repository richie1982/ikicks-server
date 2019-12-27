import express, { Application } from 'express'
import dotenv from 'dotenv'
import { connect } from 'mongoose'
import cors from 'cors'
import userRoute from './routes/UserRoute'

const app: Application = express()

dotenv.config()
app.use(express.json())
app.use(cors())

const port: number | string = process.env.PORT || 3001
const dB: any = process.env.DB_CONNECT

connect(dB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
    },
    () => {
        console.log("DB Connected")
})

app.get('/', (req, res) => {
    res.send('App working')
})

app.use('/', userRoute)

app.listen(port, () => {
    console.log("Listening on port: ", port);
})