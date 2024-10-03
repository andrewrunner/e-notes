import { model, Schema } from "mongoose";
import { INote } from "./note.model";


export interface ITag {
    _id?:number;
    name: string;
    notes: INote[];
}

export const TagSchema = new Schema<ITag>({
    _id: Schema.Types.ObjectId,
    name: String,
    notes: [{ type: Schema.Types.ObjectId, ref: 'Note' }],
});

export const TagModel = model<ITag>('Tag', TagSchema);
