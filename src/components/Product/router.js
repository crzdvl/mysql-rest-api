const { Router } = require('express');
const ProductComponent = require('../Product');
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
router.post('/create', isRole.isSeller, ProductComponent.createProduct);

/**
 * Route for getting seller products
 * @name /product/seller
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/seller', isRole.isSeller, ProductComponent.getSellerProducts);

/**
 * Route for get product
 * @name /product/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/:id', ProductComponent.getProduct);

/**
 * Route for getting all products
 * @name /product/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', ProductComponent.getAllProducts);

module.exports = router;
