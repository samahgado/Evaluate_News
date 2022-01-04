require("dotenv").config()
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const mockAPI = require("./mockAPI");
const express = require("express");
const cors = require('cors');
const app = express();


app.use(cors())
app.use(express.json())
app.use(express.static('dist'));

app.get("/test", (req, res) => {
    res.status(200).send(mockAPI);
  });

const port = process.env.PORT || 9000;

app.get('/', function(req, res) {
 res.status(200).send("server on")

})


app.post("/",async (req,res)=>{
    const url = req.body.url;
    const siteKey = process.env.API_KEY;
    const nlpData = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${siteKey}&url=${url}&lang=en`)
    .then((res) => res.json())
    .catch((error) => console.log(error));
    const { confidence,subjectivity, irony,status} = nlpData;
    res.status(200).json({
        confidence,subjectivity, irony,status
    })

})









app.listen(port , ()=>{
    console.log(`server is running : ${port}`)
})