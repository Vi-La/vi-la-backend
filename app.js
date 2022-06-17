const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");

const authRoute = require('./routes/User')
const newsRoute = require('./routes/News')
const TestimonialRoute = require('./routes/Testimonials')
const SaintRoute = require('./routes/Sainter')
const MessageRoute = require('./routes/Message')
const ContactUsRoute = require('./routes/GetInTouch')
const CommunityRoute = require('./routes/Community')

dotenv.config()

mongoose
.connect(process.env.DATABASE_URL)
.then(()=> console.log("Db connected"))
.catch((err)=> console.log(err))

const port = process.env.PORT || 3000

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


// =====Start:: Auth ====
app.use('/api/v1/users', authRoute)
// =====End:: Auth ====

// =====Start:: news ====
app.use('/api/v1/news', newsRoute)
// =====End:: News ====

// =====Start:: message ====
app.use('/api/v1/message', MessageRoute)
// =====End:: message ====

// =====Start:: Testimonials ====
app.use('/api/v1/testimonial', TestimonialRoute)
// =====End:: Testimonials ====

// =====Start:: Saint ====
app.use('/api/v1/saint', SaintRoute)
// =====End:: Saint ====

// =====Start:: Community ====
app.use('/api/v1/community', CommunityRoute)
// =====End:: Community ====

//=====Start:: Community member ======
app.use('/api/v1/getInTouch', ContactUsRoute)
//=====End:: Community member ======

app.listen(port, ()=>{
    console.log(`App is runnng on http://locolhost:${port}`)
})