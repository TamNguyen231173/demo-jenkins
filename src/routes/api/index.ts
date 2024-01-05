import { Router } from 'express'
import { shopRouter } from './shop.route'
import { authRouter } from './auth.route'
import { productRouter } from './product.route'
import { authentication } from '~/middlewares/auth.middleware'
import { discountRouter } from './discount.route'
import { cartRouter } from './cart.route'

const apiRouter = Router()

apiRouter.use('/auth', authRouter)
apiRouter.use('/shop', authentication, shopRouter)
apiRouter.use('/product', productRouter)
apiRouter.use('/discount', discountRouter)
apiRouter.use('/cart', authentication, cartRouter)

export default apiRouter
