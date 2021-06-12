const express=require('express');
const mongoose=require('mongoose');
const user=require('./routes/route');
const blogs=require('./routes/blogroutes');
const comment = require('./routes/commentroutes');
const bodyParser = require('body-parser');
// const passport=require('passport');
const cors=require('cors');
const app=express();

const config=require('./config/database');
const port = 3001;
//connecting to a database
// const dev_db_url = 'mongodb://localhost/db2';
const dev_db_url = config.database;
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
  console.log("db connected!");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
// require('./config/passport')(passport);
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/user', user);
app.use('/blogs', blogs);
app.use('',comment);
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
})