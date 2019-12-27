import { Schema, Document, model } from 'mongoose'
import { IItem, Item } from './Item'
import { IUser, User } from './User'

export interface IInvoice extends Document {
    _id: number,
    total: number,
    paid: boolean,
    user: IUser['_id']
    items: IItem[]
    dateCreated: string,
}

const invoiceSchema: Schema = new Schema({
    _id: {
        types: Schema.Types.ObjectId,
    },
    total: {
        type: Number
    },
    paid: {
        type: Boolean,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: User
    },
    items: [
        {
            type: Schema.Types.ObjectId,
            ref: Item
        }
    ],
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

export const Invoice = model<IInvoice>('Invoice', invoiceSchema)