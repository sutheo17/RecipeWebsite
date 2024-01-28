
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('static'));
app.use(express.static(__dirname + '/static'));

require('./routes/foodTask')(app);
require('./routes/ingredientTask')(app);

app.use((err, req,res,next) =>{
    res.end('Probléma van...');
    console.log(err);
});



var server = app.listen(3000, function () {
    console.log("Listening on: 3000")
});

