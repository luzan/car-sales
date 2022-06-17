const express = require('express');
const {  
    getCars,
    newCarForm,
    postNewCar,
    editCarForm,
    editCarRequest,
    deleteCar } = require('../controllers/carController');
const router = express.Router();
const { authTokens, requireAuth } = require('../middlewares/authTokens')


router.get('/', requireAuth, getCars);
router.get('/new', requireAuth, newCarForm);
router.post('/', requireAuth, postNewCar);
router.get('/:id/edit', requireAuth, editCarForm);
router.put('/:id', requireAuth, editCarRequest);
router.delete('/:id', requireAuth, deleteCar)

module.exports = router;