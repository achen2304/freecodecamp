require('dotenv').config()
let express = require('express');
let bodyParser = require('body-parser');
const res = require('express/lib/response');
let app = express();

//4
let absolutePath = __dirname + '/views/index.html'
app.use('/public', express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({extended: false}));
//6
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
})

//3
app.get('/', (req, res) => {
    res.sendFile(absolutePath);
  })

//5
app.get('/json', (req, res) => {

    // Check the environment variable and apply transformation
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"})
    } else 
    {
        res.json({"message": "Hello json"})
    }

});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({"time": req.time});
}
)

app.get("/:word/echo", (req, res) => {
    res.json({ echo: req.params.word });
});

//10 
app.get("/name", (req, res) => {
    res.json({ name: req.query.first + " " + req.query.last })
})


//12 
app.post("/name", (req, res) => {
    res.json({ name: req.body.first + " " + req.body.last })
})



 module.exports = app;
