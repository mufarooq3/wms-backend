const express = require('express');
const passport = require('passport');
const itemCtrl = require('../controllers/item.controller');

const router = express.Router();

router.use(passport.authenticate('jwt', { session: false }))

router.get('/list/:limit?/:offset?', itemCtrl.list);
router.get('/get', itemCtrl.get);
router.post('/create', itemCtrl.create);
router.post('/update', itemCtrl.update);
router.delete('/delete', itemCtrl.deleteItem);

module.exports = router;