const { ApolloServer } = require("apollo-server");
const fs = require("fs");
const articles = require("./db/Atricle");

const typeDefs = fs.readFileSync("./src/schema.graphql", "utf-8");

const resolvers = {
  Query: {
    articles: (parent, args, context) => {
      return articles;
    },
  },
  Article: {
    author(parent) {
      return {
        id: 1,
        createdAt: "",
        updatedAt: "",
        nickname: "Yang",
        imageId: 10,
      };
    },
    comments(parent) {
      return [
        {
          id: 1,
          createdAt: "",
          updatedAt: "",
          authorId: 1,
          content: "first comment",
        },
      ];
    },
  },
  User: {
    image(parent) {
      return {
        id: 1,
        createdAt: "",
        updatedAt: "",
        url: "...",
      };
    },
  },
  Comment: {
    author(parent) {
      return {
        id: 1,
        createdAt: "",
        updatedAt: "",
        nickname: "Yang",
        imageId: 10,
      };
    },
  },
  Category: {},
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(3000);
