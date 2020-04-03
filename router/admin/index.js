const { Router } = require("express");
const adminController = require('../../controllers/admin');
const router = Router();

router.get('/slider', adminController.Slider.get);
router.get('/post', adminController.Post.get);

router.get('/', adminController.Home.get);

module.exports = router;