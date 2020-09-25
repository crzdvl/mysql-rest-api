const Validation = require('../validation');

/**
 * @exports
 * @class
 * @extends Validation
 */
class AuthValidation extends Validation {
    /**
     * @param {String} profile.email
     * @param {String} profile.fullName
     * @param {String} profile.username
     * @returns
     * @memberof AuthValidation
     */
    create(profile) {
        return this.Joi.object({
            email: this.Joi.string().email(),
            password: this.Joi.string().required(),
            username: this.Joi.string().min(3).max(30).required()
        }).validate(profile, {
            allowUnknown: true
        });
    }
}

module.exports = new AuthValidation();
