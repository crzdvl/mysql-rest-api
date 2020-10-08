const { Router } = require('express');
const SellerComponent = require('../Seller');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a new user
 * @name /seller/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/signup', SellerComponent.signup);

module.exports = router;
