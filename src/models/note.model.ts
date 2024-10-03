import { model, Schema } from "mongoose";
import { IUser } from "./user.model";
import { ITag } from "./tag.model";


export interface INote {
 //   _id:number;
    title: string;
    body: string;
    createdAt:Date;
    author: IUser;
    //tags: ITag[];
}

export const NoteSchema = new Schema<INote>({
 //   _id: Schema.Types.ObjectId,
    title: String,
    body: String,
    createdAt: { type: Date, default: Date.now},
    author: { type: Schema.Types.ObjectId, ref: 'User' },
   // tags: [{ type: Schema.Types.ObjectId, ref: 'Tag'}],
});

export const NoteModel = model<INote>('Note', NoteSchema);
