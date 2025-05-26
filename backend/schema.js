const { gql } = require('apollo-server');

const typeDefs = gql`
  type BlogPost {
    id: ID!
    title: String!
    content: String!
    author: String!
    createdAt: String!
  }

  type Query {
    posts(page: Int, limit: Int): [BlogPost!]!
    post(id: ID!): BlogPost
  }

  type Mutation {
    createPost(title: String!, content: String!, author: String!): BlogPost!
  }
`;

module.exports = typeDefs; 