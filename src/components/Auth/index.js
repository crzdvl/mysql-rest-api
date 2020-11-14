const AuthService = require('./service');
const AuthValidation = require('./validation');
const ValidationError = require('../../error/ValidationError');
const ParamsError = require('../../error/ParamsError');

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

        await AuthService.updateById(data.role, user[0].id, 'verify', true);

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

        const checkRoleResult = await AuthService.checkRole(req.body.role);

        if (!checkRoleResult) {
            throw new ParamsError();
        }

        const user = await AuthService.findUserByField(req.body.role, 'email', req.body.email);
        const comparePassword = await AuthService.comparePassword(req.body, user[0].password);

        if (!comparePassword || !user[0].verify) {
            throw new ParamsError();
        }

        const refreshToken = await AuthService.createRefreshToken(user[0].id, user[0].email, req.body.role);
        const accessToken = await AuthService.createAccessToken(user[0].id, user[0].email, req.body.role);

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

module.exports = {
    verify,
    login,
    updateConnection
};
