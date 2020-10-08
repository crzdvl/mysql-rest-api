const TagService = require('./service');
// const AuthService = require('../Auth/service');
const TagValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

/**
 * @function getAllTags
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getAllTags(req, res, next) {
    try {
        const products = await TagService.getAllTags();

        return res.status(200).json({
            status: 'all tags.',
            products
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
async function createTag(req, res, next) {
    try {
        const { error } = TagValidation.tag(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const tag = await TagService.createTag(req.body);

        return res.status(200).json({
            status: 'Tag was succesfully created!',
            tag: tag
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
    createTag,
    getAllTags
};
