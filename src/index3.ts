import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";
 

// Exmaple with parameters in query...


/*
В Запросе передавать строку:
{
  rollDice(numDice: 3, numSides: 6)
}
*/

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    rollDice(numDice: Int!, numSides: Int): [Int]
  }
`)
 
 
// The root provides a resolver function for each API endpoint
var root = {
    rollDice({ numDice, numSides } : {numDice:number, numSides?:number}) {
      var output = []
      for (var i = 0; i < numDice; i++) {
        output.push(1 + Math.floor(Math.random() * (numSides || 6)))
      }
      return output
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