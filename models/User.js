const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Can't be Blank"]
    },

    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: [true, "Can't be Blank"],
        index: true,
        validate: [isEmail, 'in valid email']
    },
    password: {
        type: String,
        required: [true, "Can't be Blank"]
    },
    picture: {
        type: String,
    },
    newMessages: {
        type: Object,
        default: {}
    },
    status: {
        type: String,
        default: "online",
    }

}, { minimize: false })

UserSchema.pre('save', function (next) {
    const user = this
    if (!user.isModified('password')) return next()

    bcrypt.genSalt(10, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            user.password = hash;
            next()
        })
    })
})




UserSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

UserSchema.statics.findByCredentials = async function (email, password) {
    const responce = await User.findOne({ email })
    if (!responce) throw new Error('invalid email or password')

    const isMatch = await bcrypt.compare(password, responce.password)
    if (!isMatch) throw new Error('invalid email or password')
    return responce
}



const User = mongoose.model('user', UserSchema)

module.exports = User