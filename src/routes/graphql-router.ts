import { GraphQLObjectType, GraphQLString, GraphQLSchema } from "graphql";

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
   
const schema = new GraphQLSchema({ query: queryType })

export { schema as graphqlRouter };