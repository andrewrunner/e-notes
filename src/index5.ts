import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

// Mutations
// https://graphql.org/graphql-js/mutations-and-input-types/

/*
mutation {
  createMessage(input: {
    author: "andy",
    content: "hope is a good thing",
  }) {
    id
  }
}

*/

 
var schema = buildSchema(`
   input MessageInput {
    content: String
    author: String
  }
 
  type Message {
    id: ID!
    content: String
    author: String
  }
 
  type Query {
    getMessage(id: ID!): Message
  }
 
  type Mutation {
    createMessage(input: MessageInput): Message
    updateMessage(id: ID!, input: MessageInput): Message
  }
`)


// If Message had any complex fields, we'd put them on this object.
class Message {
    public id:number;
    public content:string;
    public author:string;

    constructor(id:number, { content, author }: {content: string, author:string}) {
      this.id = id
      this.content = content
      this.author = author
    }
  }
   

// Maps username to content
var fakeDatabase:{[key:number]: Message} = {}
 
var root = {
  getMessage({ id }: {id:number}) {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id)
    }
    return new Message(id, fakeDatabase[id])
  },
  createMessage({ input }:{input:Message}) {
    // Create a random id for our "database".
    var id = require("crypto").randomBytes(10).toString("hex")
 
    fakeDatabase[id] = input
    return new Message(id, input)
  },
  updateMessage({ id, input }: {id:number, input:Message}) {
    if (!fakeDatabase[id]) {
      throw new Error("no message exists with id " + id)
    }
    // This replaces all old data, but some apps might want partial update.
    fakeDatabase[id] = input
    return new Message(id, input)
  },
}

  
 
var app = express()

app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
)
 
// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")