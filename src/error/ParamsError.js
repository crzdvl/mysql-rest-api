/**
 * @exports
 * @extends Error
 */
class ParamsError extends Error {
    /**
     * @constructor
     * @param {object} message
     */
    constructor(message) {
        super();
        this.message = message;
        this.name = 'E_THIS_EMAIL_IS_ALREADY_EXISIT';
    }
}

module.exports = ParamsError;
