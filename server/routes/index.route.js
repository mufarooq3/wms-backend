const express = require('express');
const authRoutes = require('./auth.route');
const userRoutes = require("./user.route")


const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
    res.send('OK')
);
// router.use('/exports',express.static(process.cwd()+'/server/exports'));
// router.use('/firmwareDownload',express.static(process.cwd()+'/server/assests/Firmwares'));
router.use('/auth', authRoutes);
router.use('/user', userRoutes);
module.exports = router;
