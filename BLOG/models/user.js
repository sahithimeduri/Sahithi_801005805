const mongoose = require('mongoose')
const marked = require('marked')
const slugify = require('slugify')
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true
    }, 
    username: {
        type: String,
        required: true
    }, 
    password: {
        type: String,
        required: true
    }, 
    joinedOn: {
        type: Date,
        default: Date.now 
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.pre('validate', function(next) {
    if (this.name) {
      this.slug = slugify(this.name, { lower: true, strict: true })
    }
    if (this.email) {
        this.slug = slugify(this.email, { lower: true, strict: true })
    }
    next()
})

module.exports = mongoose.model('User', userSchema)