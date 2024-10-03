import { model, Schema } from "mongoose";
import { INote } from "./note.model";

export interface IUser {
    _id?:number;
    name: string;
    email: string;
    avatar?: string;
    notes?: INote[]
};

export const UserSchema = new Schema<IUser>({
    _id: Schema.Types.ObjectId,
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String,
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

export const UserModel = model<IUser>('User', UserSchema);