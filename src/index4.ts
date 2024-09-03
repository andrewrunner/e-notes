import express from "express";
import { createHandler } from "graphql-http/lib/use/express";
import { buildSchema } from "graphql";

//  Resolve can be object with inner state 

/*
В запросе указывать:

{
  getDie(numSides: 6) {
    rollOnce
    roll(numRolls: 3)
  }
}

 increase() - can modify inner state whch affect the result (order of call matters)

*/

 
var schema = buildSchema(`
   type RandomDie {
    numSides: Int!
    rollOnce: Int!
    increase: Int
    roll(numRolls: Int!): [Int]
  }
 
  type Query {
    getDie(numSides: Int): RandomDie
  }
`)


// This class implements the RandomDie GraphQL type
class RandomDie {
    constructor(
        public numSides:number
    ) {}
   
    rollOnce() {
      return 1 + Math.floor(Math.random() * this.numSides)
    }

    increase() {
        this.numSides += 1;
    }
   
    roll({ numRolls }: {numRolls:number}) {
      var output = []
      for (var i = 0; i < numRolls; i++) {
        output.push(this.rollOnce())
      }
      return output
    }
  }
   
  // The root provides the top-level API endpoints
  var root = {
    getDie({ numSides }: { numSides:number }) {
      return new RandomDie(numSides || 6)
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