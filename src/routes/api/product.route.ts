import { Router } from 'express'
import { ProductController } from '~/controllers/product.controller'
import { authentication } from '~/middlewares/auth.middleware'

export const productRouter = Router()

// Customer
productRouter.get('/search', ProductController.searchProducts)

// Shop
productRouter.use(authentication)
productRouter.post('/create', ProductController.create)
productRouter.get('/draft/all', ProductController.getAllDraftsForShop)
productRouter.get('/published/all', ProductController.getAllPublishedForShop)
productRouter.patch('/publish/:id', ProductController.publishProductByShop)
productRouter.patch('/unpublish/:id', ProductController.unPublishProductByShop)
