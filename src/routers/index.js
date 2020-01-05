const { Router } = require("express");

const router = Router();
const controllers = require('../api/controllers');

router.get("/ting", (req, res) => {
    res.send("tong");
});

let usersRouter = Router();
usersRouter.get('/', controllers.Users.getAll);
usersRouter.get('/:id', controllers.Users.get);

router.use('/users', usersRouter);


module.exports = router;