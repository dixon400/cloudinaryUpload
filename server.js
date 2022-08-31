const express = require('express');
const db = require("./database.js")
const {config} = require("./config");
const app = express();
const port =  config.PORT;
console.log({port});
const uploads = require("./src/routes/uploads")

app.get('/', (req, res) => {
    res.json({message: 'alive'});
  });
app.use(express.urlencoded({ extended: true }));
app.use('/api', uploads)
app.listen(port, ()=>{
    console.log(`port running on ${port}`)
})