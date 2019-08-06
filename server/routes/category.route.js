const express = require('express');
const passport = require('passport');
const categoryCtrl = require('../controllers//category.controller');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }))

router.get('/list/:limit?/:offset?', categoryCtrl.list);
router.get('/get', categoryCtrl.get);
router.post('/create', categoryCtrl.create);
router.post('/update', categoryCtrl.update);
router.delete('/delete', categoryCtrl.deleteCategory);

module.exports = router;