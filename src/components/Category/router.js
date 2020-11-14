const { Router } = require('express');
const CategoryComponent = require('../Category');
const isRole = require('../../polices/isRole');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for create tag
 * @name /category/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/create', isRole.isSeller, CategoryComponent.createCategory);

/**
 * Route for get category
 * @name /category/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/:id', CategoryComponent.getCategory);

/**
 * Route for create tag
 * @name /category/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', CategoryComponent.getAllCategories);

module.exports = router;
