const express =require('express');
const app=express();
const bodyparser=require('body-parser')


const PORT= process.env.PORT || 5000



//config bodyparser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))



//server started///////////////

app.listen(PORT, () => {
    console.log("server started on port :"+PORT);
})



//define routes   from controller
const routes = require("./controllers/routes");
app.use('/api', routes)
//localhost:3000/api/
