import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import graphql, { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";


// Как строить схему в коде


/*

{ 
    user(id:"a") { 
            id,
            name 
        } 
}

*/

 
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
 
// Create and use the GraphQL handler.
app.all(
  "/graphql",
  createHandler({
    schema: schema
  })
)
 
// Start the server at port
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")