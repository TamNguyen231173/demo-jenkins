"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discountRouter = void 0;
const express_1 = require("express");
const discount_controller_1 = require("~/controllers/discount.controller");
const auth_middleware_1 = require("~/middlewares/auth.middleware");
exports.discountRouter = (0, express_1.Router)();
exports.discountRouter.get('/:shop_id/get-products', discount_controller_1.DiscountController.getAllProductsWithDiscountCode);
exports.discountRouter.get('/:shop_id/get-discounts', discount_controller_1.DiscountController.getAllDiscountsCodeByShop);
exports.discountRouter.post('/:shop_id/get-discount-amount', discount_controller_1.DiscountController.getDiscountAmount);
exports.discountRouter.use(auth_middleware_1.authentication);
exports.discountRouter.post('/', discount_controller_1.DiscountController.createDiscountCode);
exports.discountRouter.delete('/:discount_id/delete-discount', discount_controller_1.DiscountController.deleteDiscountCode);
exports.discountRouter.patch('/:shop_id/:discount_id/cancel-discount', discount_controller_1.DiscountController.cancelDiscountCode);
