const { Router } = require('express');
const UserComponent = require('../Auth');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route serving a new user
 * @name /v1/signup
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/signup', UserComponent.signup);

/**
 * Route verify token
 * @name /auth/verify/:token
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/verify/:token', UserComponent.verify);

/**
 * Route login user
 * @name /auth/login
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/login', UserComponent.login);

/**
 * Route update connection user
 * @name /auth/updateConnection
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/updateConnection', UserComponent.updateConnection);

/**
 * Route logout user
 * @name /auth/logout
 * @function
 * @inner
 * @param {string} path -Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/logout', UserComponent.logout);

module.exports = router;
