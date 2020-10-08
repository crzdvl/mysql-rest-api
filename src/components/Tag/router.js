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
 * @name /seller/createTag
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.post('/createTag', isRole.isSeller, SellerComponent.createTag);

/**
 * Route for create tag
 * @name /seller/createTag
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/allTags', SellerComponent.getAllTags);

module.exports = router;
