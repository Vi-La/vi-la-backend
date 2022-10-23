const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require("cors");

const authRoute = require('./routes/User')
const newsRoute = require('./routes/News')
const TestimonialRoute = require('./routes/Testimonials')
const LessonRoute = require('./routes/LessonOfDay')
const GalleryRoute = require('./routes/Gallery')
const MessageRoute = require('./routes/Message')
const ContactUsRoute = require('./routes/GetInTouch')
const CommunityRoute = require('./routes/Community')
const HistoryRoute = require('./routes/History')

dotenv.config()

mongoose
.connect(process.env.DATABASE_URL)
.then(()=> console.log("Db connected"))
.catch((err)=> console.log(err))
const port = process.env.PORT || 3000
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())


app.use('/api/v1/users', authRoute)
app.use('/api/v1/news', newsRoute)
app.use('/api/v1/message', MessageRoute)
app.use('/api/v1/testimonial', TestimonialRoute)
app.use('/api/v1/lesson', LessonRoute)
app.use('/api/v1/gallery', GalleryRoute)
app.use('/api/v1/community', CommunityRoute)
app.use('/api/v1/leader', ContactUsRoute)
app.use('/api/v1/history', HistoryRoute)

app.listen(port, ()=>{
    console.log(`App is runnng on http://locolhost:${port}`)
})