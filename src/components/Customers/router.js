const { Router } = require('express');
const CustomersComponent = require('../Customers');
const isRole = require('../../polices/isRole');

/**
 * Express router to mount user related functions on.
 * @type {Express.Router}
 * @const
 */
const router = Router();

/**
 * Route for getting all preoducts.
 * @name /customer/
 * @function
 * @inner
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware
 */
router.get('/', isRole.isCustomer, CustomersComponent.getAllProducts);

module.exports = router;
