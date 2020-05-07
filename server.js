const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dbConfig = require('./database/db');

const medicineBag = require('./route/medicineBag.route');


mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('database successfully connected');
},
    error => {
        console.log('database connection fail');
    }
)

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/medicineBag', medicineBag);

const uri = process.env.ATLAS_URI;

const server = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

app.use((req, res, next) => {
    next(createError(404));
})