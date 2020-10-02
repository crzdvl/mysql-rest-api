const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');
const { checkRole } = require('./service');

/**
 * @function signup
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function signup(req, res, next) {
    try {
        const { error } = AuthValidation.create(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        if (!checkRole(req.body.role)) throw new ParamsError();

        const result = await AuthService.findUserByEmail(req.body.email, req.body.role);

        if (result.length) {
            throw new ParamsError();
        }

        const emailToken = await AuthService.createEmailToken(req.body.email, req.body.role);

        await AuthService.create(req.body, req.body.role);

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
 * @function verify
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function verify(req, res, next) {
    try {
        const data = await AuthService.decodeToken(req.params.token);

        const user = await AuthService.findUserByField(data.role, 'email', data.email);

        if (!user[0]) {
            throw new Error();
        }

        await AuthService.updateById(data.role, user[0].id, 'valid', true);

        return res.status(200).json({
            status: 'verify',
            data: user
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
 * @function login
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function login(req, res, next) {
    try {
        const { error } = await AuthValidation.login(req.body);

        if (error) {
            throw new ValidationError(error.details);
        }

        if (!checkRole(req.body.role)) throw new ParamsError();

        const user = await AuthService.findUserByField(req.body.role, 'email', req.body.email);

        if (user[0].password !== req.body.password || !user[0].valid) {
            throw new ParamsError();
        }

        const refreshToken = await AuthService.createRefreshToken(user[0].email, req.body.role);
        const accessToken = await AuthService.createAccessToken(user[0].email, req.body.role);

        return res.status(200).json({
            status: 'login',
            data: user,
            tokens: {
                refresh: refreshToken,
                access: accessToken
            }
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
 * @function updateConnection
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function updateConnection(req, res, next) {
    try {
        const token = req.header('refreshToken');

        if (!token) {
            res.redirect('auth/login');
        }

        const user = AuthService.decodeToken(token);

        const refreshToken = await AuthService.createRefreshToken(user.email, req.body.role);
        const accessToken = await AuthService.createAccessToken(user.email, req.body.role);

        return res.status(200).json({
            status: 'updated connection',
            data: user,
            tokens: {
                refresh: refreshToken,
                access: accessToken
            }
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
 * @function createTag
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 * @returns {Promise < void >}
 */
async function createTag(req, res, next) {
    try {
        const token = req.header('refreshToken');

        if (!token) {
            res.redirect('auth/login');
        }

        const user = AuthService.decodeToken(token);

        const refreshToken = await AuthService.createRefreshToken(user.email, req.body.role);
        const accessToken = await AuthService.createAccessToken(user.email, req.body.role);

        return res.status(200).json({
            status: 'updated connection',
            data: user,
            tokens: {
                refresh: refreshToken,
                access: accessToken
            }
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
    signup,
    verify,
    login,
    updateConnection,
    createTag
};
