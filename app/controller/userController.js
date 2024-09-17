const userModel = require('../model/userModel')
const fs = require('fs')
const path = require('path')

module.exports = {

    getUserPage: (req, res) => {

        const users = userModel.getAllUsers()
        const filePath = path.join(__dirname, '..','views', 'index.html')
        const html = fs.readFileSync(filePath, 'utf8')
        const modifieldHtml = html.replace('{{users}}', JSON.stringify(users))
        res.send(modifieldHtml)
    },

    getUserData: (req, res) => {

        const users = userModel.getAllUsers()
        res.json(users)

    }
}