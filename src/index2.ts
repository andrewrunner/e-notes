import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";


// Exmaple with types in scema...

 
// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
    type Query {
      quoteOfTheDay: String
      random: Float!
      rollThreeDice: [Int]
    }
  `)
 
   
// The root provides a resolver function for each API endpoint
var root = {
    quoteOfTheDay() {
      return Math.random() < 0.5 ? "Take it easy" : "Salvation lies within"
    },
    random() {
      return Math.random()
    },
    rollThreeDice() {
      return [1, 2, 3].map(_ => 1 + Math.floor(Math.random() * 6))
    },
  }
 
var app = express()
 
// Create and use the GraphQL handler.
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