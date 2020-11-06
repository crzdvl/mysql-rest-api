const { Router } = require('express');
const SellerComponent = require('../Tag');
const isRole = require('../../polices/isRole');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for create tag
 * @name /tag/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/create', isRole.isSeller, SellerComponent.createTag);

/**
 * Route for getting all tags
 * @name /tag/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', SellerComponent.getAllTags);

module.exports = router;
