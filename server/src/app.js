import "dotenv/config"
import express from 'express'
import cors from 'cors';

import {data} from './data.js'

const app = express()

app.use(cors())

app.get('/api/drive', (req, res) => {
    setTimeout(() => {
        return res.send({data})   
    }, 3000)
})

app.listen(process.env.APP_PORT, () => {
    console.log(`App started at http://localhost:${process.env.APP_PORT}`)
})