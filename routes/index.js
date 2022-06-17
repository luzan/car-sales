const express = require('express');
const { loginIndex, loginUser, registerIndex, registerPost } = require('../controllers/loginController');
const router = express.Router();
const { authTokens, generateAuthToken } = require('../middlewares/authTokens')


router.get('/', loginIndex);
router.post('/', (req, res)=> {
    const { username, password, remember } = req.body;
    loginUser(username, password, (resp) => {
        if (resp.success === true) {
            const minute = 2 * 60 * 1000;
            const authToken = generateAuthToken();
            authTokens[authToken] = username;
            remember? res.cookie('AuthToken', authToken, { maxAge: minute }) : res.cookie('AuthToken', authToken);
            res.redirect('/cars');
        } else {
            res.render('index');
        }
    })
});
router.get('/register', registerIndex);
router.post('/register', registerPost);

module.exports = router;