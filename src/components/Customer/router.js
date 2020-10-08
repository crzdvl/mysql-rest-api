const { Router } = require('express');
const CustomerComponent = require('../Customer');

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
 * Route serving a deletting user
 * @name /customer/delete
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
// router.delete('/delete', CustomerComponent.delete);

module.exports = router;
