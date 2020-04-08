const { Router } = require("express");
const adminController = require('../../controllers/admin');
const middleware = require('../../src/routers/middleware');
module.exports = function (passport) {
  const router = Router();

  router.get('/slider', middleware.isAuthenticated, adminController.Slider.get);
  router.get('/post', middleware.isAuthenticated, adminController.Post.get);
  router.get('/product', middleware.isAuthenticated, adminController.Product.get);
  router.get('/info', middleware.isAuthenticated, adminController.Info.get);
  router.get('/', middleware.isAuthenticated, adminController.Info.get);

  router.get('/login', function (req, res) {
    req.logout();
    res.render('admin/pages/login');
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login',
    failureFlash: true
  }));

  // router.post('/signup', passport.authenticate('signup', {
  //   successRedirect: '/home',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }));

  router.get('/', adminController.Home.get);

  return router;
};