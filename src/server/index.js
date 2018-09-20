function generateLine() {
    const name = generateRandomString();
    const len = getRandomInt(0,100);
    const date = getRandomDate(new Date('01-01-2017'), new Date('09-01-2018'));
    const newStream = [];

    for (let i=0; i<len; ++i) {
        newStream[i] = {
            value: getRandomInt(0,100),
            type: getRandomInt(0,2),
        }
    }

    return {
        date,
        objectId: name,
        data: newStream,
        
    };
}

function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDate(from, to) {
    from = from.getTime();
    to = to.getTime();
    return new Date(from + Math.random() * (to - from));
}

const express = require('express');
const app = express();

app.use(express.json()); 
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/login', function (req, res) {
    try {
        if(req.body.username === 'admin' && req.body.password === 'admin' ){
            res.send({success: true});
        } else {
            res.send({success: false});
        }
    } catch (e) {
        res.send({success: false});
    }
  })

app.get('/data', (req, res) => {
    let response = [];
    let len = getRandomInt(50, 100);
    if(req.query.length) {
        len = req.query.length;
    }
    for (let i=0; i<len; ++i) {
        response.push(generateLine());
    }
    res.send(response);
});
app.listen(3000, () => console.log('Listening on port 3000!'));