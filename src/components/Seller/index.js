const SellerService = require('./service');
const AuthService = require('../Auth/service');
const SellerValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

/**
 * @function signup
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signup(req, res, next) {
    try {
        const { error } = SellerValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        const emailToken = await AuthService.createEmailToken(req.body.email, 'sellers');
        const hashedPassword = await AuthService.hashPassword(req.body);

        await SellerService.create(req.body, hashedPassword);

        await AuthService.sendEmailToken(req.body.email, emailToken);

        return res.status(200).json({
            status: 'user registered.'
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

/**
 * @function findAll
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findAll(req, res, next) {
    try {
        const sellers = await SellerService.findAll();

        return res.status(200).json({
            sellers
        });
    } catch (error) {
        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

/**
 * @function findById
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function findById(req, res, next) {
    try {
        const { error } = SellerValidation.findById(req.params);

        if (error) {
            throw new ValidationError(error.details);
        }

        const seller = await SellerService.findById(req.params.id);

        return res.status(200).json({
            seller
        });
    } catch (error) {
        if (error instanceof ValidationError) {
            return res.status(422).json({
                error: error.message
            });
        }

        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

/**
 * @function getPersonalInformation
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function getPersonalInformation(req, res, next) {
    try {
        const decodedToken = await AuthService.decodeToken(req.header('refreshToken'));
        const seller = await SellerService.findById(decodedToken.id);

        return res.status(200).json({
            seller
        });
    } catch (error) {
        res.status(500).json({
            name: error.name,
            message: error.message
        });

        return next(error);
    }
}

module.exports = {
    signup,
    findAll,
    findById,
    getPersonalInformation
};
