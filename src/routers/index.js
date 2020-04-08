const { Router } = require("express");

const router = Router();
const controllers = require('../api/controllers');

router.get("/ting", (req, res) => {
    res.send("tong");
});

let inforRouter = Router();
inforRouter.get('/', controllers.Information.get);
inforRouter.post('/update', controllers.Information.update);

router.use('/information', inforRouter);

let sliderRouter = Router();
sliderRouter.get('/:id', controllers.Slider.get);
sliderRouter.post('/', controllers.Slider.create);
sliderRouter.post('/update', controllers.Slider.update);
sliderRouter.post('/delete/:id', controllers.Slider.delete);

router.use('/slider', sliderRouter);

let postRouter = Router();
postRouter.get('/:id', controllers.Post.get);
postRouter.post('/', controllers.Post.create);
postRouter.post('/update', controllers.Post.update);
postRouter.post('/delete/:id', controllers.Post.delete);

router.use('/post', postRouter);

let productRouter = Router();
productRouter.get('/:id', controllers.Product.get);
productRouter.post('/', controllers.Product.create);
productRouter.post('/update', controllers.Product.update);
productRouter.post('/delete/:id', controllers.Product.delete);

router.use('/product', productRouter);

module.exports = router;