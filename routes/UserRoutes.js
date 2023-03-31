const router = require('express').Router()
const User = require('../models/User')


//creating user

router.post('/', async (req, res) => {
    try {
        const { name, email, password, picture } = req.body
        console.log(req.body)
        const result = await User.create({ name, email, password, picture })
        res.status(201).json(result)
    } catch (e) {
        let msg;
        if (e.code == 11000) {
            msg = 'user already exists'
        } else {
            msg = e.message
        }
        console.log(e)
        res.status(400).json(msg)
    }
})

//login user

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        console.log(req.body)
        const result = await User.findByCredentials(email, password)
        result.status = 'online'
        await User.save
        res.status(201).json(result)
    } catch (e) {
        console.log(e)
        res.status(400).json(e.message)
    }

})

module.exports = router