const { Router } = require('express');
const CustomerComponent = require('../Customer');
const isRole = require('../../polices/isRole');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a new user
 * @name /customer/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/signup', CustomerComponent.signup);

/**
 * Route for getting personal seller information
 * @name /seller/me
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/me', isRole.isCustomer, CustomerComponent.getPersonalInformation);

module.exports = router;
