const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// doomy data
var books = [
  { name: "American Gods", genre: "Fantasy", id: "1", authorId: "3" },
  { name: "Seobe 2", genre: "Drama", id: "2", authorId: "1" },
  { name: "Blood Meridian", genre: "Drama", id: "3", authorId: "2" },
  { name: "The Road", genre: "Drama", id: "4", authorId: "2" },
  { name: "The Sandmen", genre: "Fantasy", id: "5", authorId: "3" },
  { name: "Roman o Londonu", genre: "History", id: "6", authorId: "1" },
];

var authors = [
  { name: "Milos Crnjanski", age: 65, id: "1" },
  { name: "Cormac McCarthy", age: 87, id: "2" },
  { name: "Neil Richard Gaiman", age: 60, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        return _.find(authors, { id: parent.authorId });
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //code to get data from data base/ other source
        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      },
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
