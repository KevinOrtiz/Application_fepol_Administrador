let express = require('express');
let bodyParser = require('body-parser');
let app = express();
let path = require('path');
let hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine','hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.json());

app.listen(3001,()=>{
    console.log("Server is running");

});

require('./router')(app);

app.use(function(req,res,next){
    res.status(404).render('page_404');
    
});

app.use(function(req,res,next){
    res.status(500).render('page_500');
    
});
