import express from "express";
var exphbs = require('hbs');
const bodyParser = require('body-parser')
const configViewEngine = (app) => {
    app.use(express.static('./public'))
    app.set('view engine', '.hbs');
    app.use(bodyParser.urlencoded({ extended: false }))
    app.set("views", "./views")
}
export default configViewEngine