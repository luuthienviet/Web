const express = require('express');
const router = express.Router();
const orderController = require('../controllers/oderController');
const auth = require('../middlewares/auth');

router.get('/', auth, orderController.getOrders);
router.post('/', auth, orderController.createOrder);

module.exports = router;