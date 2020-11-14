const { Router } = require('express');
const TagComponent = require('../Tag');
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
router.post('/create', isRole.isSeller, TagComponent.createTag);

/**
 * Route for get tag
 * @name /tag/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/:id', TagComponent.getTag);

/**
 * Route for getting all tags
 * @name /tag/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', TagComponent.getAllTags);

module.exports = router;
