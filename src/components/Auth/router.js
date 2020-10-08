const { Router } = require('express');
const AuthComponent = require('../Auth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route verify token
 * @name /auth/verify/:token
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/verify/:token', AuthComponent.verify);

/**
 * Route login user
 * @name /auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login', AuthComponent.login);

/**
 * Route update connection user
 * @name /auth/updateConnection
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/updateConnection', AuthComponent.updateConnection);

module.exports = router;
