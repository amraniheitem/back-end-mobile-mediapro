const express = require('express')
const router = express.Router()
const controller = require('../controllers/eventController')



router.route('/')
        .get(controller.getAllEvent)

router.route('/:id')
        .get(controller.getOneEvent)
        
module.exports=router