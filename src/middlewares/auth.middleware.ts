import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { KeyTokenService } from '~/services/keyToken.service'
import { ApiError } from '~/utils/api-error.util'
import { HEADER } from './apiKey.middleware'
import { verifyJwt } from '~/utils/auth.util'
import { Shop } from '~/models/types/shop.type'
import { ShopService } from '~/services/shop.service'

const verifyToken = async (token: string, publicKey: string, userId: string) => {
  try {
    const decodedUser = (await verifyJwt({
      token,
      publicKey
    })) as Shop
    if (!decodedUser) {
      await KeyTokenService.removeKeyByUserId(userId)
      throw new Error('Invalid token')
    }
    if (userId !== decodedUser?._id) throw new Error('Invalid token')

    const shop = await ShopService.findByEmail(decodedUser.email as string)
    if (!shop) throw new Error('Invalid token')

    return shop
  } catch (error: any) {
    throw new ApiError(httpStatus.FORBIDDEN, error.message)
  }
}

export const authentication = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[HEADER.CLIENT_ID]?.toString()
  if (!userId) throw new ApiError(httpStatus.FORBIDDEN, 'Missing client id')

  const keyStore = await KeyTokenService.findByUserId(userId)
  if (!keyStore) throw new ApiError(httpStatus.NOT_FOUND, 'Client id not found')
  if (!keyStore.publicKey) throw new ApiError(httpStatus.FORBIDDEN, 'Missing public key')

  const refreshToken = req.headers[HEADER.REFRESH_TOKEN]?.toString().replace('Bearer ', '')
  const accessToken = req.headers[HEADER.AUTHORIZATION]?.toString().replace('Bearer ', '')

  try {
    if (refreshToken) {
      const decodedUser = await verifyToken(refreshToken, keyStore.publicKey, userId)
      req.keyStore = keyStore
      req.user = decodedUser
      req.refreshToken = refreshToken
    } else if (accessToken) {
      const decodedUser = await verifyToken(accessToken, keyStore.publicKey, userId)
      req.keyStore = keyStore
      req.user = decodedUser
    } else {
      throw new ApiError(httpStatus.FORBIDDEN, 'Missing access token')
    }

    return next()
  } catch (error: any) {
    return next(error)
  }
}
