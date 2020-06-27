const express = require('express')
const router = express.Router()

const User = require('./../models/user')

// router.get('/listUsers', (req, res, next) => {
//     res.render('users/listUsers', { })
// });
// router.get('/login', (req, res) => {
//     res.render('posts/login')
// })
// router.get('/../users/login.ejs', (req, res, next) => {
//     res.render('../users/login.ejs', {})
// });

router.get('/addUser', (req, res) => {
    res.render('users/addUser', { user: new User() })
})
router.get('/updateUser/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    res.render('users/updateUser', { user: user })
})

router.get('/:slug', async (req, res) => {
    const user = await User.findOne({ slug: req.params.slug })
    if (user == null) res.redirect('/')
    res.render('users/showUser', { user: user })
})

router.post('/', async (req, res, next) => {
    req.user = new User()
    next()
}, saveUserAndRedirect('listUsers'))
  
router.put('/:id', async (req, res, next) => {
    req.user = await User.findById(req.params.id)
    next()
}, saveUserAndRedirect('showUser'))

router.delete('/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    res.redirect('/users/listUsers')
}) 

function saveUserAndRedirect(path) {
    return async (req, res) => {
        let user = req.user
        user.name = req.body.name
        user.email = req.body.email
        user.username = req.body.username
        user.password = req.body.password
        try {
            user = await user.save()
            res.redirect(`/users/${user.slug}`)
        } catch (e) {
            res.render(`users/${path}`, { user: user })
        }
    }
}


module.exports = router;