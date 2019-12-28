import { Router, Response, Request } from 'express'
import { IUser, User } from '../models/User'
import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// interface IUserModel {
    //     firstName: IUser['firstName'],
    //     lastName: IUser['lastName'],
    //     email: IUser['email'],
    //     password: IUser['password']
    //     _id: IUser['_id']
    // }
    
const tokenSecret: any = process.env.TOKEN_SECRET || "BINGO_WINGS"
const router: Router = Router()

router.get('/user/:id', async (req: Request, res: Response) => {
    res.send('User page')
})

router.post('/signup', async (req: Request, res: Response) => {

    const invalidEmail: IUser | null = await User.findOne({email: req.body.email})
    if (invalidEmail) return res.status(404).send({error: "Email already in use"})

    const hashPassword: string = bcrypt.hashSync(req.body.password, 10)

    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        _id: new mongoose.Types.ObjectId
    })

    const savedUser: Promise<IUser> = await user.save().catch(error => Promise.resolve(error))

    const token: string = await jwt.sign({_id: user._id}, tokenSecret)

    res.header({auth: token}).json(savedUser)
})

router.post('/login', async (req: Request, res: Response) => {

    const user: IUser | null = await User.findOne({email: req.body.email})
    if (!user) return res.status(404).send({error: "Email/Password Invalid"})

    const validPassword: boolean = await bcrypt.compareSync(req.body.password, user.password)
    if (!validPassword) return res.status(404).send({error: "Email/Password Invalid"})

    const token: string = await jwt.sign({_id: user._id}, tokenSecret)

    res.header({auth: token}).json(user)
})

export default router