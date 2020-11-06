const { Router } = require('express');
const SellerComponent = require('../Seller');
const isRole = require('../../polices/isRole');

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

/**
 * Route for getting all sellers
 * @name /seller/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', isRole.isRegisteredUser, SellerComponent.findAll);

/**
 * Route for getting personal seller information
 * @name /seller/me
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/me', isRole.isSeller, SellerComponent.getPersonalInformation);

/**
 * Route for getting information about one seller
 * @name /seller/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/:id', isRole.isRegisteredUser, SellerComponent.findById);

module.exports = router;
