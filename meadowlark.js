const express = require('express');
const exphbs = require('express-handlebars');
const handlers = require('./lib/handlers');

const port = process.env.PORT || 3001;
const meadowlark = express();

meadowlark.engine('handlebars', exphbs({
    defaultLayout: 'main',
    helpers: {
        section: function (name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        },
    },

}));
meadowlark.set('view engine', 'handlebars');

meadowlark.use(express.static(__dirname + '/public'));

meadowlark.get('/', handlers.home);

meadowlark.get('/about', handlers.about);

meadowlark.use(handlers.notFound);

meadowlark.use(handlers.serverError);

if(require.main === module) {
    meadowlark.listen(port, () => console.log(
        `Express запущен на https://localhost:${port};` +
        `нажмите Ctr+C для завершения.`
    ));
} else {
    module.exports = meadowlark;
}

