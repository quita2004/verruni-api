const { Router } = require("express");

const router = Router();
const controllers = require('../api/controllers');

router.get("/ting", (req, res) => {
    res.send("tong");
});

let inforRouter = Router();
inforRouter.get('/', controllers.Information.get);

router.use('/information', inforRouter);

let sliderRouter = Router();
sliderRouter.get('/:id', controllers.Slider.get);
sliderRouter.post('/', controllers.Slider.create);

router.use('/slider', sliderRouter);

module.exports = router;