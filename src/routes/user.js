const express = require('express')
const userControllers = require('../controllers/user')
const router = express.Router()

router.post('/register', userControllers.register)
router.get('/all', userControllers.readAll)
router.get('/:id', userControllers.readme)
router.put('/:id', userControllers.update)
router.delete('/:id/delete', userControllers.delete)

module.exports = router