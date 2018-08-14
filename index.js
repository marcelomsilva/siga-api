const express = require('express')
const app = new express()
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('',(req,res)=>{
    res.json({message:'ddasdadadsad'});
})

app.listen(3000)