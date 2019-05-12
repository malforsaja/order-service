import { Router } from 'express';
const order = require('../controllers/order-controller');

const router = Router();

router.get("/", order.findAllOrders);

router.post("/", order.create);

export default router;