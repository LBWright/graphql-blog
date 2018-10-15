import { GraphQLServer, PubSub } from 'graphql-yoga';
import db from './db';
import {
  Query,
  Mutation,
  User,
  Post,
  Comment,
  Subscription
} from './resolvers';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    User,
    Subscription,
    Post,
    Comment
  },
  context: {
    db,
    pubsub
  }
});

server.start(() => console.log('GQL server up'));
