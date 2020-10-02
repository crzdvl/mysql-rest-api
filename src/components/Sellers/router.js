const { Router } = require('express');
const SellerComponent = require('../Sellers');
const isRole = require('../../polices/isRole');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for create product
 * @name /seller/createProduct
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/createProduct', isRole.isSeller, SellerComponent.createProduct);

/**
 * Route for create tag
 * @name /seller/createTag
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/createTag', isRole.isSeller, SellerComponent.createTag);

module.exports = router;
