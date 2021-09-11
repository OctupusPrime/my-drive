import "dotenv/config"
import express from 'express'

const app = express(),
    drive = '1'

app.get('/', (req, res) => {
    return res.send({data: drive})
})

app.listen(process.env.APP_PORT, () => {
    console.log(`App started at http://localhost:${process.env.APP_PORT}`)
})