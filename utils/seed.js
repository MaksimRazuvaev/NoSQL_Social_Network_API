const connection = require('../config/connection');
const { User, Thought, Reaction } = require('../models');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  // Drop existing Users
  await User.deleteMany({});

  // Drop existing Thoughts
  await Thought.deleteMany({});

  // Drop existing Reactions
  await Reaction.deleteMany({});

  // Create array to hold the users
  const users = [
    {
        username: "dsdsadsva",
        email: "afddfs@dfsa.sdf",
        thoughts: [],
        friends: [],
    },
    {
        username: "dasgthswjytd",
        email: "afddfs@dfsa.sdf",
        thoughts: [],
        friends: [],
    },
    {
        username: "iultgmfdsrgfd",
        email: "afddfs@dfsa.sdf",
        thoughts: [],
        friends: [],
    },
  ];

  // Create array to hold the thoughts
  const thoughts = [
    {
        _id: "firstThoughid",
        thoughtText: "dfsadfs",
        //?????
        username: "dsdsadsva",
        reactions: [],
    },
    {
        _id: "secondThoughid",
        thoughtText: "dfsadfs",
        //?????
        username: "dsdsadsva",
        reactions: [],
    },
    {
        _id: "thirdThoughid",
        thoughtText: "dfsadfs",
        //?????
        username: "dsdsadsva",
        reactions: [],
    },
  ];

  // Create empty array to hold the reactions
  const reactions = [
    {
        reactionBody: "afdgadgdgd",
        username: "agdsdgad",
    },
    {},
    {},
  ];


  // Add students to the collection and await the results
  await User.collection.insertMany(users);

  // Add courses to the collection and await the results
  await Course.collection.insertOne({
    courseName: 'UCLA',
    inPerson: false,
    students: [...students],
  });

  // Log out the seed data to indicate what should appear in the database
  console.table(users);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
