import { Schema, Document, model } from 'mongoose'
import { IItem } from './Item'
import { IInvoice } from './Invoice'

export interface IUser extends Document {
    _id: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    dateCreated: string,
    invoices: IInvoice[],
    cart: IItem[],
    wishList: IItem[],
}

const userSchema: Schema = new Schema({
    _id: { 
        type: Schema.Types.ObjectId 
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { 
        type: String,
        required: true
    },
    dateCreated: { 
        type: Date ,
        default: Date.now
    },
    invoices: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Invoice'
        }
    ],
    cart: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ],
    wishList: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Item'
        }
    ]
})

export const User = model<IUser>('User', userSchema)