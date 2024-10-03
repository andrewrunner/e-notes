import express from "express";
import { connect } from 'mongoose';

import { createHandler } from "graphql-http/lib/use/express";
import { restApiRouter } from "./routes/rest-api";
import { graphqlRouter } from "./routes/graphql-router";


var app = express()
connect('mongodb://simple-notes-database/first')


// app.all(
//   "/graphql",
//   createHandler({
//     schema: graphqlRouter
//   })
// )

app.use(restApiRouter)


app.listen(3000, () => {
  console.log("Running a GraphQL API server at http://localhost:3000/graphql")
});