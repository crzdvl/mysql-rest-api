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
 * Route for getting all products
 * @name /product/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', ProductComponent.getAllProducts);

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
router.get('/seller', isRole.isSeller, ProductComponent.getOwnSellerProducts);

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
 * Route for get product from one seller
 * @name /product/seller/:sellerId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/seller/:sellerId', ProductComponent.getSellerProducts);

/**
 * Route for get product by tag
 * @name /product/tag/:id
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/tag/:tagId', ProductComponent.getProductsByTag);

/**
 * Route for get product by category
 * @name /product/category/:categoryId
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/category/:categoryId', ProductComponent.getProductsByCategory);

module.exports = router;
