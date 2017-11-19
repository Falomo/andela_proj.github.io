const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const cors = require('cors');


const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(routes);

app.listen(process.env.PORT || 4000, () => {
    console.log(`app listening at port ${process.env.PORT || 4000}`);
})