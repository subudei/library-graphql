const express = require("express");
const qraphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  qraphqlHTTP({
    schema,
  })
);

app.listen(4000, () => {
  console.log("listening for requests on port 4000");
});
