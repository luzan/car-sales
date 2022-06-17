const crypto = require('crypto');

module.exports = {
    authTokens: {},
    generateAuthToken: () => {
        return crypto.randomBytes(30).toString('hex');
    },
    requireAuth : (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.render('index', {
                message: 'Please login to continue',
                messageClass: 'alert-danger'
            });
        }
    }
}