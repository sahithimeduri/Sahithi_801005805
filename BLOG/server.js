const express = require('express')
const mongoose = require('mongoose')
let Post = require('./models/post')
let User = require('./models/user')
let userRouter = require('./routes/users')
let postRouter = require('./routes/posts')
const methodOverride = require('method-override')
const app = express()

mongoose.connect('mongodb://localhost/blog', {
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended:false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const posts = await Post.find()
    res.render('posts/index', { posts: posts })
})

app.get('/posts/login', async (req, res) => {
    res.render('posts/login')
})

// this is exciting, this code below routes to users list when login is clicked
app.get('/users/listUsers', async (req, res) => {
    const users = await User.find().sort({ joinedOn: 'desc' })
    res.render('users/listUsers', {users: users})
})

// app.get('/posts/login', async (req, res) => {
//     res.render('posts/login')
// })
app.use('/posts', postRouter)
app.use('/users', userRouter)
app.listen(5000)

// first start mongodb: brew services start mongodb-community@4.2
// to stop: brew services stop mongodb-community@4.2 