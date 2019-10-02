const express = require('express');
const bodyParser = require("body-parser");

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var result = Number;


app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With,Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS");
    next();
});

app.post("/api/posts", (req, res, next) => {
    const data = req.body;
    var input = [];
   
    for(var inputdata in data) {
        // console.log(data[inputdata]);
        input.push(data[inputdata]);
        
        
    }

    CalculatedMonney(input[0],input[1],input[2]);
   
    res.status(201).json({
        message: 'Post added successfully',

        result: result
        
    });

    result = null;
    
});

function CalculatedMonney (cur, amt, concurr){
    
    
    if(cur == 'bath' && concurr == 'usd') result = amt / 30;
    if(cur == 'bath' && concurr == 'yen') result = amt * 3.5;
    if(cur == 'bath' && concurr == 'pound') result = amt / 37.85;

    //  console.log(result, concurr);
    return result;
  
}

app.get('/api/posts',(req, res, next) => {
    const data = [
        {
            name: 'BATH',
            id: 'bath',
            country: 'Thailand'
        },
        {
            name: 'USD',
            id: 'usd',
            country: 'America'
        },
        {
            name: 'YEN',
            id: 'yen',
            country: 'Japan'
        },
        {
            name: 'POUND',
            id: 'pound',
            country: 'United Kingdom'
        },
        {
            name: 'DONG',
            id: 'dong',
            country: 'Vietnam'
        },
        {
            name: 'RENMINBI',
            id: 'renminbi',
            country: 'China'
        },
        {
            name: 'WON',
            id: 'won',
            country: 'South Korea'

        },
        {
            name: 'RUPEE',
            id: 'rupee',
            country: 'Pakistan'
        },
        {
            name: 'TaiwanDollar',
            id: 'taiwandollar',
            country: 'Taiwan'
        },
    ];
    
    res.status(200).json({ message: 'Success', data: data });
    // console.log(data);
});


module.exports = app;