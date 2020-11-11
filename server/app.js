const express = require("express");
const qraphqlHTTP = require("express-graphql").graphqlHTTP;
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://cluster-subudei.8ex5o.mongodb.net/<test>");
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use(
  "/graphql",
  qraphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
