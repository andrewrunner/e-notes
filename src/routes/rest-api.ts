import express from 'express';
import { UserModel } from "../models/user.model";
import { TagModel } from '../models/tag.model';
import { NoteModel } from '../models/note.model';
import { Types } from 'mongoose';

const router = express.Router();



async function createUser() {

    // const tagModel = new TagModel({
    //     title: 'Test1'
    // });
    // const tag = await tagModel.save();

    const userModel = new UserModel({
        _id:new Types.ObjectId(),
        name: 'Bill',
        email: 'bill@initech.com',
        avatar: 'https://i.imgur.com/dM7Thhn.png'
    });
    const user = await userModel.save();

  //  return user;

    const noteModel = new NoteModel({
        title: 'Note title...',
        body: 'Note body...',
        author: user._id,
    });
    const note = await noteModel.save();

    return note;
}

router.get('/', (req, res) => {
  createUser()
    .then((user) => {
        return res.send(JSON.stringify(user));
    })
    .catch((e) => {
        console.log(e)
    })
});

 

router.get('/list', (req, res) => {

    // Загрузка notes c их авторами
    // NoteModel
    // .find()
    // .populate('author')
    // .then((users) => {
    //     return res.json(users);
    // });

    // загрузка пользователей с их заметками (при условии, что ObjectId только в моделе notes)
    UserModel.aggregate([
        {
          $lookup: {
            from: 'notes', // Коллекция заметок
            localField: '_id', // Поле _id в User
            foreignField: 'author', // Поле user в Note, ссылающееся на пользователя
            as: 'notes' // Имя поля для сохранения заметок в результате
          }
        }
      ])
      .exec()
      .then((users) => {
        return res.json(users);
    });


    // загрузка пользователей с их заметками (при условии, что массив ObjectId есть у пользовтаеля...) 
    //Пример поля:  "notes": ["64e9fe055fc13b1a2f000002", "64e9fe075fc13b1a2f000003"]
    // UserModel
    // .find()
    // .populate('notes')
    // //.exec()
    // .then((users) => {
    //     return res.json(users);
    // });


   // return res.json([]);
});

export { router as restApiRouter };