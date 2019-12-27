import { Schema, Document, model } from 'mongoose'

export interface IItem extends Document {
    _id: number,
    name: string,
    category: string,
    price: number,
    stockQuantity: number,
    cartQuantity: number,
    sale: boolean,
    discount: number,
    dateCreated: string
}

const itemSchema: Schema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stockQuantity: {
        type: Number,
        required: true
    },
    cartQuantity: {
        type: Number,
        required: true
    },
    sale: {
        type: Boolean,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

export const Item = model<IItem>('Item', itemSchema)