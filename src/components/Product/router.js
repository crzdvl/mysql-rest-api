const { Router } = require('express');
const SellerComponent = require('../Product');
const isRole = require('../../polices/isRole');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for create product
 * @name /product/create
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/create', isRole.isSeller, SellerComponent.createProduct);

/**
 * Route for create tag
 * @name /product/all
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/all', SellerComponent.getAllProducts);

module.exports = router;