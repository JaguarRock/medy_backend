const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport =  require('passport');
const bodyParser = require('body-parser');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));//
//app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser : true, useCreateIndex : true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const userRouter = require('./route/user.route');
const medicineBagRouter = require('./route/medicineBag.route');
const hosptialRouter = require('./route/hospital.route');
const openRouter = require('./route/open.route');

app.use(passport.initialize());
app.use('/medicineBag', medicineBagRouter);
require('./config/passport')(passport)
app.use('/user.route', userRouter);
app.use('/hospital', hosptialRouter);
app.use('/open', openRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});