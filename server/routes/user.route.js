const express = require('express');
const passport = require('passport');
const asyncHandler = require('express-async-handler');
const userCtrl = require('../controllers/user.controller');

const router = express.Router();
module.exports = router;

// router.use(passport.authenticate('jwt', { session: false }))

router.post('/update-password', userCtrl.updatePassword);
router.get('/list/:limit?/:offset?', userCtrl.list);
router.get('/get', userCtrl.get);
router.post('/create', userCtrl.create);
router.delete('/delete', userCtrl.deleteUser);