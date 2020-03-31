const { Router } = require("express");

const router = Router();
const controllers = require('../api/controllers');

router.get("/ting", (req, res) => {
    res.send("tong");
});

let inforRouter = Router();
inforRouter.get('/', controllers.Information.get);

router.use('/information', inforRouter);


module.exports = router;