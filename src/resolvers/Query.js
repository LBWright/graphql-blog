import { argumentsObjectFromField } from 'apollo-utilities';

const Query = {
  users: (_, { query }, { db }, info) => {
    if (!query) return db.users;
    else
      return db.users.filter(user =>
        user.name.toLowerCase().includes(query.toLowerCase())
      );
  },
  posts: (_, { query }, { db }, info) => {
    if (!query) return db.posts;
    else
      return db.posts.filter(
        post =>
          post.title.toLowerCase().includes(query.toLowerCase()) ||
          post.body.toLowerCase().includes(query.toLowerCase())
      );
  },
  comments: (_, args, { db }, info) => db.comments
};

export default Query;
