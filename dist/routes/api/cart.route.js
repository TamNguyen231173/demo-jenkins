"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cart_controller_1 = require("~/controllers/cart.controller");
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.post('/add-to-cart', cart_controller_1.CartController.addToCart);
exports.cartRouter.post('/add-to-cart-v2', cart_controller_1.CartController.addToCartV2);
exports.cartRouter.post('/delete-product-from-cart', cart_controller_1.CartController.deleteProductFromCart);
exports.cartRouter.get('/list-carts', cart_controller_1.CartController.getListCarts);