const CategoryService = require('./service');
// const AuthService = require('../Auth/service');
const CategoryValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

/**
 * @function getAllTags
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getAllCategories(req, res, next) {
    try {
        const categories = await CategoryService.getAllCategories();

        return res.status(200).json({
            status: 'all categories.',
            categories
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.message });
        }

        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

/**
 * @function createTag
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createCategory(req, res, next) {
    try {
        const { error } = CategoryValidation.category(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const category = await CategoryService.createTag(req.body);

        return res.status(200).json({
            status: 'Category was succesfully created!',
            category
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({ error: error.message });
        }

        if (error instanceof ParamsError) {
            return res.status(403).json({ error: 'params error' });
        }

        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

module.exports = {
    createCategory,
    getAllCategories
};
