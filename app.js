const express = require('express');
const exphbs = require('express-handlebars');
const fortune = require('./lib/fortune');

const port = process.env.PORT || 3001;
const app = express();

app.engine('handlebars', exphbs({
    defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => res.render('home'));

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune()});
});

app.use((req, res) => {
    res.status(404);
    res.render('404')
});

app.use((err, req, res) => {
   console.error(err.message);
   res.status(500);
    res.render('500')
});

app.listen(port, () => console.log(
    `Express запущен на https://localhost:${port};` +
    `нажмите Ctr+C для завершения.`
));