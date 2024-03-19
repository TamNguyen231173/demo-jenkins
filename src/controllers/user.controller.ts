import { Request, Response } from 'express'
import { UserService } from '~/services/user.service'

export class UserController {
  static async newUser(req: Request, res: Response) {
    await UserService.newUser(req.body)
    res.json({ message: 'Email verify sent, please check your email' })
  }

  // static checkRegisterEmailToken(req: Request, res: Response) {}
}
