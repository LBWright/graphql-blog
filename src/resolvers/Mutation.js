import uuidv4 from 'uuid/v4';

const Mutation = {
  createUser: (parent, { data }, { db }, info) => {
    const emailTaken = db.users.some(user => user.email === data.email);

    if (emailTaken) {
      throw new Error('Email already in use');
    }

    const user = {
      id: uuidv4(),
      ...data
    };
    db.users.push(user);
    return user;
  },
  updateUser: (parent, { id, data }, { db }, info) => {
    const user = db.users.find(user => user.id === id);

    if (!user) {
      throw new Error('User not found');
    }

    if (typeof data.email === 'string') {
      const emailTaken = db.users.some(user => user.email === data.email);

      if (emailTaken) {
        throw new Error('Email taken');
      }
      user.email = data.email;
    }

    if (typeof data.name === 'string') {
      user.name = data.name;
    }

    if (typeof data.age !== undefined) {
      user.age = data.age;
    }
    return user;
  },
  deleteUser: (parent, args, { db }, info) => {
    const userIndex = db.users.findIndex(user => user.id === args.id);

    if (userIndex === -1) {
      throw new Error('User not found');
    }

    const deleted = db.users.splice(userIndex, 1);

    db.posts = db.posts.filter(post => {
      const match = post.author === args.id;

      if (match) {
        db.comments = db.comments.filter(comment => comment.post !== post.id);
      }

      return !match;
    });

    db.comments = db.comments.filter(comment => comment.author !== args.id);

    return deleted[0];
  },
  createPost: (parent, { data }, { pubsub, db }, info) => {
    const userExists = db.users.some(user => user.id === data.author);
    if (!userExists) {
      throw new Error('User does not exist');
    }
    const post = {
      id: uuidv4(),
      ...data
    };
    db.posts.push(post);
    if (post.published) {
      pubsub.publish('post', { post });
    }
    return post;
  },

  updatePost: (parent, { id, data }, { db }, info) => {
    const post = db.posts.find(post => post.id === id);

    if (!post) {
      throw new Error('Post not found');
    }

    if (typeof data.title === 'string') {
      post.title = data.title;
    }
    if (typeof data.body === 'string') {
      post.body = data.body;
    }
    if (data.published !== undefined) {
      post.published = data.published;
    }

    return post;
  },
  deletePost: (parent, args, { db }, info) => {
    const postIndex = db.posts.findIndex(post => post.id === args.id);

    if (postIndex === -1) {
      throw new Error('Post not found');
    }

    const deleted = db.posts.splice(postIndex, 1);

    db.comments = db.comments.filter(comment => comment.post !== args.id);

    return deleted[0];
  },
  createComment: (parent, { data }, { pubsub, db }, info) => {
    const userExists = db.users.some(user => user.id === data.author);
    const postExists = db.posts.some(post => post.id === data.post);

    if (!userExists) {
      throw new Error('User does not exist');
    }
    if (!postExists) {
      throw new Error('Post does not exist');
    }

    const comment = {
      id: uuidv4(),
      ...data
    };

    db.comments.push(comment);
    pubsub.publish(`comment ${data.post}`, { comment });

    return comment;
  },

  updateComment: (parent, { id, data }, { db }, info) => {
    const comment = db.comments.find(comment => comment.id === id);

    if (!comment) {
      throw new Error('Comment not found');
    }

    if (typeof data.text === 'string') {
      comment.text = data.text;
    }
    return comment;
  },
  deleteComment: (parent, args, { db }, info) => {
    const commentIndex = db.comments.findIndex(
      comment => comment.id === args.id
    );

    if (commentIndex === -1) {
      throw new Error('Comment not found');
    }

    const deleted = db.comments.splice(commentIndex, 1);

    return deleted[0];
  }
};

export default Mutation;
