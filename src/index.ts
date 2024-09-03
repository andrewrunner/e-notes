import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";
import { Schema, model, connect } from 'mongoose';
 
// Maps id to User object
var fakeDatabase = {
    a: {
      id: "a",
      name: "alice",
    },
    b: {
      id: "b",
      name: "bob",
    },
  }


// Define the User type
var userType = new GraphQLObjectType({
    name: "User",
    fields: {
      id: { type: GraphQLString },
      name: { type: GraphQLString },
    },
  })
   


// Define the Query type
  var queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
      user: {
        type: userType,
        // `args` describes the arguments that the `user` query accepts
        args: {
          id: { type: GraphQLString },
        },
        resolve: (_, { id }) => {
            //@ts-ignore
          return fakeDatabase[id]
        },
      },
    },
  })
   
  var schema = new GraphQLSchema({ query: queryType })
 
var app = express()


interface IUser {
    name: string;
    email: string;
    avatar?: string;
}

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: String
});

const User = model<IUser>('User', userSchema);

async function createUser() {
    const user = new User({
        name: 'Bill',
        email: 'bill@initech.com',
        avatar: 'https://i.imgur.com/dM7Thhn.png'
    });
    return await user.save();
}


app.get('/', (req, res) => {

  connect('mongodb://simple-notes-database/first')
  .then(() => {

      createUser()
          .then((user) => {
              return res.send(JSON.stringify(user));
          })

  })
  .catch((e:any) => {
    console.log(e)
  })

})
 
// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema
  })
)
 
// Start the server at port
app.listen(3000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")