import express from 'express';
import items from './items';
import detail from './detail';

const ApiRouter = express.Router();

ApiRouter.route("/items").get(items)
ApiRouter.route("/items/:itemId").get(detail);

export default ApiRouter;
