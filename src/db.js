const users = [
  {
    id: '1',
    name: 'Logan',
    email: 'logan@gmail.com'
  },
  {
    id: '2',
    name: 'Taylor',
    email: 'taylor@gmail.com'
  },
  {
    id: '3',
    name: 'Alex',
    email: 'alex@gmail.com'
  }
];
const posts = [
  {
    id: '1',
    title: 'First Post Title',
    body: 'First post woo!',
    published: false,
    author: '2'
  },
  {
    id: '2',
    title: 'Second Post Title',
    body: 'Second post woo!',
    published: true,
    author: '2'
  },
  {
    id: '3',
    title: 'Third Post Title',
    body: 'Third post woo!',
    published: false,
    author: '1'
  }
];

const comments = [
  {
    id: '1',
    text: 'This post sucks',
    author: '1',
    post: '2'
  },
  {
    id: '2',
    text: 'I like to comment on thins',
    author: '3',
    post: '1'
  },
  {
    id: '3',
    text: "Where's the fries?",
    author: '3',
    post: '2'
  },
  {
    id: '4',
    text: "Go home, you're drunk",
    author: '2',
    post: '3'
  }
];

const db = {
  users,
  posts,
  comments
};

export default db;
